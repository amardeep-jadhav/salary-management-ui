# Frontend Technical Decisions

## React 18 + Vite over Next.js
Spec asks for minimal yet usable. No SSR needed for an internal
HR tool. Vite gives instant HMR and zero config. Next.js would
add unnecessary complexity.

## Bootstrap 5.3 over Tailwind
On a tight deadline, Bootstrap gives production-ready components
immediately — tables, modals, forms, badges. Tailwind requires
building every component from scratch.

## React Query over Redux
Server state management only. React Query handles caching,
background refetch, loading and error states out of the box.
Redux would be overkill for a data-fetching use case.

## TanStack Table over plain HTML table
10,000 employees need client-side sorting, filtering and
pagination. TanStack Table handles this with zero re-renders.

## Zod + React Hook Form
Type-safe validation schema shared between form and API.
Uncontrolled inputs mean zero re-renders on every keystroke.

## Vitest over Jest
Native Vite integration — no babel config, no transform issues.
Faster than Jest for Vite projects.

## Two separate repos over monorepo
Clean separation of concerns. Independent deployment.
Independent commit histories — Rails TDD story separate
from React component story.