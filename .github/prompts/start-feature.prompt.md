---
name: start-feature
description: Start a new feature following PatitasUp stack and workflow conventions.
agent: patitasup-production-agent
model: GPT-5.3-Codex (copilot)
argument-hint: "feature summary, scope, acceptance criteria"
tools:
  - search/codebase
  - search
  - edit/editFiles
  - execute/getTerminalOutput
  - execute/runInTerminal
  - read/terminalSelection
  - read/terminalLastCommand
  - read/problems
  - supabase/*
  - prisma-remote/*
---

Start implementation for this feature:

${input:featureSummary:Describe the feature goal}

Scope:
${input:featureScope:Suggested scope name (auth, cats, contact, prisma, deploy)}

Acceptance criteria:
${input:acceptanceCriteria:List concrete acceptance criteria}

Required behavior:

1. Inspect impacted files first.
2. Implement with TypeScript and Prisma conventions.
3. Use Supabase-compatible auth/data flows.
4. Keep change set minimal and production-focused.
5. Provide validation commands and outcomes.
6. End with:
   - proposed branch name
   - proposed commit message
   - proposed PR title and concise PR description
