#!/usr/bin/env node

import process from "node:process";

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data));
  });
}

function pickCommand(input) {
  if (!input || typeof input !== "object") return "";
  const toolInput = input.tool_input || input.toolInput || {};
  return String(
    toolInput.command ||
      toolInput.text ||
      input.command ||
      ""
  ).trim();
}

function extractQuotedArg(cmd, flag) {
  const re = new RegExp(`${flag}\\s+(["'])(.*?)\\1`, "i");
  const match = cmd.match(re);
  return match ? match[2].trim() : "";
}

function commitMessageFromCommand(cmd) {
  if (!/\bgit\s+commit\b/i.test(cmd)) return "";
  return extractQuotedArg(cmd, "-m");
}

function prTitleFromCommand(cmd) {
  if (!/\bgh\s+pr\s+create\b/i.test(cmd)) return "";
  return extractQuotedArg(cmd, "--title");
}

function prBodyFromCommand(cmd) {
  if (!/\bgh\s+pr\s+create\b/i.test(cmd)) return "";
  return extractQuotedArg(cmd, "--body");
}

function isConventionalTitle(text) {
  return /^(feat|fix|refactor|docs|test|chore|build|ci)\([a-z0-9-]+\):\s.+$/.test(
    text
  );
}

function deny(reason) {
  const out = {
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: reason
    },
    systemMessage: reason
  };
  process.stdout.write(JSON.stringify(out));
  process.exit(0);
}

function allow() {
  const out = {
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "allow"
    }
  };
  process.stdout.write(JSON.stringify(out));
  process.exit(0);
}

async function main() {
  const raw = await readStdin();
  if (!raw.trim()) return allow();

  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    return allow();
  }

  const cmd = pickCommand(input);
  if (!cmd) return allow();

  const commitMsg = commitMessageFromCommand(cmd);
  if (/\bgit\s+commit\b/i.test(cmd)) {
    if (!commitMsg) {
      return deny(
        "Commit blocked: include -m with format <type>(<scope>): <summary>."
      );
    }
    if (!isConventionalTitle(commitMsg)) {
      return deny(
        "Commit blocked: message must match <type>(<scope>): <summary> using allowed types feat|fix|refactor|docs|test|chore|build|ci."
      );
    }
  }

  const prTitle = prTitleFromCommand(cmd);
  const prBody = prBodyFromCommand(cmd);
  if (/\bgh\s+pr\s+create\b/i.test(cmd)) {
    if (!prTitle || !isConventionalTitle(prTitle)) {
      return deny(
        "PR blocked: --title must match <type>(<scope>): <summary> using allowed types feat|fix|refactor|docs|test|chore|build|ci."
      );
    }
    if (!prBody) {
      return deny(
        "PR blocked: add --body with a concise description containing What, Why, and Validation."
      );
    }
    const hasWhat = /(^|\n)##\s*What\b/i.test(prBody);
    const hasWhy = /(^|\n)##\s*Why\b/i.test(prBody);
    const hasValidation = /(^|\n)##\s*Validation\b/i.test(prBody);
    if (!(hasWhat && hasWhy && hasValidation)) {
      return deny(
        "PR blocked: body must include sections ## What, ## Why, and ## Validation."
      );
    }
  }

  return allow();
}

main().catch(() => allow());
