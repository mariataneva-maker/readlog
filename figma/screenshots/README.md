# ReadLog — Figma Import Reference Screenshots

These screenshots are the source of truth for importing into Figma using **html.to.design**.
Capture each at `localhost:3000` using the viewport sizes listed below.

## Viewports

| Name | Width | Height | Chrome DevTools preset |
|---|---|---|---|
| Mobile | 375px | 812px | iPhone 14 |
| Tablet | 768px | 1024px | iPad Mini |
| Desktop | 1440px | 900px | Custom |

## 9 Frames to Import

| Frame name (use exactly) | View | Viewport | How to reach |
|---|---|---|---|
| `Library / 375` | Library | 375px | Load `localhost:3000` |
| `Library / 768` | Library | 768px | Load `localhost:3000` |
| `Library / 1440` | Library | 1440px | Load `localhost:3000` |
| `Book Detail / 375` | Book Detail | 375px | Click any book card |
| `Book Detail / 768` | Book Detail | 768px | Click any book card |
| `Book Detail / 1440` | Book Detail | 1440px | Click any book card |
| `Quote Capture / 375` | Quote Capture | 375px | Book Detail → + CAPTURE |
| `Quote Capture / 768` | Quote Capture | 768px | Book Detail → + CAPTURE |
| `Quote Capture / 1440` | Quote Capture | 1440px | Book Detail → + CAPTURE |

## Import Procedure (html.to.design)

1. Open Chrome → navigate to `localhost:3000`
2. Open DevTools (F12) → click the device toolbar icon (Ctrl+Shift+M)
3. Set viewport width to target size
4. Navigate to the target view
5. Click the **html.to.design Chrome extension** icon in the toolbar
6. Switch to Figma → run **html.to.design plugin** → Import
7. Rename the resulting frame to match the "Frame name" column above
8. Repeat for all 9 combinations

## Plugin Settings (enable these before importing)

- ✅ **Create local styles** — auto-extracts token colors as Figma Local Styles
- ✅ **Import images** — captures the dark book cover swatches
- ⬜ **Auto layout** — leave OFF for first import (cleaner result, add manually after)

## Layout at Each Viewport

### Library view
- **375px**: Single-column book list, 430px max-width
- **768px**: 2-column book grid, full 768px width
- **1440px**: 3-column book grid, 1200px max-width centered

### Book Detail view
- **375px**: Compact hero, 52×72px cover, standard tabs
- **768px**: Larger cover (80×112px), wider hero layout
- **1440px**: Large cover (100×140px), spacious padding

### Quote Capture view
- **375px**: Full-width form
- **768px**: Form constrained to 640px, centered
- **1440px**: Form constrained to 720px, centered

## After Import: Figma Variables to Create

Create a collection named **"ReadLog Tokens"** with these variables:

```
color/primary    #000000    color/bg         #ffffff
color/surface    #f5f5f5    color/border     #eeeeee
color/muted      #999999    color/subtle     #cccccc
space/2          8px        space/4          16px
space/6          24px       space/8          32px
```

Full token list: see `src/styles/tokens.css`
