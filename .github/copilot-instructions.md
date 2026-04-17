# PatitasUp Copilot Instructions

This repository uses Next.js and TypeScript. Follow these rules in all coding tasks:

1. Use TypeScript for backend and app logic.
2. Use Prisma as ORM for database operations on PostgreSQL.
3. Use Supabase for authentication and database platform tasks.
4. Prepare changes to be deployable on Vercel.
5. Keep modifications minimal and consistent with existing architecture.
6. Prefer small, reviewable commits and concise PR descriptions.

## Database connection policy

1. PostgreSQL is the database engine used by Prisma.
2. Keep two DB connections configured: one local PostgreSQL connection for local development and one Supabase PostgreSQL connection for shared/remote environments.
3. Do not mix local and Supabase connection strings in the same environment profile.
4. Ensure Prisma commands run against the intended target environment before applying migrations.

## Delivery policy

For implementation tasks, always provide:

1. Functional summary
2. Changed files
3. Validation executed
4. Commit title proposal
5. PR title + concise description proposal

## Commit and PR format

- Commit: `<type>(<scope>): <summary>`
- PR title: `<type>(<scope>): <summary>`
- Allowed types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `build`, `ci`

## MCP policy

Configured MCP servers currently include Supabase, Prisma-Remote, Postgres, GitHub-Local, and Vercel-Local.

When database/auth tasks are required:

1. Prefer MCP tools from Supabase, Prisma-Remote, and Postgres.
2. For pull requests and repository workflows, prefer MCP tools from GitHub-Local.
3. For deployment and Vercel project tasks, prefer MCP tools from Vercel-Local.
4. If a requested provider MCP is missing, continue with local CLI workflow and explicitly mention the limitation.
