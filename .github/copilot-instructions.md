# PatitasUp Copilot Instructions

This repository uses Next.js and TypeScript. Follow these rules in all coding tasks:

1. Use TypeScript for backend and app logic.
2. Use Prisma as ORM for database operations.
3. Use Supabase for authentication and database platform tasks.
4. Prepare changes to be deployable on Vercel.
5. Keep modifications minimal and consistent with existing architecture.
6. Prefer small, reviewable commits and concise PR descriptions.

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

Configured MCP servers currently include Supabase and Prisma-Remote.

When database/auth tasks are required:

1. Prefer MCP tools from Supabase and Prisma-Remote.
2. If a requested provider MCP is missing (for example Vercel/GitHub), continue with local CLI workflow and explicitly mention the limitation.
