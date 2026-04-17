---
name: patitasup-git-pr-flow
description: Use when creating commits or pull requests for this repository, enforcing naming conventions by task type and concise PR descriptions.
argument-hint: "taskType scope short-summary"
---

# PatitasUp Git and PR Flow Skill

## Commit naming policy

Use Conventional Commit style with mandatory scope:

`<type>(<scope>): <summary>`

Allowed types:

- `feat` for new user-facing capability
- `fix` for bug fixes
- `refactor` for non-behavioral internal changes
- `docs` for documentation-only changes
- `test` for tests added or modified
- `chore` for maintenance or tooling tasks
- `build` for build/dependency changes
- `ci` for CI workflow changes

Examples:

- `feat(auth): add supabase session refresh in middleware`
- `fix(cats): prevent empty result pagination overflow`
- `chore(prisma): align generated client with schema`

## Branch naming policy

- Feature: `feature/<scope>-<short-topic>`
- Fix: `fix/<scope>-<short-topic>`
- Task/chore: `task/<scope>-<short-topic>`

## Pull request naming policy

PR title uses same format as commit title:

`<type>(<scope>): <summary>`

PR description must be brief and concrete with this template:

1. `What`: one short paragraph
2. `Why`: one short paragraph
3. `Validation`: compact checklist of executed checks

## Minimal PR template

```md
## What
Implemented ...

## Why
Needed to ...

## Validation
- [x] npm run lint
- [x] npm run build
- [x] Manual flow tested: ...
```

## Enforcement expectations

1. Do not create commit messages outside the defined format.
2. Do not create PR titles outside the defined format.
3. Keep PR description short and directly actionable for reviewers.
