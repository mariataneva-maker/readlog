#!/usr/bin/env node
/**
 * ReadLog — Figma → Code Sync Script
 * ====================================
 * Pulls design tokens from the Figma REST API and updates tokens.css.
 *
 * Usage:
 *   FIGMA_TOKEN=your_pat node scripts/sync-from-figma.js
 *
 * Get a Personal Access Token at:
 *   https://www.figma.com/settings → "Personal access tokens"
 *
 * Run this after every Figma design iteration (Phase 7 in CLAUDE.md).
 * Claude will also call the MCP tools (get_design_context, get_variable_defs,
 * get_screenshot) to verify layout changes beyond just token values.
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

/* ─── Config ──────────────────────────────────────────────────────────── */
const FILE_KEY = "AEaZwucsq0ikNkdIy5t2v5";
const TOKENS_PATH = path.join(__dirname, "../src/styles/tokens.css");
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

if (!FIGMA_TOKEN) {
  console.error("❌  Set FIGMA_TOKEN env variable first.");
  console.error("    export FIGMA_TOKEN=figd_your_personal_access_token");
  process.exit(1);
}

/* ─── Helpers ─────────────────────────────────────────────────────────── */
function figmaGet(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.figma.com",
      path: endpoint,
      headers: { "X-Figma-Token": FIGMA_TOKEN },
    };
    https.get(options, (res) => {
      let body = "";
      res.on("data", (d) => (body += d));
      res.on("end", () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(e); }
      });
    }).on("error", reject);
  });
}

function rgbToHex({ r, g, b }) {
  const hex = (v) => Math.round(v * 255).toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

/* ─── Token → CSS variable mapping ───────────────────────────────────── */
// Maps Figma variable names (in the "ReadLog Tokens" collection) to CSS vars.
// Keep this in sync with CLAUDE.md § Token Definitions.
const VARIABLE_MAP = {
  "color/primary":    "--color-primary",
  "color/bg":         "--color-bg",
  "color/surface":    "--color-surface",
  "color/border":     "--color-border",
  "color/border-mid": "--color-border-mid",
  "color/muted":      "--color-muted",
  "color/subtle":     "--color-subtle",
  "color/status/reading":  "--color-status-reading",
  "color/status/finished": "--color-status-finished",
  "color/status/wishlist": "--color-status-wishlist",
  "space/1":   "--space-1",
  "space/2":   "--space-2",
  "space/3":   "--space-3",
  "space/4":   "--space-4",
  "space/5":   "--space-5",
  "space/6":   "--space-6",
  "space/8":   "--space-8",
  "space/10":  "--space-10",
  "space/12":  "--space-12",
  "text/xs":   "--text-xs",
  "text/sm":   "--text-sm",
  "text/base": "--text-base",
  "text/md":   "--text-md",
  "text/lg":   "--text-lg",
  "text/xl":   "--text-xl",
  "text/2xl":  "--text-2xl",
  "text/hero": "--text-hero",
};

/* ─── Main ────────────────────────────────────────────────────────────── */
async function main() {
  console.log("🔍  Fetching Figma variables...");
  const data = await figmaGet(`/v1/files/${FILE_KEY}/variables/local`);

  if (data.status === 403) {
    console.error("❌  403 Forbidden — check your FIGMA_TOKEN and file access.");
    process.exit(1);
  }

  const { variableCollections, variables } = data.meta;

  // Find the "ReadLog Tokens" collection
  const collection = Object.values(variableCollections).find(
    (c) => c.name === "ReadLog Tokens"
  );
  if (!collection) {
    console.error('❌  No collection named "ReadLog Tokens" found.');
    console.error("    Collections found:", Object.values(variableCollections).map((c) => c.name));
    process.exit(1);
  }

  const modeId = collection.defaultModeId;
  console.log(`✅  Found collection "${collection.name}" (mode: ${modeId})`);

  // Build a name → resolved value map
  const resolved = {};
  for (const [, variable] of Object.entries(variables)) {
    if (variable.variableCollectionId !== collection.id) continue;
    const value = variable.valuesByMode[modeId];
    if (!value) continue;

    let cssValue;
    if (variable.resolvedType === "COLOR") {
      cssValue = rgbToHex(value);
    } else if (variable.resolvedType === "FLOAT") {
      cssValue = `${value}px`;
    } else if (variable.resolvedType === "STRING") {
      cssValue = value;
    }
    if (cssValue !== undefined) resolved[variable.name] = cssValue;
  }

  // Diff against current tokens.css
  const current = fs.readFileSync(TOKENS_PATH, "utf8");
  let updated = current;
  let changeCount = 0;

  for (const [figmaName, cssVar] of Object.entries(VARIABLE_MAP)) {
    const newValue = resolved[figmaName];
    if (!newValue) continue;

    // Match the CSS var line: --foo-bar: <value>;
    const re = new RegExp(`(${cssVar.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}:\\s*)([^;]+)(;)`, "g");
    const prev = updated;
    updated = updated.replace(re, (_, prefix, _old, semi) => {
      if (_old.trim() !== newValue) {
        console.log(`  ${cssVar}: ${_old.trim()} → ${newValue}`);
        changeCount++;
      }
      return `${prefix}${newValue}${semi}`;
    });
  }

  if (changeCount === 0) {
    console.log("✨  tokens.css is already in sync — no changes needed.");
    return;
  }

  fs.writeFileSync(TOKENS_PATH, updated, "utf8");
  console.log(`\n✅  Updated ${changeCount} token(s) in src/styles/tokens.css`);
  console.log("    Next: review component CSS, then git commit and push.\n");
  console.log("    Suggested commit message:");
  console.log('    git commit -am "style: sync design tokens from Figma"');
}

main().catch((err) => {
  console.error("💥  Unexpected error:", err.message);
  process.exit(1);
});
