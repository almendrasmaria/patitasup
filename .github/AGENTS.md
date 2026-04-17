# PatitasUp Agents Index

## Available custom agents

- `patitasup-production-agent`: main implementation and delivery agent.

## Available skills

- `patitasup-production-stack`: end-to-end implementation workflow for this stack.
- `patitasup-git-pr-flow`: commit and PR naming + concise PR body workflow.

## Prompt shortcuts

- `/start-feature`
- `/finish-task-and-pr`

## Hooks

- `.github/hooks/git-flow-guard.json`
  - Blocks commit/PR commands that do not follow project naming rules.
