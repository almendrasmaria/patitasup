---
applyTo: "src/**/*.{ts,tsx},prisma/**/*.prisma,prisma/**/*.sql"
---

# Backend and Data Rules

1. Write backend and data-layer logic in TypeScript.
2. Use PostgreSQL as the database engine via Prisma.
3. Route all database access through Prisma models and client.
4. Maintain two connection targets: local PostgreSQL for local development and Supabase PostgreSQL for remote/shared environments.
5. Keep environment variables separated per target so local and Supabase URLs are never mixed accidentally.
6. Keep schema changes explicit and migration-safe.
7. For auth-sensitive code, align behavior with Supabase session model.
8. Avoid hidden implicit casts; preserve strong typing.

## Prisma change guardrails

1. If schema changes, update migration artifacts accordingly.
2. Keep naming consistent with existing Prisma models.
3. Avoid introducing raw SQL unless strictly necessary.
4. Validate that migration and generate commands are pointed to the intended connection target (local or Supabase) before execution.

## Validation expectations

After backend/data changes, run relevant checks if available:

- lint
- type check/build
- focused manual verification of changed flow
