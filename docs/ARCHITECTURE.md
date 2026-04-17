# Frontend Architecture

## Tech Stack
- React 18 + Vite
- Bootstrap 5.3 + React Bootstrap
- React Query — server state + caching
- React Hook Form + Zod — forms + validation
- Recharts — charts
- TanStack Table — data table
- Axios — HTTP client
- Vitest + Testing Library — TDD

## Folder Structure
```
src/
  api/              → axios API calls (employeesApi, insightsApi, metaApi)
  components/
    employees/      → EmployeeTable, EmployeeModal, DeleteConfirmModal
    insights/       → InsightsDashboard, StatCards, SalaryChart, DistributionChart
    shared/         → Navbar, LoadingSpinner, ErrorAlert
  hooks/            → useEmployees, useInsights, useMeta
  pages/            → EmployeesPage, InsightsPage
  schemas/          → employeeSchema (Zod validation)
  utils/            → salaryFormatter, dateFormatter
  test/             → setup.js
  __tests__/        → all test files mirroring src structure
```

## Component Tree
```
App
├── Navbar
├── EmployeesPage
│   ├── EmployeeTable (TanStack Table)
│   │   ├── SearchBar
│   │   └── FilterBar
│   ├── EmployeeModal (Add/Edit)
│   └── DeleteConfirmModal
└── InsightsPage
    ├── StatCards (min/max/avg)
    ├── SalaryChart (bar chart)
    ├── DistributionChart (histogram)
    └── HeadcountChart (by department)
```

## Data Flow
```
Page → custom hook → React Query → axios → Rails API
                   ↓
              cached response
                   ↓
              passed as props to components
```

## TDD Approach
- Test utilities first (salaryFormatter, dateFormatter)
- Test custom hooks with mocked API
- Test components with Testing Library
- Every test file mirrors the src file it tests