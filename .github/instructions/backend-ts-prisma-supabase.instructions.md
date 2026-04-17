---
applyTo: "src/**/*.{ts,tsx},prisma/**/*.prisma,prisma/**/*.sql"
---

# Backend and Data Rules

1. Write backend and data-layer logic in TypeScript.
2. Route all database access through Prisma models and client.
3. Keep schema changes explicit and migration-safe.
4. For auth-sensitive code, align behavior with Supabase session model.
5. Avoid hidden implicit casts; preserve strong typing.

## Prisma change guardrails

1. If schema changes, update migration artifacts accordingly.
2. Keep naming consistent with existing Prisma models.
3. Avoid introducing raw SQL unless strictly necessary.

## Validation expectations

After backend/data changes, run relevant checks if available:

- lint
- type check/build
- focused manual verification of changed flow
