# Product Dashboard

A small internal product management dashboard built on the [DummyJSON Products API](https://dummyjson.com/docs/products). It shows catalogue metrics, a searchable and filterable product list, a product detail page, and a simulated price and stock update with optimistic UI.

- Live URL: **[LIVE_LINK](https://gpgold-app-assessment.vercel.app/)**
- Repository: https://github.com/OkeleyeVickkk/pgold-app-assessment

## Setup

Prerequisites: Node.js 20.9 or later, npm.

```bash
npm install
cp .env.example .env.local   # optional, the default is already https://dummyjson.com
npm run dev                  # http://localhost:3000
```

| Command             | What it does                  |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start the dev server          |
| `npm run build`     | Production build              |
| `npm start`         | Serve the production build    |
| `npm run lint`      | ESLint (flat config)          |
| `npm run typecheck` | `tsc --noEmit`                |
| `npm run format`    | Prettier                      |

Environment variables:

| Name                 | Default                 | Notes                                                    |
| -------------------- | ----------------------- | -------------------------------------------------------- |
| `DUMMYJSON_BASE_URL` | `https://dummyjson.com` | Server-only. Public API, no credentials are needed.      |

## Stack

| Package              | Version | Why                                                                                                   |
| -------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| Next.js (App Router) | 16.3.6  | Required. Server Components for reads, a Server Action for the write.                                 |
| React                | 19.2.8  | `useOptimistic`, `useTransition` and `useSyncExternalStore` cover all client state without a library. |
| TypeScript           | 5.9.3   | `strict`, no `any`. Types are inferred from Zod schemas.                                              |
| Tailwind CSS         | 4.3.3   | CSS-first config (`@theme` in `app/globals.css`).                                                     |
| Zod                  | 4.6.5   | Validates API responses, URL-derived data, form input and the Server Action input.                    |

Other dependencies and why they are here:

- `server-only`: stops the API layer from being bundled into client code by mistake.
- `radix-ui`, `@base-ui/react`, `vaul`, `class-variance-authority`, `cn`, `tw-animate-css`, `shadcn`: shadcn primitives (dialog, dropdown, drawer, table) and the class helpers they use. My own `components/base` wrappers sit on top of them.
- `sonner`: toasts for save success and offline status.
- `@visx/*`, `d3-shape`, `motion`, `@number-flow/react`: the donut chart on the overview (arc maths, slice animation, animated centre total).

**Why no TanStack Query.** Almost all data is read once per navigation, and it belongs on the server. The only client cache the app needs is the small edit overlay described below. A query cache would duplicate what Server Components already do and would move list fetching to the client. It would become the right tool if the list needed background refetching, polling, infinite scroll, or multi-user editing.

## Architecture

### Routes

| Route            | What it shows                                                                  |
| ---------------- | ------------------------------------------------------------------------------ |
| `/`              | Metrics, the 7 lowest-stock products, inventory value by category (donut)      |
| `/products`      | Product table with search, category filter, sort, pagination and rows per page |
| `/products/[id]` | Product detail with an "Edit price & stock" modal                              |

### Server versus client

| Piece                                                    | Runs on             | Why                                                              |
| -------------------------------------------------------- | ------------------- | ---------------------------------------------------------------- |
| All `page.tsx` files, product table markup, detail page  | Server              | Data is fetched on the server; no client fetch waterfall.        |
| `DashboardShell` (sidebar drawer)                        | Client              | Open/close state only.                                           |
| Search box, category/sort selects, filter drawer         | Client (leaf)       | They write to the URL.                                           |
| Pagination and rows-per-page                             | Server `<Link>`s    | Plain links built with `buildListHref`; no JS needed.            |
| `EditedPrice`, `EditedStockBadge`                        | Client (tiny)       | Merge the edit overlay over server values.                       |
| `OverviewMetrics`, inventory chart                       | Client              | Fed a slim server-fetched array; recompute with the overlay.     |
| `ProductPricingCard` + `EditProductModal` + form         | Client              | `useOptimistic`, `useTransition`, calls the Server Action.       |
| `updateProductAction`                                    | Server Action       | Validates and calls the API on the server.                       |

### Data layer

- `lib/api-client.ts`: one `apiFetch(path, schema, options)` helper. It builds the URL, sets the cache option, turns network failures and non-2xx responses into a typed `ApiError`, and parses every response with a Zod schema. A response that doesn't match the schema becomes an `ApiError` (502) instead of leaking a bad shape into the UI.
- `api/product.api.ts`: `getProducts`, `getProduct`, `getCategories`, `getAllProductsForMetrics`, `getLowestStockProducts`, `updateProduct`. It imports `server-only`.
- `routes/api-routes.ts` and `routes/routes.ts`: every API path and app path, so no path string is written inline.
- `schemas/product.schema.ts` is the single definition of each shape; `types/product.types.ts` infers types from it with `z.infer`. Unused product fields are stripped (Zod's default), and list requests use `select=` so the payload only has what the table shows.

Caching (`fetch` with `next.revalidate`, mutations `no-store`):

| Data                     | Revalidate |
| ------------------------ | ---------- |
| Categories               | 24 h       |
| Metrics (all products)   | 5 min      |
| Product list and search  | 60 s       |
| Single product           | 60 s       |
| `PATCH` update           | not cached |

`/products` and `/products/[id]` render dynamically because they read `searchParams`, but the underlying `fetch` calls still hit the data cache. `/` is statically generated and revalidated every 60 seconds.

### URL state

The query string is the only source of truth for list state. Nothing about search, filter, sort or page lives in `useState`.

| Param      | Rules                                                                                  |
| ---------- | -------------------------------------------------------------------------------------- |
| `query`    | Trimmed, omitted when empty. Sent to DummyJSON as `q`.                                 |
| `category` | Must be a slug returned by `/products/categories`, otherwise ignored.                  |
| `sort`     | Allowlist: `title`, `price`, `rating`, `stock`.                                        |
| `order`    | `asc` or `desc`, only kept when `sort` is set.                                         |
| `page`     | Integer ≥ 1. A page past the end is clamped to the last page.                          |
| `perPage`  | 25, 50 or 100. Default 25, omitted when default.                                       |

- `parseListParams` (in `lib/list-params.ts`) never throws. A malformed URL falls back to defaults.
- `buildListHref` builds every list URL. Any change other than `page` resets the page to 1, and default values are left out of the URL.
- Typing in the search box (debounced 300 ms) uses `router.replace` so history is not flooded. Category, sort and rows-per-page use `push` so Back works as expected.
- The product link carries the list state in one `from` param. The detail page re-parses it with `parseListParams` and rebuilds the back link with `buildListHref`, so the back link keeps the list state and cannot be used as an open redirect.
- `loading.tsx` only covers the first load, so the table sits in a `Suspense` boundary keyed by the list query string. The skeleton shows on every search/filter/sort/page change while the toolbar (and search focus) stays mounted.

### Search combined with a category

DummyJSON has no request for "search within a category". `getProducts` picks one of four requests:

| `query` | `category` | Request                                                                              |
| ------- | ---------- | ------------------------------------------------------------------------------------ |
| no      | no         | `/products?limit&skip&sortBy&order`                                                  |
| yes     | no         | `/products/search?q&limit&skip&sortBy&order`                                         |
| no      | yes        | `/products/category/{slug}?limit&skip&sortBy&order`                                  |
| yes     | yes        | `/products/search?q&limit=0&sortBy&order`, then filter by category and page in memory |

All four return the same `{ products, total, page, perPage, pageCount }` shape, so the UI doesn't know which branch ran.

### Editing, the overlay and optimistic updates

DummyJSON's `PATCH /products/{id}` returns the merged product but stores nothing, so a later `GET` returns the old values. The app handles that in three parts.

1. **Server Action.** `updateProductAction(id, input)` validates the id and input with Zod, sends only the changed fields to the API, and returns `{ ok: true, product }` or `{ ok: false, message, fieldErrors? }`. It never throws for expected failures. In a real system this is where the auth check would go.
2. **Optimistic UI.** `ProductPricingCard` shows `useOptimistic` values. On save it applies the new values inside `startTransition`, then awaits the action. On success the change is written to the overlay and a toast confirms it. On failure the optimistic value falls back on its own (the underlying state never changed), the modal stays open, and the error is shown in a `role="alert"` region.
3. **Overlay.** `lib/edits-store.ts` is a tiny module store (`{ [id]: { price?, stock? } }`) persisted to `sessionStorage`. Components read it with `useSyncExternalStore` (`useProductEdits`), with an empty server snapshot so hydration matches. The list cells, the detail page, the metrics and the chart all read through it, so a saved edit shows up everywhere in the tab and survives a refresh.

Validation: price must be > 0 with at most two decimals; stock must be a whole number ≥ 0. The same Zod schema runs in the form (instant feedback, focus moves to the first invalid field) and in the Server Action. If nothing changed, no request is sent.

### Loading, error, empty and offline states

- `loading.tsx` skeletons for `/`, `/products` and `/products/[id]`, plus the keyed `Suspense` described above.
- `error.tsx` at the root and on the detail route, with a retry button (`retry` prop in Next 16) and plain-language copy. Raw errors are never shown.
- `not-found.tsx` for unknown or non-numeric product ids, with a link back to the list.
- An empty state that says no products match, with a link that clears search and filters.
- Offline: `useOnlineStatus` (`useSyncExternalStore` over `online`/`offline` events) shows a persistent toast and a header chip, disables the search, filters and edit button, and shows an offline message in the error boundary.
- Offline detection in practice. When you turn off your data — Wi-Fi or mobile — the dashboard detects it immediately and stops you from interacting with the parts of the UI that would trigger a network request. The search input and the table filters (category, sort, rows per page) are disabled, as is the "Edit price & stock" button, so you can't start an action that is guaranteed to fail. An infinite toast notification appears and stays on screen for as long as you remain offline, telling you that you're offline. The header also shows an offline chip. When your connection returns, the toast clears on its own, the chip disappears and every control becomes interactive again — no refresh needed.

To try it without actually turning off your data:

On a laptop (Windows or Mac) - open the browser's developer tools and simulate offline mode:

Windows / Linux: press Ctrl + Shift + I (or F12), or right-click the page and choose Inspect.

Mac: press Cmd + Option + I, or right-click the page and choose Inspect.

Then go to the Network tab, find the throttling dropdown (it reads "No throttling" by default) and change it to Offline. The tab stays online - only that browser tab is cut off from the network, which is exactly what the app reacts to.

To restore, set the dropdown back to No throttling.

On a mobile device - just switch off your mobile data (and Wi-Fi, if connected). The dashboard will pick it up the same way.

### Accessibility and responsiveness

- One `<h1>` per page, `<header>`, `<main>`, `<nav>` landmarks; pagination is a labelled `<nav>` with `aria-current="page"`.
- Every input has a label; errors are linked with `aria-describedby` and `aria-invalid`.
- The table has a `<caption>`; images use the product title as `alt`; the star rating has a text equivalent.
- Keyboard: all controls are real buttons and links with visible focus styles; the modal and dropdowns trap and restore focus (Radix).
- Mobile first. The table keeps a minimum width and scrolls horizontally inside its card; the sidebar becomes a drawer below `xl`; filters move into a bottom drawer on small screens.

## Assumptions (checked against the live API)

- `sortBy`, `order`, `limit` and `skip` all work on `/products/search` and `/products/category/{slug}`.
- `limit=0` works on `/products/search` and returns every match. A broad term like `phone` returns 23 products, so filtering search results in memory is cheap.
- Sorting by `stock` works; several products have `stock: 0`, which the "lowest stock" preview relies on.
- `GET /products/99999` and `PATCH /products/99999` both return `404` with `{ "message": "Product with id '99999' not found" }`. `getProduct` turns the 404 into `notFound()`.
- `PATCH /products/{id}` returns `200` with the full merged product and does not persist it.
- `brand` is missing on some products (for example groceries). The schema marks it optional and the UI shows "No brand listed".
- Product images are served from `cdn.dummyjson.com/product-images/**`, which is the only allowed `next/image` remote pattern.

## Trade-offs

- **Search + category in memory.** Correct and cheap at DummyJSON's size (search results are a few dozen items), but it doesn't scale. With a large catalogue this needs a search backend that accepts both filters.
- **Client-local overlay.** Edits feel real within a tab, but they aren't shared between tabs, browsers or users. A real backend would remove the overlay entirely.
- **Metrics cover the whole catalogue**, not the current filter. The page says so. They are computed from one `limit=0&select=...` request; at scale this should be a server-side aggregate endpoint.
- **Low-stock threshold** is 10 units (`LOW_STOCK_THRESHOLD`). "Low stock" means 1 to 9 units; 0 is counted separately as "Out of stock", so the two numbers never overlap.
- **Out-of-range pages** are clamped by re-requesting the last page, which costs one extra request in that edge case.

## Known limitations

- Edits are not persisted beyond the browser tab and are not shared.
- The search-plus-category branch does not scale.
- No authentication or authorization.
- No automated tests.

## What I would improve with more time

- Real persistence with optimistic concurrency (a `version` or `updatedAt` sent with each write and rejected when stale).
- A search backend that supports combined filters, and cursor-based pagination.
- A dark theme. The whole app is built on a Tailwind CSS 4 CSS-first token setup (@theme in app/globals.css) with semantic colour variables, so a dark mode would mean defining one more token set and toggling a class on the root - the layout, components and charts already read from those tokens rather than hard-coded colours. I would add a theme toggle in the header, persist the choice, and respect prefers-color-scheme on first load.

## Performance notes

- Pages are server-rendered, so the first load has no client fetch waterfall.
- `select=` trims every list and metrics payload to the fields actually used.
- Client Components are kept to small leaves; the product table itself is a Server Component.
- Search is debounced at 300 ms. Memoization is not added by default.

## AI / tool disclosure

I used **Claude (Anthropic)** in the following ways

1. Setting up the base components according to current, up-to-date web standards - for example, my base components (buttons, inputs, select, modal, toasts, table, chart primitives, icons, fonts and theme), which are branched off shadcn ui components, giving me more control over the accessibility of the components across pages, whilst also meeting quality UI specifications

2. Structuring this README file to improve the text corrections and give a well written and neat documentation for you to read. 

Cheersss ^_~

- Yours sincerely
- Okeleye Victor
