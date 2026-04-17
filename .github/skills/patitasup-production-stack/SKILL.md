---
name: patitasup-production-stack
description: Use when implementing PatitasUp features end-to-end with Next.js + TypeScript, Prisma ORM, Supabase auth/database, and Vercel deployment readiness.
argument-hint: "Feature or task summary, scope, and acceptance criteria"
---

# PatitasUp Production Stack Skill

## When to use

Use this skill when the user asks to implement, refactor, debug, or prepare production delivery for this app.

## Stack contract

1. Backend and shared logic must be TypeScript.
2. Prisma is the only ORM for DB access on PostgreSQL.
3. Keep two database connections configured: local PostgreSQL for local development and Supabase PostgreSQL for shared/remote environments.
4. Never mix local and Supabase connection strings in the same environment profile.
5. Supabase handles authentication and database platform concerns.
6. Vercel is the target deployment platform.

## MCP-aware workflow

1. Check available MCP servers in `.vscode/mcp.json`.
2. For DB and auth platform tasks, prioritize `supabase/*`, `prisma-remote/*`, and `postgres/*` tools.
3. For deployment and Vercel project tasks, prioritize `vercel-local/*` tools.
4. For pull requests and repository workflows, prioritize `github-local/*` tools.
5. If a requested provider MCP is not configured, continue with local CLI workflow and mention the limitation.

## Implementation sequence

1. Read impacted modules and map required changes.
2. Implement code in TypeScript with minimal API disruption.
3. Update Prisma schema/migrations if data model changes.
4. Validate app behavior and type safety.
5. Prepare deployment notes for Vercel.
6. Prepare commit and PR text according to project policy.

## Required output format

At the end of each task, return:

1. Summary of functional change.
2. Changed files list.
3. Validation commands executed and result.
4. Suggested commit message.
5. Suggested PR title and concise PR description.
