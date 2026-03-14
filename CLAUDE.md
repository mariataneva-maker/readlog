# ReadLog — Design System Rules for Figma MCP Integration

## 1. Token Definitions

Tokens live in a single file: `src/styles/tokens.css`
They are CSS custom properties on `:root` and are the **single source of truth**.
Figma Variables must mirror these exactly.

```css
/* src/styles/tokens.css — key tokens */
--color-primary:    #000000;   /* Figma Variable: color/primary */
--color-bg:         #ffffff;   /* Figma Variable: color/bg */
--color-surface:    #f5f5f5;   /* Figma Variable: color/surface */
--color-border:     #eeeeee;   /* Figma Variable: color/border */
--color-muted:      #999999;   /* Figma Variable: color/muted */
--font-serif:  'Georgia', serif;  /* Figma Variable: font/serif */
--font-sans:   'Arial', sans-serif; /* Figma Variable: font/sans */
--max-width:    430px;         /* Figma frame max-width */
--space-2: 8px; --space-4: 16px; --space-6: 24px; --space-8: 32px;
```

**Token sync rule:** When Figma Variables change, update `tokens.css`.
When `tokens.css` changes, update Figma Variables to match.

## 2. Component Library

Components live in `src/components/`, one folder per component:
```
src/components/
  BookCard/          BookCard.jsx + BookCard.css
  BookDetailView/    BookDetailView.jsx + BookDetailView.css
  FilterTabs/        FilterTabs.jsx + FilterTabs.css
  LibraryView/       LibraryView.jsx + LibraryView.css
  NoteCard/          NoteCard.jsx + NoteCard.css
  ProgressBar/       ProgressBar.jsx + ProgressBar.css
  QuoteCaptureView/  QuoteCaptureView.jsx + QuoteCaptureView.css
  QuoteCard/         QuoteCard.jsx + QuoteCard.css
  StatsBar/          StatsBar.jsx + StatsBar.css
```

**Figma → Code mapping:**
| Figma Component  | React File                                    |
|-----------------|-----------------------------------------------|
| BookCard        | src/components/BookCard/BookCard.jsx          |
| StatsBar        | src/components/StatsBar/StatsBar.jsx          |
| FilterTabs      | src/components/FilterTabs/FilterTabs.jsx      |
| ProgressBar     | src/components/ProgressBar/ProgressBar.jsx    |
| QuoteCard       | src/components/QuoteCard/QuoteCard.jsx        |
| NoteCard        | src/components/NoteCard/NoteCard.jsx          |
| LibraryView     | src/components/LibraryView/LibraryView.jsx    |
| BookDetailView  | src/components/BookDetailView/BookDetailView.jsx |
| QuoteCaptureView| src/components/QuoteCaptureView/QuoteCaptureView.jsx |

## 3. Frameworks & Libraries

- **Framework:** React 18.1.0
- **Styling:** Plain CSS (CSS custom properties for tokens, BEM naming)
- **Build:** react-scripts (Create React App)
- **No** CSS-in-JS, no CSS Modules, no Tailwind
- Component props are written in camelCase and must match Figma layer names

## 4. Styling Approach

- **Methodology:** BEM (Block__Element--Modifier)
- **Tokens:** CSS custom properties from `tokens.css` — never use hardcoded values
- **Responsive:** Mobile-first, max-width: 430px (--max-width)
- **Typography:** `var(--font-serif)` for headings/quotes, `var(--font-sans)` for labels/UI

### BEM pattern example:
```css
.bookcard { }           /* Block */
.bookcard__title { }    /* Element */
.bookcard__tab--active { }  /* Modifier */
```

## 5. State & Props Conventions

State is centralized in `src/hooks/useReadlog.js`.
Key props that map to Figma component properties:

**BookCard props:**
- `book.status`: `"reading"` | `"finished"` | `"want-to-read"` → Figma variant `status`
- `book.progress`: number 0–100 → ProgressBar fill width

**FilterTabs props:**
- `active`: `"all"` | `"reading"` | `"finished"` | `"want-to-read"` → Figma variant `active`

**BookDetailView props:**
- `activeTab`: `"quotes"` | `"notes"` → Figma variant `tab`

**QuoteCaptureView internal state:**
- `method`: `"camera"` | `"voice"` | `"type"` → Figma variant `captureMethod`

## 6. Project Structure

```
readlog/
  src/
    App.jsx              ← thin shell, imports useReadlog, routes views
    components/          ← UI components (see above)
    data/books.js        ← seed data (books, quotes, notes, status maps)
    hooks/useReadlog.js  ← all app state and navigation
    styles/
      tokens.css         ← design tokens (Figma Variables mirror)
      global.css         ← body reset + token import
  public/index.html
  scripts/
    sync-from-figma.js   ← repeatable Figma→Code sync script
  CLAUDE.md              ← this file
```

## 7. Figma File Reference

- **File key:** `AEaZwucsq0ikNkdIy5t2v5`
- **File URL:** https://www.figma.com/design/AEaZwucsq0ikNkdIy5t2v5/Design-iteration
- **Top-level frames:** Library | Book Detail | Quote Capture
- **Variables collection:** ReadLog Tokens

## 8. Sync Workflow

1. Maria refines design in Figma
2. Run Phase 7 sync: `get_design_context` → `get_variable_defs` → update `tokens.css` + component CSS
3. Verify with Claude Preview
4. Commit and push to `https://github.com/mariataneva-maker/readlog`
