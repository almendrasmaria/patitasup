---
name: finish-task-and-pr
description: Finalize current task with validated commit and PR naming/output.
agent: patitasup-production-agent
model: GPT-5.3-Codex (copilot)
argument-hint: "task type, scope, summary"
tools:
  - search/codebase
  - search
  - execute/getTerminalOutput
  - execute/runInTerminal
  - read/terminalSelection
  - read/terminalLastCommand
  - read/problems
  - postgres/*
  - github-local/*
  - vercel-local/*
---

Finalize the current work and prepare merge-ready output.

Inputs:

- Task type: ${input:taskType:feat|fix|refactor|docs|test|chore|build|ci}
- Scope: ${input:scope:auth|cats|contact|prisma|deploy|other}
- Summary: ${input:summary:Short sentence}

Checklist:

1. Confirm changed files are coherent and minimal.
2. Run relevant validation commands.
3. Propose commit title using `<type>(<scope>): <summary>`.
4. Propose PR title using `<type>(<scope>): <summary>`.
5. Draft concise PR body with sections: What, Why, Validation.
6. If GitHub-Local MCP is available and user requests execution, prefer it for PR creation and updates.
7. If GitHub-Local MCP is unavailable and `gh` CLI is available and user requests execution, run `gh pr create` with the generated title/body.
