# TP QA App

Internal QA / workforce management app for TalentPop. Used to evaluate support
tickets against scoring rubrics, manage QA forms, and track team/agent
performance, attendance, and reporting.

## Tech Stack

- **React 19** + **Vite** (using `rolldown-vite`) — build tool & dev server
- **Tailwind CSS v4** — utility-first styling
- **Ant Design v5** — component library
- **Redux** (classic, with a `createReducer` helper) + **redux-thunk** — state management
- **react-router-dom v7** — routing, with role-based route protection
- **axios** — HTTP client
- **JavaScript (JSX)** — not TypeScript

## Project Structure

```
src/
  assets/          Static assets (images, logos)
  components/      Shared/reusable UI components (tables, modals, dropdowns, etc.)
  layout/          App shell: MainLayout (sidebar), FullWidthLayout, AuthProvider,
                   ProtectedRoute, AppRouters, Sidebar
  lib/             Api class (fetch wrapper with cookie auth + auto refresh)
  pages/           One folder per feature/page (see below)
  reduxStore/
    action/        Thunk action creators, one file per domain
    reducer/       Reducers, one file per domain
    store/         configureStore.js, createReducer.js helper
  theme/           Ant Design theme config
  utils/           Helper functions, shared constants
```

### Key pages (`src/pages`)

- `EvaluateTickets` — QA evaluation flow (ticket list + evaluate-form scoring UI)
- `FormsManagement` — create/edit QA rubric forms
- `PerformanceMonitoringForm`, `TicketMonitoringForm`, `CustomMonitoringForm` — client-specific monitoring forms
- `WorkForceTeamDashboard`, `WFAAttendanceManagement` — team/attendance dashboards
- `AttendanceInfractions`, `ScheduleManagement`, `PerformanceReview`, `EndorsementReport` — HR/reporting tools
- `LoginPage`, `QASettings`, `BugsFeatures`, `NeedHelp` — auth & misc utility pages

## Authentication

Cookie-based (httpOnly cookies set by the backend):

- `AuthProvider` (`src/layout/AuthProvider.jsx`) checks `/me` on app mount to determine the logged-in user.
- The `Api` class (`src/lib/api.js`) sends every request with `credentials: "include"` and automatically calls `/refresh` on a `401` before retrying the original request once.
- `ProtectedRoute` + a `ROUTE_ROLES` map gate pages by user role (admin, dev, qa, qa-tl, qa-dm, qas, tl, om, csm, aom, etc.).

## Environment Variables

Create a `.env` file in the project root (not committed):

```
VITE_API_URL=https://api.talentpopapp.com
VITE_ENCRYPTION_KEY=your_fernet_key_here
```

- `VITE_API_URL` — base URL the app talks to. Point this at a local backend (e.g. `http://localhost:8000`) when running the API locally.
- `VITE_ENCRYPTION_KEY` — Fernet key used for client-side encryption/decryption (see `fernet` dependency usage).

## Getting Started

```bash
# install dependencies
npm install

# start the dev server (Vite, with --host so it's reachable on the network)
npm run dev

# build for production
npm run build

# preview a production build locally
npm run preview

# lint the codebase
npm run lint
```

The dev server runs on Vite's default port (`5173`) unless otherwise configured.

## Conventions

- Prefer editing existing components/pages over creating new abstractions.
- Redux uses the classic action-type/action-creator/reducer pattern (not Redux Toolkit) — see `src/reduxStore/store/createReducer.js` for the shared reducer helper.
- Notifications go through the shared `AntDNotification` wrapper (`src/components/AntDNotification`), not raw `antd` message/notification calls.
- Styling mixes Tailwind utility classes with Ant Design's theme config (`src/theme`) and targeted CSS overrides — match whichever pattern the surrounding file already uses.
- Primary brand colors: green `#69C920` (primary/accent), dark navy `#163143` (text/headers), light background `#F1F5F5`.
