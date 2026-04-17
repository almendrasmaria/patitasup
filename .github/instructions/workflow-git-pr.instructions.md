---
applyTo: "**"
excludeAgent: "code-review"
---

# Workflow Rules: Commits and Pull Requests

## Commit nomenclature

Use:

`<type>(<scope>): <summary>`

Allowed types:

- `feat`
- `fix`
- `refactor`
- `docs`
- `test`
- `chore`
- `build`
- `ci`

Examples:

- `feat(auth): add guarded profile route`
- `fix(cats): correct age filter edge case`
- `task(prisma):` is not valid. Use `chore(prisma): ...`.

## PR nomenclature

PR title must use the same format:

`<type>(<scope>): <summary>`

PR description must be brief and include:

1. What changed
2. Why it changed
3. How it was validated

## Completion criteria

Before finalizing any implementation:

1. Confirm commit title proposal matches format.
2. Confirm PR title proposal matches format.
3. Keep PR body concise and reviewer-oriented.
