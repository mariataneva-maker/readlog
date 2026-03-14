# ReadLog

> Your reading life, captured.

A minimalist reading tracker for books, quotes, and notes.

## Stack
- React 18 + react-scripts
- CSS custom properties (design tokens in `src/styles/tokens.css`)
- No external UI libraries

## Views
- **Library** — book grid with stats and filter tabs
- **Book Detail** — quotes and notes per book with progress
- **Quote Capture** — camera / voice / type input

## Dev
```bash
npm install
npm start
```

## Deploy (GitHub Pages)
```bash
npm run deploy
```

## Design ↔ Code Sync
Design tokens live in `src/styles/tokens.css` and are mirrored as Figma Variables.
Figma Code Connect maps components to their React counterparts — see `scripts/sync-from-figma.js`.
