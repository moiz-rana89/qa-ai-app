# Frontend Project Standards & Starter Template

> **What this is.** A single reference for the libraries, components, design tokens, architecture patterns, and code conventions used in the **TalentPop QA App**. Drop this into any new Claude-driven React project so the agent generates code that matches the same shape — same stack, same component vocabulary, same colors, same auth flow, same error handling. Copy / adapt the sections you need.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Project Structure](#2-project-structure)
3. [Setup Checklist (new project from this template)](#3-setup-checklist-new-project-from-this-template)
4. [Design System — Colors, Typography, Spacing](#4-design-system--colors-typography-spacing)
5. [Shared Components — What to Reuse](#5-shared-components--what-to-reuse)
6. [Architecture — Auth, Routing, State, API](#6-architecture--auth-routing-state-api)
7. [Common Page Patterns](#7-common-page-patterns)
8. [Code Conventions](#8-code-conventions)
9. [Gotchas / Lessons Learned](#9-gotchas--lessons-learned)
10. [What NOT to Do](#10-what-not-to-do)

---

## 1. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| **Build tool** | **Vite** (rolldown-vite) | Fast HMR, ESM-native |
| **Language** | **JavaScript + JSX**, NOT TypeScript | Project convention — JSDoc allowed where types help |
| **UI framework** | **React 19** | Modern hooks, no class components |
| **State** | **Classic Redux 5 + redux-thunk** | Action types → action creators → reducers via custom `createReducer` helper |
| **Routing** | **react-router-dom 7** | `BrowserRouter` + role-gated `ProtectedRoute` |
| **UI library** | **Ant Design 5** | Tables, Drawer, Modal, DatePicker, Select, Input, Tooltip — used everywhere |
| **Styling** | **Tailwind CSS 4** (`@tailwindcss/vite`) + a small amount of custom CSS | Inline utility classes; arbitrary values like `text-[#163143]` are common |
| **Icons** | **`@iconify/react` 6** | Universal icon access — `mdi:*`, `eos-icons:*`, `material-symbols:*`, etc. |
| **HTTP** | Native **`fetch`** via a custom `Api` wrapper class | Cookie-based auth, auto-refresh on 401, repeated array params |
| **Notifications** | **`react-hot-toast` 2** | Plus a custom `AntDNotification` wrapper if needed |
| **Date** | **`dayjs`** for new code (AntD-native); legacy code still uses `moment` | Migrate to dayjs in new code |
| **Crypto (client-side)** | **`fernet`** | Only used for token-style obfuscation — never store secrets |

### `package.json` baseline
```json
{
  "dependencies": {
    "@iconify/react": "^6.0.2",
    "@tailwindcss/vite": "^4.1.16",
    "antd": "^5.28.0",
    "antd-style": "^3.7.1",
    "axios": "^1.13.1",
    "fernet": "^0.3.3",
    "moment": "^2.30.1",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-hot-toast": "^2.6.0",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.9.5",
    "redux": "^5.0.1",
    "redux-thunk": "^3.1.0",
    "tailwindcss": "^4.1.16"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.4",
    "eslint": "^9.36.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "vite": "npm:rolldown-vite@7.1.14"
  }
}
```

---

## 2. Project Structure

```
src/
├─ assets/                       # logos, static images
├─ components/                   # shared UI components (see Section 5)
│  ├─ AntDTable/                 # the canonical table wrapper
│  ├─ AntDRangePicker/
│  ├─ AntDNotification/
│  ├─ Buttons/
│  │  ├─ CustomButton.jsx
│  │  ├─ DownloadCSVButton.jsx
│  │  └─ MainPageButton.jsx
│  ├─ CustomDatePicker/
│  ├─ Dropdown/UnifiedDropdown.jsx
│  ├─ GenericAntDrawer/
│  ├─ GenericAntDeleteModal/
│  ├─ NeedHelpModal/
│  ├─ NotesInput/
│  ├─ Skeleton/
│  ├─ Tabs/Tabs.jsx
│  └─ UploadFile/
├─ layout/
│  ├─ AppRouters.jsx             # all routes + ROUTE_ROLES map
│  ├─ AuthProvider.jsx           # /me check on mount + refresh-on-401
│  ├─ FullWidthLayout.jsx        # no sidebar layout
│  ├─ MainLayout.jsx             # sidebar + outlet layout
│  ├─ ProtectedRoute.jsx         # role + (optional) email gate
│  ├─ Sidebar.jsx                # menuList + render
│  └─ SplashScreen.jsx
├─ pages/
│  └─ <FeatureName>/
│     ├─ index.jsx               # main page
│     ├─ Edit<Thing>Drawer.jsx   # if the page has an edit flow
│     └─ <SectionName>.jsx       # split sections out if the page is large
├─ reduxStore/
│  ├─ action/
│  │  ├─ <feature>.js            # one file per logical feature
│  │  ├─ auth.js
│  │  └─ types.js                # all action-type string constants
│  ├─ lib/api.js                 # the Api wrapper class
│  ├─ reducer/
│  │  ├─ <feature>.js
│  │  └─ index.js                # combineReducers
│  └─ store.js                   # createStore + thunk middleware
└─ utils/
   ├─ accessLists.js             # email allowlists (e.g. ENDORSEMENT_REPORT_EMAILS)
   ├─ constants.js               # ATT_REASONS_STATUS, EVENT_TYPES, etc.
   ├─ helperFunctions.js         # roundTo, isJsonString, isWithin90, formatDateTime…
   ├─ roleHelpers.js             # filterMenuByRole, ROLE_DEFAULT_ROUTES, …
   └─ tablesColumns.jsx          # exported column-definition objects
```

### Naming conventions

- **Pages** — `PascalCase` folder + `index.jsx` (`pages/AttendanceInfractions/index.jsx`)
- **Components** — `PascalCase` folder + `index.jsx`, OR single `.jsx` file (`components/Buttons/CustomButton.jsx`)
- **Actions / reducers** — `camelCase` filenames (`workforcedashboard.js`)
- **Column definitions** — exported as `ColumnData<Feature>` from `utils/tablesColumns.jsx`
- **CSS modules** — avoid; use Tailwind utilities. AntD overrides live in arbitrary selectors like `[&_.ant-drawer-header]:px-6`.

---

## 3. Setup Checklist (new project from this template)

```bash
# 1. Vite scaffold
npm create vite@latest my-app -- --template react
cd my-app

# 2. Install the full dep set
npm i @iconify/react antd antd-style axios fernet moment dayjs \
      react-redux redux redux-thunk react-router-dom react-hot-toast
npm i -D tailwindcss @tailwindcss/vite

# 3. Wire Tailwind in vite.config
#    plugins: [react(), tailwindcss()]
#    Add a single `import './index.css'` with `@import "tailwindcss";`

# 4. Copy from this project's repo:
#    src/reduxStore/lib/api.js          (the Api wrapper)
#    src/layout/AuthProvider.jsx        (cookie auth bootstrap)
#    src/layout/ProtectedRoute.jsx      (role + email gate)
#    src/utils/roleHelpers.js
#    src/utils/accessLists.js           (empty allowlist as a placeholder)
#    Whichever components from src/components/ you'll need

# 5. Configure environment
echo 'VITE_API_URL=https://api.example.com' > .env.local
echo 'VITE_ENCRYPTION_KEY=replace_me'      >> .env.local

# 6. Set the brand
#    - Fonts: <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300..700&display=swap" rel="stylesheet">
#    - Configure the Tailwind theme to expose your brand color (default uses arbitrary values like text-[#69C920])

# 7. Run
npm run dev
```

### ESLint defaults
The project uses `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`. Most enforcement is the React-hooks ruleset; we **liberally suppress `react-hooks/exhaustive-deps`** for filter-state useEffects because the deps are intentional. Pattern:

```js
useEffect(() => {
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [filterKey, page, size, sorting.sort_by, sorting.sort_order]);
```

---

## 4. Design System — Colors, Typography, Spacing

### Brand palette
| Token | Hex | Usage |
|---|---|---|
| **Primary green** | `#69C920` | All primary CTAs, active states, headers' accent line, icons (downloads, eyes, edit) |
| **Primary green hover** | `#5ab61c` | Hover state for green CTAs |
| **Dark navy** | `#163143` | All headings + body text |
| **Light bg** | `#F1F5F5` | Page background, hover-fill on neutral surfaces, table-row "previous-cell" fill |
| **Border** | `#D7E6E7` | Default border on cards, drawers, inputs, dropdowns, table rows |
| **Muted text** | `#7F8A92` | Helper text, "Reason Description:" labels, "X record(s)" counters |
| **Disabled / placeholder** | `#9CA3AF` | Disabled icon, em-dash placeholder, empty-cell text |

### Status colors (badges, pills, cell backgrounds)

| Status | Background | Text | Used for |
|---|---|---|---|
| Success / On-time / OK / Remote | `#E4FAED` | `#1F8B3F` | On-time attendance, OK badges, remote member type |
| Warning / Late / Pending HR | `#FFF7D8` or `#FFF3D8` | `#B86E00` | Late attendance, pending-HR notes |
| Error / Missed | `#FFECEC` or `#FDE8E8` | `#C81E1E` | Missed attendance, error toasts/inline errors |
| Abandoned | `#FFE8CC` or `#FCE2E2` | `#9B1C1C` | Abandoned attendance |
| Info / Internal team | `#E0EEFB` | `#1A56DB` | Internal member type pill, info notes |
| Neutral / Unknown | `#F1F5F5` | `#163143` | Default pill when state doesn't fit any category |

### Typography
- **Font:** Poppins (Google Fonts). Loaded once in `index.html`.
- **Page title:** `text-2xl font-semibold text-[#163143]`
- **Section title:** `text-xl font-semibold` (often `text-[#163143]`)
- **Form labels:** `text-[14px] / text-[16px] font-semibold text-[#163143]` with `<span className="text-red-500 ml-1">*</span>` for required
- **Helper text:** `text-[12px] / text-[13px] / text-[14px] text-[#7F8A92]`
- **Body:** `text-[13px] / text-[14px] text-[#163143]`
- **Mono (passwords, IDs):** `font-mono`
- **Tabular numbers:** `tabular-nums` for tables of numbers

### Spacing & layout
- **Page padding:** Header `pt-7 pl-8` (or `px-8`), content `mx-8 mt-4 mb-8`
- **Card:** `bg-white rounded-[16px] border border-[#D7E6E7] p-6`
- **Pill border-radius:** `rounded-full`
- **Input height:** `44px` typically, `45px` on some legacy fields
- **Input border-radius:** `rounded-[24px]` or `rounded-[32px]` for the "pill" look
- **Drawer width:** `600` (edit drawers default)
- **Modal width:** `900` for previews, default for confirmations

### Brand accents
- Headings often have a colored underline via `border-b-2 border-[#69C920]`
- Section dividers: `border-b border-[#D7E6E7]`
- Tab active background: `#D0F7D8` (light green) with rounded-t corners

---

## 5. Shared Components — What to Reuse

> **Rule of thumb:** *Never* roll your own table, dropdown, drawer, or modal — reach for these first.

### Inputs / Forms

| Component | Use for | Key props |
|---|---|---|
| `Dropdown/UnifiedDropdown.jsx` | **Every** filter dropdown. Multi or single select with search. | `name`, `data`, `selectedList`, `setselectedList`, `multiSelect`, `displayKey`, `valueKey`, `searchKeys`, `fullwidthDropdown`, `isLoading` |
| `AntDRangePicker/` | Date range picker with presets (Today / Last 7 / Last 30) | `onChange(dateString)`, `startPlaceholder`, `endPlaceholder`, `defaultValue` |
| `CustomDatePicker/` | Single date input (legacy — AntD `DatePicker` works fine too) | |
| `NotesInput/` | Textarea with character counter | `notes`, `onChange`, `borderColor`, `placeholder` |
| `UploadFile/` | Multi-file upload with hyperlinked filenames, X-to-remove, image/PDF modal preview | `fileInfo`, `setFileInfo`, `required`, `reqNotes` |
| `UploadFile/ReasonAttachment.jsx` | Reason-specific file input variant | |
| `CustomSelect.jsx` | Lighter-weight AntD Select wrapper | |

### Buttons

| Component | Use for | Key props |
|---|---|---|
| `Buttons/CustomButton.jsx` | Generic pill button (Cancel/Save/Apply) | `text`, `textColor`, `bg`, `borderColor`, `width`, `onclick` |
| `Buttons/DownloadCSVButton.jsx` | The standard "Download CSV" pill (white bg, gray border, green icon) | `onClick` |
| `Buttons/MainPageButton.jsx` | Primary CTA on a page header | |

### Table

| Component | Use for |
|---|---|
| `AntDTable/index.jsx` | **The canonical table.** Pagination, sorting, expand, row selection, sticky header, sticky columns, custom dropdown actions per row. |

```jsx
<AntDTable
  columns={columns}
  data={rows}
  loading={loading}
  bordered
  rowKey="id"
  total={total}
  current={page}
  pageSize={size}
  onPageChange={setPage}
  onPageSizeChange={(s) => {
    setSize(s);
    setPage(1);                              // always reset on size change
  }}
  pagination={true}
  sorting={sorting}                          // { sort_by, sort_order: "ascend"|"descend"|null }
  onSortChange={(field, order) => {
    if (!field || !order) {
      setSorting({ sort_by: "id", sort_order: "descend" });
    } else {
      setSorting({ sort_by: field, sort_order: order });
    }
    setPage(1);
  }}
  onEdit={handleEditClick}                   // shows the pencil button in row
/>
```

**Column definition shape** — put these in `utils/tablesColumns.jsx`:

```js
export const ColumnDataExample = [
  {
    title: "Name",
    dataIndex: "user_name",
    key: "user_name",
    width: 180,
    fixed: "left",                           // sticky
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 120,
    disableSort: true,                       // mark non-sortable columns
    render: (_, row) => <StatusPill v={row.status} />,
  },
];
```

### Layout / Containers

| Component | Use for |
|---|---|
| `GenericAntDrawer/` | Right-side drawer for create/edit flows | 
| `GenericAntDeleteModal/` | Delete confirmation modal |
| `Tabs/Tabs.jsx` + `Tab` | Tabs component — usage: `<Tabs setCurrntActiveTab={setActive}><Tab data-label="X" labelData="">...content</Tab></Tabs>` |
| `GenericAntdTabs/index.jsx` | Alternative AntD-based tabs |
| `NeedHelpModal/` | "Need help?" CTA modal (already wired in Sidebar) |

### Feedback / Status

| Component | Use for |
|---|---|
| `Skeleton/index.jsx` | Loading shimmer placeholder for tables and forms |
| `AntDNotification/index.jsx` | Custom notification wrapper |
| `ArrayProgressBar.jsx` | Progress bar (e.g. evaluation step counter) |
| `react-hot-toast` | All transient success / error toasts. Use `toast.success("...")` and `toast.error("...")`. |

---

## 6. Architecture — Auth, Routing, State, API

### Auth flow (cookie-based)
- Backend issues an HttpOnly cookie on `POST /login`. Frontend never reads it.
- All API calls use `credentials: "include"` so the cookie travels.
- On any 401, the `Api` wrapper calls `POST /refresh` (de-duped via a shared `refreshPromise`) and retries the original request once. If refresh fails, the user is redirected to `/login`.
- `AuthProvider` calls `GET /me` on mount; on 401 it tries refresh-then-retry once.

### `ProtectedRoute` — role + email gates

```jsx
<ProtectedRoute
  requiredRoles={ROUTE_ROLES["my-feature"]}  // role allowlist
  requiredEmails={MY_FEATURE_EMAILS}          // optional finer gate
  routeRoles={ROUTE_ROLES}
>
  <MyFeaturePage />
</ProtectedRoute>
```

- If `requiredRoles` is set, user's role must be in the list.
- If `requiredEmails` is also set, user's email must additionally be in that list (case-insensitive). Both gates must pass.
- On failure → redirect to `getDefaultRouteForRole(role)`.

### `ROUTE_ROLES` (in `AppRouters.jsx`)
A flat map: `"my-feature": ["admin", "dev", "wfa"]`. The sidebar's `roles` field on each menu item must match.

### Sidebar (`Sidebar.jsx`)
- `menuList` is a hand-maintained array of `{ title, icon, route, roles, emails?, submenu? }`
- `filterMenuByRole(menuList, role, email)` produces the visible menu
- Sub-menus auto-hide if no submenu items pass the role/email gate

### Redux store
- **Classic pattern.** `types.js` has all action-type string constants. Actions are thunks. Reducers use a small `createReducer` helper.
- One slice per logical feature (`workforcedashboard`, `formsManagement`, `qaSettings`, `scheduleManagement`, `attendanceInfractions`, etc.).
- For read-only / self-contained pages, **skip the store** and call `Api` directly from the component via a thin action wrapper that just forwards `(success, data)` to a callback. Example: `EndorsementReport`, `HubspotRoster`, `OnboardFromHubspot`.

### The `Api` wrapper (`src/reduxStore/lib/api.js`)
Single class. Use only this — never call `fetch` directly elsewhere.

```js
Api.get(url, queryParams)      // GET; queryParams object → URL-encoded
Api.post(url, body)            // POST JSON
Api.put(url, body)
Api.patch(url, body)
Api.delete(url, body)
Api.postMultiForm(url, formData)  // for file uploads
```

**Returns:** `{ data, contentType }`. If the response is `text/csv`, `data` is a `Blob`. If 204, `data` is `{}`. Otherwise `data` is the parsed JSON body.

**Array params** — pass arrays directly; the wrapper repeats keys:
```js
Api.get('/items', { user_id: [1, 2, 3] })
// → /items?user_id=1&user_id=2&user_id=3
```

**Null / undefined / empty arrays** are skipped from the URL automatically.

**CSV downloads:**
```js
Api.get('/items', { ...filters, csv: 'true' })
  .then(({ data, contentType }) => {
    const blob = data instanceof Blob ? data : new Blob([data], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `items_${dayjs().format('YYYYMMDD')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  });
```

### Action pattern

```js
// reduxStore/action/myFeature.js
import Api from "../lib/api";
import * as types from "./types";

function setItems(data) {
  return { type: types.FETCH_ITEMS, data };
}

export const getItems = (params, handleResponse) => (dispatch) => {
  dispatch({ type: types.IS_LOADING_ITEMS, data: true });
  Api.get(`/items`, params)
    .then(({ data }) => {
      dispatch(setItems(data));
      dispatch({ type: types.IS_LOADING_ITEMS, data: false });
      handleResponse?.(true, data);
    })
    .catch((err) => {
      dispatch({ type: types.IS_LOADING_ITEMS, data: false });
      handleResponse?.(false, err);
    });
};
```

For self-contained pages, the action becomes a thin pass-through (no `dispatch`):
```js
export const getItems = (params, handleResponse) => () => {
  Api.get(`/items`, params)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => handleResponse?.(false, err));
};
```

---

## 7. Common Page Patterns

### A. Filter bar + table page (most common)

The **canonical layout** every reporting page uses:

```
[Page title]                                         [Optional CTA / Export CSV]

Filters: [Date Range] [Filter 1] [Filter 2] [Filter 3] [Filter 4] [Filter 5]

[Section title]                                      [DownloadCSVButton]
[Loading? → Skeleton  :  AntDTable]
```

**Two filtering styles:**

1. **Live filtering** (preferred) — filter state IS the source of truth; `useEffect` fires on any change.
```js
useEffect(() => {
  fetchData();
}, [clientsFilter, agentsFilter, page, size, sorting.sort_by, sorting.sort_order]);
```

2. **Apply-button filtering** (when fetches are slow or expensive) — pending vs applied state separation:
```js
const [pendingFilters, setPendingFilters] = useState({...});
const [appliedFilters, setAppliedFilters] = useState({...});
const [filtersVersion, setFiltersVersion] = useState(0);

const handleApply = () => {
  setAppliedFilters({ ... });
  setFiltersVersion(v => v + 1);     // children watch this counter
};
```

**Always reset to page 1** on filter change. Without it, narrowing filters lands users on empty pages.

### B. Edit drawer pattern

```jsx
<Drawer
  title={<TitleWithCloseIcon onClose={onClose} />}
  placement="right"
  closable={false}
  onClose={onClose}
  open={open}
  width={600}
  className="[&_.ant-drawer-header]:px-6 [&_.ant-drawer-header]:py-4 [&_.ant-drawer-header]:border-b [&_.ant-drawer-body]:p-0 [&_.ant-drawer-body]:space-y-6"
>
  {loading ? <Skeleton /> : (
    <div className="space-y-6">
      {/* Sticky top with Cancel/Save */}
      <div className="sticky top-0 z-10 bg-white flex items-center border-b border-[#D7E6E7] pl-6 pt-4">
        ...
        <CustomButton text="Cancel" bg="white" borderColor="#00000040" onclick={onClose} />
        <CustomButton text="Save" bg="#69C920" textColor="white" onclick={handleSave} />
      </div>
      {/* Form fields with px-6 padding */}
      <div className="space-y-2 px-6">
        <label className="text-[#163143] font-poppins text-[16px] font-semibold leading-[20.5px]">
          Field Name<span className="text-red-500 ml-1">*</span>
        </label>
        <UnifiedDropdown ... />
      </div>
      ...
    </div>
  )}
</Drawer>
```

**Diff-based save bodies** (recommended) — only send fields that actually changed, vs sending the full record every save. Avoids stale-overwrite races when two users edit the same record near-simultaneously.

### C. Tabs

```jsx
import { Tab, Tabs } from "../../components/Tabs/Tabs";

const [activeTab, setActiveTab] = useState("Tab One");

<Tabs setCurrntActiveTab={setActiveTab}>
  <Tab data-label="Tab One" labelData="">
    <FirstSection filters={filters} />
  </Tab>
  <Tab data-label="Tab Two" labelData="">
    <SecondSection filters={filters} />
  </Tab>
</Tabs>
```

- Filter state lives at the **parent** so switching tabs preserves selections.
- Each tab section owns its own pagination / sort / fetch state.
- Use `JSON.stringify(filters)` as a stable `useEffect` dep to avoid re-render churn from new object references each render.

### D. Form validation

```js
const [emailError, setEmailError] = useState("");

const validate = () => {
  let ok = true;
  setEmailError("");
  if (!email.trim()) {
    setEmailError("Email is required.");
    ok = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    setEmailError("Enter a valid email address.");
    ok = false;
  }
  return ok;
};

// In the Input:
<Input
  status={emailError ? "error" : ""}
  onChange={(e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");        // clear on edit
  }}
/>
{emailError && <div className="text-[#C81E1E] text-[12px] mt-1">{emailError}</div>}
```

**On submit:**
- Disable the submit button (`disabled={submitting}`) and change its label (`"Submitting…"` or `"Saving…"`).
- On success → `toast.success(...)` + clear form OR open success modal.
- On error → field-specific inline message if a field maps cleanly, otherwise `toast.error(...)`.

### E. Pagination state pattern (avoid stale-closure races)

**Always use functional updaters** for `setPagination` when both page and size can change in the same tick:

```js
onPageChange={(page) => setPagination(prev => ({ ...prev, page }))}
onPageSizeChange={(size) =>
  setPagination(prev => prev.size !== size ? { ...prev, size, page: 1 } : prev)
}
```

Object-spread closures (`setPagination({ ...pagination, page })`) cause subtle bugs where size changes get clobbered.

### F. URL sync (optional but recommended)

Mirror filter + pagination state to URL params via `useLocation` + `navigate({ search })`. Stakeholders can then share pre-filtered views via link. Implemented on `AttendanceInfractions` for reference.

---

## 8. Code Conventions

### Filenames
- Pages: `PascalCase` folder names, `index.jsx` entry
- Components: `PascalCase`
- Actions/reducers: `camelCase`

### Imports order
1. React + hooks
2. Third-party libs (`antd`, `react-redux`, etc.)
3. Project components (relative paths)
4. Redux actions
5. Utils / constants

### `"use client"`
- Every page file starts with `"use client";` — convention inherited from Next.js, harmless under Vite.

### Color values
- Use **arbitrary Tailwind values** for brand colors: `text-[#163143]`, `bg-[#69C920]`, `border-[#D7E6E7]`. Don't define them in `tailwind.config.js` — keeps colors searchable in code.

### Error handling
- API errors → `toast.error(data?.detail || err?.message || "Failed to …")` — always have a fallback.
- 404 / 422 → inline next to the offending field (when possible).
- 500 → generic toast.

### Date formatting
- New code: `dayjs(d).format("MMM D, YYYY")` for short dates, `dayjs(d).format("YYYY-MM-DD HH:mm")` for inputs/payloads.
- Legacy code still uses `moment` — leave it unless touching the file for other reasons.

### Null / empty rendering
- `—` (em-dash) for null cell values, in `text-[#9CA3AF]`.
- `"-"` (hyphen-minus) is acceptable for legacy column renderers; new ones should use `—`.

### Naming
- API param keys: `snake_case` (matches FastAPI backend convention).
- React props / state: `camelCase`.

### Toggles & buttons
- Pill style: `rounded-full`, `px-5 py-[8px]`, `text-[14px] font-semibold`.
- Selected pill = brand green bg + white text; unselected = white bg + neutral text + brand-green hover border.

---

## 9. Gotchas / Lessons Learned

| Gotcha | Symptom | Fix |
|---|---|---|
| **`AntDTable` pagination race** | Choosing a new page size (10→50) doesn't apply — API still gets `size=10` | Use functional updater form in `setPagination(prev => …)` (see Section 7.E). Object-spread reads from a stale closure. |
| **AntD's `RangePicker` is uncontrolled by default** | Calling `setX(null)` from outside doesn't clear the picker | Bump a `key` on `AntDRangePicker` to force remount: `<AntDRangePicker key={dateResetKey} … />` |
| **`onPageSizeChange` fires on every page click** | Parent's size-handler runs even when only page changed; can reset things | Inside `AntDTable.onChange`, only call `onPageSizeChange` if `size !== pageSize` |
| **JSON-encoded attachment columns** | `attachment_url` stores a JSON array as a string — fragile if filenames contain quotes | Use `isJsonString` helper before parsing; long-term, push backend to make attachments a real one-to-many table |
| **Hardcoded weekdays** | Edit-schedule save overwrites Sat/Sun-only schedules to Mon–Fri | Always render every API-relevant field in the form, even if read-only — never hardcode in the save body |
| **Stale `localStorage` user info** | `auth.js` writes `auth_token` + `user_details` to localStorage despite cookie auth | Don't read from localStorage for auth — single source of truth = Redux state from `/me` |
| **Filter param key mismatch** | UI shows filter selected but backend ignores it | Action wrappers should accept both name variants when an inconsistency exists: `params.foo ?? params.short_foo`. Long-term, align both sides. |
| **Mixed date libs** | Some files import `moment`, some import `dayjs` | Default to `dayjs` for new code; migrate `moment` when touching the file |
| **`AntDRangePicker` returns `["", ""]` on clear** | Falsy check `dates ? ... : monthDefault` doesn't trigger | Use `pendingDates?.[0] || null` (empty string is falsy → null) |
| **No CSP** in `index.html` | SecOps will flag this | Add a `<meta http-equiv="Content-Security-Policy" …>` restricting `script-src` to `self` and the API origin |
| **Mass-broadcast filter useEffects** | Changing one filter triggers N refetches | Watch a **stable** dep — either `JSON.stringify(filters)` or a manually-bumped `filtersVersion` counter |

---

## 10. What NOT to Do

- ❌ Don't introduce TypeScript. The project is JSX.
- ❌ Don't add a new HTTP client. Use the `Api` wrapper.
- ❌ Don't `fetch()` directly from components — wrap it as an action.
- ❌ Don't add Apply / Clear buttons on filter bars unless fetches are truly slow. Live filtering is the convention.
- ❌ Don't roll your own table component — extend `AntDTable`.
- ❌ Don't roll your own dropdown — use `UnifiedDropdown`.
- ❌ Don't put role-checks in components — gate at `ProtectedRoute` + `Sidebar.roles`.
- ❌ Don't write user info to `localStorage`. Cookie-based auth = source of truth is the cookie + `/me`.
- ❌ Don't commit real Fernet keys, API tokens, or PATs. `.env` has placeholders only.
- ❌ Don't use `moment` in new code — `dayjs` only.
- ❌ Don't store filter state in Redux just because it's filter state. Keep it in the page unless it needs to survive route changes.
- ❌ Don't reach into `state.workforcedashboard` from a feature unrelated to workforce. If you need shared filter dropdowns (clients, agents, TLs), call them via dedicated actions per feature.

---

## Appendix A — One-shot prompt for Claude on a new project

> "I'm starting a new internal React app. Set it up following the standards in `FE_PROJECT_STANDARDS.md` from the TalentPop QA app:
> - **Stack:** React 19 + Vite (rolldown) + Tailwind 4 + AntD 5 + classic Redux + redux-thunk + react-router-dom 7
> - **Language:** JSX, not TypeScript
> - **HTTP:** copy the `Api` wrapper class (cookie auth, auto-refresh on 401, array-repeated query params)
> - **Auth:** cookie-based with `AuthProvider` (`/me` on mount + refresh-then-retry on 401)
> - **Routing:** role-gated `ProtectedRoute` with `ROUTE_ROLES` map; optional `requiredEmails` for email allowlists
> - **State:** classic Redux with `createReducer` helper; for self-contained pages, skip the store and call `Api` from a thin action wrapper
> - **Components:** reuse `AntDTable`, `UnifiedDropdown`, `AntDRangePicker`, `CustomButton`, `DownloadCSVButton`, `NotesInput`, `UploadFile`, `Skeleton`, `Tabs/Tab`, `GenericAntDrawer`, `GenericAntDeleteModal`
> - **Design:** primary green `#69C920`, dark navy `#163143`, border `#D7E6E7`, status colors per the Section 4 table; Poppins font
> - **Patterns:** inline 'Filters:' row with live updates (no Apply button) by default; tabs preserve filter state at parent; pagination uses functional updaters (`setPagination(prev => …)`); diff-based edit-drawer save bodies; URL-synced filters on shareable reporting pages
> - **What not to do:** no TypeScript, no `fetch()` outside the wrapper, no `localStorage` for auth, no `moment` in new code, no Apply buttons unless fetches are slow"

---

## Appendix B — Reference pages by pattern

| Pattern | Reference page |
|---|---|
| Filter bar + paginated table + CSV export | `pages/HubspotRoster/index.jsx` |
| Tabs with shared filter state | `pages/EndorsementReport/index.jsx` |
| Edit drawer with diff-based save | `pages/AttendanceInfractions/EditInfractionDrawer.jsx` |
| Form with success modal + copy-to-clipboard | `pages/OnboardFromHubspot/index.jsx` |
| URL-synced filters | `pages/AttendanceInfractions/index.jsx` |
| Multi-tab + complex filter combos | `pages/WFAAttendanceManagement/WFAAttendanceReporting/index.jsx` |
| Read-only stakeholder view (no Redux store) | `pages/EndorsementReport/AttendanceOverviewSection.jsx` |
| File upload with image/PDF preview | `components/UploadFile/index.jsx` |
| Weekday pill picker | `pages/ScheduleManagement/EditScheduleDrawer.jsx` |
| Live filtering, no Apply button | `pages/WorkForceTeamDashboard/RemoteTeamReporting/index.jsx` |
