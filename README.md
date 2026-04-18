# Salary Management UI

Salary management dashboard for HR Managers to manage 
10,000 employees with real-time salary insights. Built with React 18, 
Vite, and Bootstrap 5.

## Live Demo

- **Frontend:** https://salary-management-ui.onrender.com
- **API:** https://salary-management-api-j1hf.onrender.com

---

## Tech Stack

- **React 18 + Vite**
- **Bootstrap 5.3 + React Bootstrap**
- **React Query** — server state + caching
- **TanStack Table v8** — data table
- **React Hook Form + Zod** — forms + validation
- **Recharts** — salary charts
- **Axios** — HTTP client
- **Vitest + Testing Library** — TDD

---

## Features

### Employees
- View 10,000 employees with server-side pagination
- Search by name or email (debounced — no API call on every keystroke)
- Filter by country and department
- Add, edit, delete employees via modal
- Client-side Zod validation + server error display
- Full country names via `Intl.DisplayNames` API
- Correct currency symbols per country

### Salary Insights
- Min / max / average salary with weighted mean calculation
- Total headcount across all active employees
- Average salary by job title (bar chart)
- Top 5 paid roles with gold / silver / bronze medals
- Salary distribution histogram
- Headcount by department (horizontal bar chart)
- Recent hires in last 90 days
- All metrics respond to country filter
- Local currency shown when country selected

---

## Local Setup

### Prerequisites
- Node.js 18+
- Running instance of `salary-management-api`

### Steps

**1. Clone the repo**
```bash
git clone https://github.com/YOUR_USERNAME/salary-management-ui.git
cd salary-management-ui
```

**2. Install dependencies**
```bash
npm install
```

**3. Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:3000/api/v1
```

**4. Start dev server**
```bash
npm run dev
```

App available at `http://localhost:5173`

---

## Running Tests

```bash
npm test
```

Expected output:
```
✓ src/__tests__/utils/salaryFormatter.test.js
✓ src/__tests__/utils/employeeSchema.test.js
✓ src/__tests__/hooks/useEmployees.test.js
✓ src/__tests__/hooks/useInsights.test.js
```

---

## Folder Structure

```
src/
  api/              → axios API calls
    client.js       → axios instance + error interceptor
    employeesApi.js
    insightsApi.js
    metaApi.js
  components/
    employees/      → EmployeeTable, EmployeeModal, DeleteConfirmModal
    insights/       → StatCards, SalaryChart, DistributionChart,
                      HeadcountChart, TopRolesTable, RecentHiresTable
    shared/         → Navbar, LoadingSpinner, ErrorAlert
  hooks/            → useEmployees, useInsights, useMeta, useDebounce
  pages/            → EmployeesPage, InsightsPage
  schemas/          → employeeSchema (Zod)
  utils/            → salaryFormatter, countryNames
  __tests__/        → all test files
```

---

## TDD Approach

Tests were written before implementation:

```
test: red   → write failing test, commit alone
feat: green → minimum code to pass, commit
refactor:   → clean up, specs stay green
```

Test layers:
- `utils/` — pure function tests (salary formatter, date formatter)
- `schemas/` — Zod validation schema tests
- `hooks/` — React Query hook tests with mocked API

---

## CI/CD

GitHub Actions runs on every push to `main`:
- Runs full Vitest suite
- Blocks merge if any test fails

---

## Design Decisions

See [docs/DECISIONS.md](docs/DECISIONS.md) for full reasoning behind
every technical decision including why React over Next.js, Bootstrap
over Tailwind, and Vitest over Jest.

---

## Planning & Architecture Docs

| Document | Description |
|----------|-------------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Component tree and data flow |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Technical decision log |
