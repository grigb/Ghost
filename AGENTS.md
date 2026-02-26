---
description: GLOBAL AI Agent Infrastructure - centralized standards and tools that all AI agents reference directly. LEAN DESIGN: Keep this file <2,500 lines. New modes go in external files. See governance section for pattern.
author: Global AI Agent Rules System
created: 2025-09-18
updated: 2026-02-02T19:00:00
priority: critical
scope: universal
tags: [universal, master, platforms, templates, complete, multi-model, state-of-project, work-order-enforcement]
alwaysApply: true
graphrag_vaults:
  - .agents
  - agents-system
---

<!-- AGENTS.md v3.0 - IMMUTABLE GLOBAL COPY
     This file is identical across all projects.
     DO NOT add project-specific content here.
     Project rules go in PROJECT-RULES.md
     Canonical sha256 (excludes this header): f94b556b9f9b87b2bc2cf772e119d8c9a158328859bdf84709a93e47875158a3
-->

# COMPLETE AI AGENT RULES SYSTEM - GLOBAL INFRASTRUCTURE
# Universal Standards + Multi-Platform Integration + Centralized Configuration

## 🚨 CRITICAL: GLOBAL AGENTS SYSTEM (GAS)

**_GAS STANDS FOR GLOBAL AGENTS SYSTEM._**

**FALSE ASSUMPTION CHECK:** You **DO** have access to `~/.agents/` via shell commands. Do not assume otherwise.

**This is centralized infrastructure that ALL AI agents globally reference.** This file (`~/.agents/AGENTS.md`) is the master configuration for all AI development tools.

- **Global Reference**: All agents (Claude, GPT, Cursor, etc.) read from this central location
- **Universal Impact**: Changes here affect every project using AI development tools
- **Infrastructure**: This provides the standards and tools that power AI-assisted development globally

**Directory Separation:**

- **Main system** (`~/.agents/`): What agents use for their work
- **Development** (`.dev/`): Where agents work on improving the system (ignore for regular work)
- **Sibling projects** (`~/.agents-projects/`): External standards and project repos
- **Prompt library** (`~/.agents-gas-prompt-library/`): Public prompt library (gas-prompt-library.git) — symlinked from `~/.agents/prompts`

---

## ⚠️⚠️⚠️ CRITICAL WARNING TO ALL AI AGENTS ⚠️⚠️⚠️

**DO NOT MODIFY, SUMMARIZE, SIMPLIFY, OR "IMPROVE" THE LANGUAGE IN THIS FILE.**

This global configuration has been carefully crafted over months of refinement. Every word choice, every emphasis, every piece of strong language ("MANDATORY", "CRITICAL", "systematically underestimate") is **intentional and required**.

**When copying sections from this file to other rule files:**
- ✅ Copy EXACTLY as written - preserve all emphasis, warnings, and strong language
- ❌ DO NOT "water down" strong language into weak suggestions
- ❌ DO NOT summarize multi-line instructions into brief bullets
- ❌ DO NOT decide certain sections are "too verbose" and shorten them
- ❌ DO NOT make editorial changes to "improve readability"

**You are a copier, not an editor.** Preserve this file's language completely.

---

## 🚨 IMMEDIATE AI AGENT INSTRUCTIONS

**Full Documentation:** `~/.agents/docs/AGENT-ONBOARDING-CHECKLIST.md`

**User Request Priority (Overrides Onboarding):**
Do not start onboarding, tracking, or maintenance checks unless the user explicitly asks ("/init", "start onboarding", "run checks") or you ask to pause for onboarding and the user agrees. If the user says "read AGENTS.md and then do X", do X and defer onboarding unless requested.

**🎯 CRITICAL OUTPUT CONTROL:**
Only output the contents of `~/.agents/TOOLS-INDEX.md` when the user explicitly requests tools ("/tools", "list tools", or "/init").

**🚨 PATH REQUIREMENTS:**
- ALWAYS USE ABSOLUTE PATHS - every path must start with `/Users/` (or equivalent)
- EVERY message with an actionable outcome (built app, created file, fixed bug, running service) MUST end with absolute paths
- Users should NEVER have to ask "where is that?"

**🚨 OUTPUT FORMATTING:**
- NO MARKDOWN TABLES IN CLI OUTPUT (unreadable in terminals)
- Use "Header: value" on separate lines, or inline "Name → path (description)", or bullet lists
- BE CLEAR AND DECISIVE - think through your plan BEFORE responding, state it ONCE, then do it

**🚨 INTERACTION PREFERENCE:**
Never use the AskUserQuestion tool (error-prone). Ask questions directly in plain text responses.

**Onboarding Quick Reference (Execute When Explicitly Requested):**

1. **Version Check**: `~/.agents/scripts/check-rules-datetime.sh`
2. **Track Session**: `~/.agents/scripts/track-project.sh "[project]" "Session started" "description" "$TOOL"`
3. **Check STATE-OF-THE-PROJECT**: Look in `.dev/ai/` or `docs/` (create from template if missing)
4. **Review context**: Check `.dev/ai/{audits,findings,handoffs,changelogs,workorders,proposals}/` for recent history
5. **Read project docs** referenced in STATE-OF-THE-PROJECT

**Fast File Lookup:**
ALWAYS check `~/.agents/prompts/PROMPT-PATH-INDEX.md` FIRST before searching for prompt files.

**🚨 CODING RULES (MANDATORY FOR ALL CODE CHANGES):**
- **Index:** `~/.agents/docs/coding-rules/INDEX.md`
- **General Rules:** `~/.agents/docs/coding-rules/GENERAL-RULES.md`
- **CRITICAL Rule G1:** BEFORE adding any function/class/method, SEARCH for existing implementations with same or similar names. MODIFY existing code instead of creating duplicates.

---

## 🎭 AGENT ROLE ASSIGNMENT (CRITICAL)

**When a user assigns you a specific role, you MUST operate exclusively within that role's scope.**

### Detection

User assigns a role with phrases like:
- "you are the triage agent"
- "act as the dev agent"
- "you're the QA agent"
- "operate as [role] agent"

### Mandatory Response

**IMMEDIATELY when assigned a role:**

1. **Load the role prompt**: Read `~/.agents/prompts/agents/agent-[role].md`
2. **Announce role activation**: Output the role's greeting (from the prompt file)
3. **Operate ONLY within role scope**: Do NOT perform actions outside the role's defined responsibilities

### Role Behavior Override

**CRITICAL: Role assignment OVERRIDES default agent behavior.**

| Role | Primary Action | FORBIDDEN Actions |
|------|----------------|-------------------|
| triage | Create work orders in `.dev/ai/workorders/` | Implementing code, direct fixes |
| dev | Implement from work orders | Creating new work orders (unless blocking) |
| qa | Verify implementations, run tests | Implementing features |
| commit | Execute Smart Commit Mode | Creating work orders, implementing features |

**Details:** Read the role prompt (`~/.agents/prompts/agents/agent-[role].md`). Full role list: `~/.agents/prompts/agents/_AGENT-INDEX.md`.

---

## GLOBAL TRIGGERS (Self-Activation Protocol)

**Full Documentation:** `~/.agents/prompts/TRIGGER-INDEX.md`

**Purpose:** Short-form trigger phrases that allow agents to self-activate roles without verbose context-setting.

### Primary Triggers

| Trigger | Target | Description |
|---------|--------|-------------|
| `dev`, `dev tool`, `dev agent` | `agent-dev-worker.md` | Implementation agent |
| `triage`, `triage agent` | `agent-triage.md` | Work order capture |
| `qa`, `qa agent` | `agent-qa-full-review.md` | Quality assurance |
| `orchestrator`, `orchestrate`, `coordinate`, `orchestration`, `launch orchestrator` | `agent-orchestrator.md` | **Conductor, not musician.** Delegates to workers, NEVER executes. One approval → runs to completion. |
| `manager orchestrator`, `coordinate projects`, `portfolio` | `agent-manager-orchestrator.md` | **VP, not engineer.** Coordinates orchestrators, not workers. Multi-project scope. |
| `assistant`, `be my assistant` | `agent-assistant.md` | **L1 Hierarchy.** User-facing daemon. Delegates everything, never implements. |
| `blueprint keeper`, `check vision`, `vision alignment` | `agent-blueprint-keeper.md` | **L2 Hierarchy.** Strategic vision guardian. Cascades vision changes. |
| `request router`, `route request`, `evaluate request` | `agent-request-router.md` | **L3 Hierarchy.** Blueprint-aware gatekeeper. Creates WOs from validated requests. |
| `gas manager`, `gas team`, `gas teams`, `launch gas team`, `launch gas teams`, `execute work orders`, `run gas loop` | `agent-gas-manager.md` | **L4 Hierarchy.** Autonomous WO execution engine. Spawns workers, monitors completion. |
| `trio`, `activate trio` | All three agents | Multi-agent coordination |
| `commit agent`, `smart commit` | `SMART-COMMIT-MODE.md` | Intelligent commits |

### Self-Activation Protocol

**When trigger detected in first message:**

1. **Read** target prompt file immediately
2. **Announce** role activation with greeting
3. **Operate** exclusively within role scope
4. **Forbid** actions outside role boundaries

### Priority Rules

- **Explicit > Implicit**: "you are the dev agent" beats "use dev"
- **First Match Wins**: Process triggers left-to-right
- **Trio Overrides Singles**: "activate trio" supersedes individual triggers

### Trio Workflow

```
User Input -> Triage (capture) -> Dev (implement) -> QA (verify) -> Complete
```

**When to read full guide:** Adding new triggers, understanding regex patterns, troubleshooting activation.

---

## ADDING NEW MODES, TRIGGERS, AND TOOLS (MANDATORY LEAN PATTERN)

**Full Documentation:** `~/.agents/docs/MODULAR-ARCHITECTURE-GOVERNANCE.md`

**CRITICAL**: All additions to AGENTS.md must follow governance rules to prevent configuration bloat.

---

### Quick Reference: The Iron Law

**Hard Limits:**
- MAX 2,500 lines for AGENTS.md (~13,000 tokens)
- MAX 50 lines per mode (target: 30 lines)
- ALL new modes start in external files

**Mandatory Extraction Triggers:**
1. Mode exceeds 50 lines
2. Rarely used (not every session)
3. Specialized/context-specific
4. Contains extensive examples
5. Complex multi-step workflow

**File Structure:**
- `prompts/` - Creation modes (CREATE-*, GENERATE-*)
- `modes/` - Execution modes (REVIEW-*, ANALYZE-*)
- External files: NO line limits

**Validation Checklist:**
- [ ] Size >50 lines? → Extract
- [ ] Used every session? If no → Extract
- [ ] Complex workflow? → Extract
- [ ] Push over 2,500 lines? → Extract

**Rule:** When in doubt, externalize.

---

### Read Full Guide When:
- Adding new modes/triggers
- Validating architecture compliance
- Understanding token economics

---

## 🗺️ SYSTEM OVERVIEWS (ARCHITECTURE & CONTEXT)

**Core documentation for major automation systems, focusing on architecture and context management strategies.**

### When to Suggest These Systems (PROACTIVE)

**Agents SHOULD proactively suggest these tools when detecting matching scenarios:**

| Detect This | Suggest This | Why |
|-------------|--------------|-----|
| User says "iterate", "autonomous", "keep going" | **Ralph Loop** | Fresh context each step avoids degradation |
| Task needs repeated test/fix cycles | **Ralph Loop** | Loops until tests pass |
| Task has 3+ subtasks, dependencies, multi-file | **Beads** | Graph tracks progress, unlocks dependents |
| 10+ parallel operations, "review all X" | **Gastown** | Scales to 30+ concurrent agents |
| User asks to "work on this until done" | **Ralph Loop** | Autonomous until completion promise |
| Complex refactor spanning many files | **Beads + Ralph** | Graph for structure, loop for execution |
| Task needs agents to discuss, debate, or challenge findings | **Agent Teams** | Lateral communication between agents, not just report-back |
| Cross-layer work (frontend + backend + tests) each needing coordination | **Agent Teams** | Each teammate owns a layer, they message when interfaces change |
| Research from multiple competing angles | **Agent Teams** | Agents actively disprove each other's theories |
| User has accumulated research docs, prior planning, or competitive analysis | **Knowledge-to-Build (K2B)** | 7-stage pipeline mines every gem from research into applied specs |
| User says "don't build from scratch", "OSS first", "search for existing" | **Knowledge-to-Build (K2B OSS Protocol)** | Systematic adopt-vs-build evaluation before writing custom code |
| Project needs to turn knowledge into feature list, tech stack, or architecture | **Knowledge-to-Build (K2B)** | Structured extraction prevents agents from ignoring research wealth |
| Agent declares project "done", all WOs closed, user wants verification | **Project Completion Audit** | Two-Parity checks catch drift between vision, specs, and implementation |
| User suspects what was built doesn't match what was specified | **Project Completion Audit** | Parity Check 2 classifies every promise as MATCH/DRIFT/MISSING/ORPHANED |
| Before a release, handoff, or milestone gate | **Project Completion Audit** | Systematic quality gates beyond "tests pass" |

**Suggestion Pattern:** I notice this task [has X characteristics]. Consider using [System] which handles this by [key benefit]. Shall I set it up?

### Available Overviews

- **Ralph Wiggum (Iterative Loop)**: `~/.agents/docs/overviews/RALPH-LOOP-OVERVIEW.md`
- **Beads (Task Graph)**: `~/.agents/docs/overviews/BEADS-OVERVIEW.md`
- **Gastown (Multi-Agent)**: `~/.agents/docs/overviews/GASTOWN-OVERVIEW.md`
- **Agent Teams (Multi-Agent Coordination)**: `~/.agents/docs/overviews/AGENT-TEAMS-OVERVIEW.md`
- **GAS Hierarchy (5-Layer Autonomous Agent Hierarchy)**: `~/.agents/docs/overviews/GAS-HIERARCHY-OVERVIEW.md`

### Available Guides

- **Programmatic Agent Teams**: `~/.agents/docs/guides/PROGRAMMATIC-AGENT-TEAMS.md`

## 🧩 MULTI-AGENT ENABLEMENT BY MODEL (SETTINGS REFERENCE)

**Full Guide:** `~/.agents/docs/guides/MULTI-AGENT-ENABLEMENT-BY-MODEL.md`

**Purpose:** Central reference for enabling multi-agent and agent-team capabilities across model runtimes using file settings (not TUI toggles).

**Current baseline:**
- **Codex runtime:** Multi-agent requires `~/.codex/config.toml` with `[features] multi_agent = true`. Native Agent Teams are not available yet; use GAS file-based team coordination (`subtask-comms/`, work orders, and shared state files) until native teams land.
- **Claude Code 4.6+:** Multi-agent is baseline behavior. Agent Teams require file setting `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` under `env` in Claude settings JSON.
- **Tracking/dashboard integration:** Team and multi-agent events are routed through `~/.agents/hooks-integration/dispatcher.sh` and persisted for dashboards/monitoring. Keep hooks enabled in settings so agent-team events are captured.

### Available Methodologies

- **Knowledge-to-Build (K2B) Method**: `~/.agents/docs/methodologies/knowledge-to-build-method.md`
- **IA Synthesis (Domain-Specific)**: `~/.agents/docs/methodologies/ia-synthesis-methodology.md` — Specializes Knowledge-to-Build (K2B) for Information Architecture outputs.
- **Project Completion Methodology**: `~/.agents/docs/methodologies/project-completion-methodology.md` -- Verifies projects are genuinely complete via the Two-Parity Principle (Human Vision to Blueprint, Blueprint to Implementation). Entry point prompt: `~/.agents/prompts/general/PROJECT-COMPLETION-AUDIT.md`.
- **Teaching Manual Pipeline**: `~/.agents/docs/methodologies/teaching-manual-pipeline.md` -- 8-phase pipeline for producing public-facing teaching manuals from internal knowledge, with parallel agent execution and writing style brief as quality contract. Templates: `~/.agents/templates/teaching-manual/`.
- **Legacy Alias (Backwards Compatibility)**: `~/.agents/docs/methodologies/research-to-applied-design-methodology.md`

### Creating New Systems

- Use the mandatory template: `~/.agents/templates/SYSTEM-OVERVIEW-TEMPLATE.md`
- All new systems MUST document their **Context Management Strategy** (Section 3 of template).

---

## 🏛️ GAS AUTONOMOUS AGENT HIERARCHY (5-Layer System)

**Full Documentation:** `~/.agents/docs/overviews/GAS-HIERARCHY-OVERVIEW.md`
**Proposal:** `~/.agents/.dev/ai/proposals/PROPOSAL-gas-autonomous-agent-hierarchy.md`

**Purpose:** Takes projects from vision to completion with minimal human involvement. The human interacts through a single assistant (L1) while specialized layers handle strategy, intake, execution, and implementation beneath it.

**Core Principle:** No layer depends on another layer's context window. All state lives in files. Every layer starts fresh and reads state from disk.

```
Human <-> L1 Assistant <-> L2 Blueprint Keeper
                              |
                          L3 Request Router
                              |
                          L4 GAS Manager -> L5 Workers
```

| Layer | Agent | Role | Writes To |
|-------|-------|------|-----------|
| L1 | `agent-assistant.md` | User-facing daemon, delegates everything | `assistant-brief.md` |
| L2 | `agent-blueprint-keeper.md` | Vision guardian, alignment, cascade | `blueprint-status.md` |
| L3 | `agent-request-router.md` | Evaluates requests, creates WOs | `router-log.md`, `INDEX.yaml` |
| L4 | `agent-gas-manager.md` | Picks WOs, spawns workers, monitors | `pm-status.md` |
| L5 | `agent-dev-worker.md` (or teams) | Implements WOs | `workers/{wo-id}-*.md` |

**Status flows UP** (L5->L4->L2->L1) via files. **Commands flow DOWN** (L1->L3->L4->L5) via invocation.

**Key Protocols:**
- Inter-layer status: `~/.agents/docs/protocols/inter-layer-status.md`
- Notifications: `~/.agents/docs/protocols/notification-protocol.md`
- Loop script: `~/.agents/scripts/gas-manager-loop.sh`

**Status files location:** `{project}/.dev/ai/status/` (see inter-layer-status.md for schemas)

---

## ✅ VERIFICATION PROTOCOLS (MANDATORY)

**Full Documentation:** `~/.agents/docs/VERIFICATION-PROTOCOLS.md`

### The "Trust But Verify" Iron Law
**Agents must NEVER assume a complex component works based on code inspection alone.**

### Four-Level Verification Standard

For any multi-component system (Providers, LLMs, APIs), define explicit verification:
- **L1 (Infra)**: Is it running?
- **L2 (API)**: Does it respond to isolated requests?
- **L3 (Integration)**: Does it work in the full system?
- **L4 (Quality)**: Is the output actually useful? (Forbid mock/empty data)

**Rule:** Create executable verification scripts. If you can't run a script to prove it works, it doesn't work.

### Web Development Verification (MANDATORY)

**THE IRON LAW:** Before asking a user to test ANY web change, YOU MUST VERIFY IT WORKS FIRST using Chrome DevTools MCP.

**MANDATORY CHECKLIST:**
1. Verify server running: `lsof -i :[PORT] | grep LISTEN`
2. Navigate and verify page loads with Chrome DevTools
3. Take screenshot and confirm your change is visible
4. Check console for errors related to your change

**ONLY AFTER ALL 4 CHECKS PASS** may you tell the user to test.

**FORBIDDEN:** "Please test this" without having loaded the page yourself
**REQUIRED:** "I've verified this works - you can see it at [URL]"

**Full checklist with examples:** `~/.agents/docs/VERIFICATION-PROTOCOLS.md`

---


## 🤖 SUB-AGENT ORCHESTRATION RULES (MANDATORY)

**Full Documentation:** `~/.agents/docs/SUB-AGENT-ORCHESTRATION-GUIDE.md`

**Core Principle (Token Economics):**
`delegate when tokens_to_do_work > tokens_to_instruct + tokens_to_read_output`

**Default to delegation** for: multi-file work, research/exploration, discovery, or 2+ tool calls / >1000 tokens.

**Work inline only** for: trivial single-file edits already in context, or destructive operations the user must observe.

**Forbidden:**
- **NEVER poll TaskOutput** (agents are notified automatically)
- **NEVER use Haiku** for subtasks (unreliable, banned)
- **NEVER react to individual completions** in parallel batches

**Model Selection (read before every delegation):**
- **Opus**: Planning, orchestration, reviews, decisions, ambiguous work, documentation.
- **Sonnet**: Leaf-node execution when ALL five met: tight spec, mechanical verification, low stakes, short horizon, no steering. ~40% cheaper — use it for well-defined work.
- **Haiku**: FORBIDDEN.
- Sonnet-safe examples: implement function with spec+tests, single-file refactor, data transforms, well-defined code migrations.
- Escalate Sonnet→Opus on iteration #2 or if uncertainty appears.
- Canonical rubric (MUST READ for first-time delegators): `~/.agents-gas-prompt-library/workflows/opus_vs_sonnet_decision_guide_token_efficient.md`

**Required:**
- Always `run_in_background=true`
- Always write to `.dev/ai/subtask-comms/`
- Always verify before marking complete

**Outputs:** Use `~/.agents/templates/SUBTASK-OUTPUT-TEMPLATE.md`; return file paths only.

---

## 🚨 WORK ORDER ENFORCEMENT (MANDATORY)

**Full Documentation:** `~/.agents/docs/WORK-ORDER-DECISION-FRAMEWORK.md`

### 🚨 CRITICAL: The 30-Minute Rule

**If estimated time >30 minutes → WORK ORDER REQUIRED (no exceptions)**

### Quick Decision Matrix

| Condition | Action |
|-----------|--------|
| 1 message, <15 min | Direct execution |
| 2-3 messages, <30 min | TodoWrite + execute |
| **3+ messages OR 5+ tasks OR 30+ min** | **CREATE WORK ORDER** |
| **5+ tasks AND multi-week** | **CREATE PROPOSAL FIRST** |

### Enforcement Protocol

**When threshold met:** STOP → Inform user → Create WO → **Execute immediately** (unless interrupted)

**Interrupt signals:** "stop", "wait", "don't start yet"
**Skip WO entirely:** "skip work order and proceed"

### Integration

- IDs: `WO-{project}-{timestamp}-{seq}` | Index: `.dev/ai/workorders/WO-INDEX.md`
- Status: NOT_STARTED | IN_PROGRESS | BLOCKED | COMPLETED

---

## 🕵️ DISCOVERY FINDINGS PROTOCOL (MANDATORY)

**Full Documentation:** `~/.agents/docs/DISCOVERY-FINDINGS-GUIDE.md`

**Location:** `.dev/ai/findings/` | **Index:** `.dev/ai/findings/FINDINGS_INDEX.md`

**When to use:** Holistic observations needing design thought before becoming tasks. NOT for obvious bugs (use Work Orders).

**Quick Protocol:**

1. **Check Index** - Prevent duplicates (check ARCHIVED/REJECTED too)
2. **Create Finding** - `.dev/ai/findings/FIND-{ID}-{Description}.md`
3. **Log in Index** - Update FINDINGS_INDEX.md
4. **Triage:**
   - ACCEPTED → Create Work Order (action) or ADR (design)
   - REJECTED → Document reason
   - ARCHIVED → Stale/outdated

**Vision Check:** Every finding MUST be evaluated against VISION.md before triage.

---

## 📋 CONVERSATION BACKLOG SYSTEM

**Full Documentation:** `~/.agents/docs/CONVERSATION-BACKLOG-SYSTEM.md`
**User Guide:** `~/.agents/docs/CONVERSATION-BACKLOG-GUIDE.md`

**Purpose:** Protect active work from interruption by capturing new user requests to backlog files. Creates audit trail for cross-project analysis.

**Trigger Phrases:** "add to backlog", "backlog this", "remember for later", "save this idea", "queue this", "review backlog", "check backlog"

**Quick Reference:**
- Activates when: TodoWrite has IN_PROGRESS tasks + user sends new request + no interrupt signals
- Interrupt signals (bypass backlog): "stop", "cancel", "instead", "urgent", "now", "first"
- Backlog signals (queue): "also", "after", "when you're done", "do later"
- File location: `.dev/ai/backlog/YYYY-MM-DD-HH-MM-SS-task-name.md`
- After review: Move to `.dev/ai/backlog/reviewed/`

**Key Workflow:**
1. User sends request during active work -> Create backlog file, continue working
2. Current task completes -> Notify user of UNREVIEWED items, ask to review
3. User approves -> Process FIFO, update files, move to reviewed/

**Integration:** Works WITH TodoWrite, ALONGSIDE INBOX/Deferred, WITHIN Work Orders

**When to Read Full Docs:** First-time usage, understanding detection logic, file format details, edge cases, cross-project audit setup

---

## 📊 PROJECT ACCOMPLISHMENTS SYSTEM INTEGRATION

**Full Documentation:** `~/.agents/docs/PROJECT-ACCOMPLISHMENTS-GUIDE.md`

**Essential Commands:**
```bash
~/.agents/scripts/create-accomplishment.sh "Title" "Type" "WO-ID" "Agent"
~/.agents/scripts/validate-accomplishments.sh
```

**Mandatory Triggers:**
- Work Order Completion (when WO status → COMPLETED)
- Multiple Task Completion (3+ related tasks in single session)
- Feature Implementation (complete feature delivered and tested)
- Significant Refactoring (major code restructuring completed)
- Documentation Milestones (comprehensive docs completed)
- Testing Milestones (major testing phases completed)

**Valid Types:** Feature Implementation, Bug Fix, Documentation, Testing, Refactoring

**Location:** `.dev/ai/accomplishments/` (timestamped files with index)

**When to Read Full Guide:**
- First-time accomplishment creation
- Understanding mandatory triggers and quality gates
- Learning validation and indexing procedures
- Understanding integration with work orders, changelogs, and audits

---

## 🧠 SHARED MEMORY SYSTEM INTEGRATION

**Full Documentation:** `~/.agents/docs/SHARED-MEMORY-INTEGRATION.md`

**Essential Commands:**
```bash
memory save "content" --type [working|context|knowledge]
memory search "keywords"
memory recent --hours 24
```

**Auto-Save Logic:** See documentation for decision framework (decisions with rationale, solutions, patterns, preferences auto-save; routine confirmations and sensitive data auto-skip/redact).

**When to Read Full Guide:**
- First-time memory system usage
- Understanding auto-save decision logic
- Learning search optimization or troubleshooting

---

## 🚀 AGENT ONBOARDING PROCESS (EXPLICIT REQUEST ONLY)

**Full Checklist:** `~/.agents/docs/AGENT-ONBOARDING-CHECKLIST.md`

**Run only when explicitly requested** ("/init", "start onboarding") or user agrees to pause for onboarding.

### Onboarding Steps (Execute in Order)

| Step | Action | Key File/Command |
|------|--------|------------------|
| 0 | Emergency handoff check | `ls ~/.agents/.dev/emergency-handover/*.trigger` |
| 0.5 | AGENTS.md freshness | `~/.agents/scripts/check-agents-freshness.sh "$(pwd)"` |
| 1 | Check rule updates | `~/.agents/scripts/check-rules-datetime.sh` |
| 2 | **TRACK SESSION** (mandatory) | `~/.agents/scripts/track-project.sh "[project]" "Session started" "desc" "$TOOL"` |
| 3 | Find STATE-OF-THE-PROJECT | `.dev/ai/` or `docs/` (create from template if missing) |
| 4 | Verify freshness | Update if >14 days old |
| 5 | Read project docs | Files referenced in STATE-OF-THE-PROJECT |
| 6 | Work order enforcement | Auto-create WO if 3+ messages, 5+ tasks, or 30+ min |
| 7 | Proceed with work | Track major decisions as you go |

### Key Paths

- **Session tracking:** `~/.agents/scripts/track-project.sh`
- **STATE template:** `~/.agents/templates/STATE-OF-THE-PROJECT-TEMPLATE.md`
- **Work order framework:** `~/.agents/docs/WORK-ORDER-DECISION-FRAMEWORK.md`
- **INBOX captures:** `~/INBOX/{todos,links,ideas}.md`

### When to Read Full Checklist

- First session in any project
- Need staleness check scripts
- Creating STATE-OF-THE-PROJECT for first time
- Understanding emergency handoff protocol

**⛔ Onboarding is invalid without Step 2 tracking ⛔**

---

## 📊 PROJECT TRACKING SYSTEM (MANDATORY)

**Full Documentation:** `~/.agents/docs/PROJECT-TRACKING-GUIDE.md`
**Quick Reference:** `~/.agents/docs/TRACKING-QUICK-REFERENCE.md`

**Essential Commands:**
```bash
~/.agents/scripts/track-project.sh "[project-name]" "Session started" "description" "$TOOL_NAME"
~/.agents/scripts/track-project.sh --status [project-name]
```

**Enhanced Tracking (Recommended):**
```bash
SESSION_ID=$(uuidgen | tr '[:upper:]' '[:lower:]')
~/.agents/scripts/track-project.sh \
  --session-id "$SESSION_ID" \
  --work-order "WO-project-YYYY-MM-DD-NNN" \
  --files "file1.js,file2.js" \
  --proposal "path/to/proposal.md" \
  "[project-name]" "Session started" "description" "$TOOL_NAME"
```

**Core Rules:** Track session start/end, major decisions, and significant work. Use PROJECT-ID.md for project identification. Enhanced tracking supports session IDs, work order linking, file tracking, and proposal references. See docs for full setup, query tools, and SQLite migration.

**When to Read Full Guide:** First setup, migrations, learning queries, troubleshooting.
**When to Use Quick Reference:** Command syntax, common queries, troubleshooting checks.

---

## INBOX REVIEW MODE

**Trigger phrases:** "review inbox", "check inbox", "process inbox", "inbox review"
**External File:** `~/.agents/modes/INBOX-REVIEW-MODE.md`

**Purpose:** Context-aware inbox processing with categorization and progressive recording.

---
## DEFERRED REVIEW MODE

**Trigger phrases:** "review deferred", "check deferred", "deferred review"
**External File:** `~/.agents/modes/DEFERRED-REVIEW-MODE.md`

**Purpose:** Review deferred work items that have reached their review date.

---
## SMART COMMIT MODE

**Trigger phrases:** "go", "smart commit", "group commits", "commit files", "analyze commits"
**External File:** `~/.agents/modes/SMART-COMMIT-MODE.md`

**Purpose:** Intelligent file grouping + commit automation with security scan and scannable commit messages.

---
## SPRINT MODE

**Trigger phrases:** "create sprint", "sprint mode", "new sprint", "start sprint", "list sprints"
**External File:** `~/.agents/modes/SPRINT-MODE.md`

**Purpose:** Create and manage focused work containers for intensive work periods.

---
## 🧹 TERMINAL OUTPUT CLEANING REQUIREMENTS (MANDATORY)

**Full Documentation:** `~/.agents/docs/TERMINAL-OUTPUT-STANDARDS.md`

**Quick Reference:**

- ✅ Use `printf` instead of `echo` for all formatted output
- ✅ Sanitize all user-facing messages to remove problematic characters
- ✅ Always strip ANSI codes and control characters from command output
- ✅ Never use emoji or special unicode in status messages

**Enforcement**: Applies to all modes, especially Smart Commit Mode for report generation and output display.

**When to read full guide:**
- Implementing output in new modes
- Debugging terminal corruption or display issues
- Learning safe printf patterns for shell scripts
- Understanding ANSI code handling and sanitization

---
## SNAPSHOT AND RESTORE MODE

**Trigger phrases:** "snapshot session", "recovery index", "resume session", "context limit", "system restart", "snapshot and restore"
**External File:** `~/.agents/modes/SNAPSHOT-AND-RESTORE.md`

**Purpose:** Preserve and restore agent session state (snapshots + recovery indexes).

---
## AGENTS.MD SYNC MODE

**Trigger phrases:** "sync rules", "sync agents", "sync agents.md", "update rules", "update agents.md", "update the agents.md", "sync from global", "merge global rules", "update project agents", "update agents.md from global", "adopt split rules", "adopt split"
**External File:** `~/.agents/modes/AGENTS-SYNC-MODE.md`

**Purpose:** Sync project `AGENTS.md` with the immutable global copy (file copy, no merge), or run one-step split adoption (migrate + validate + sync).

---
## AGENTS SYSTEM ATTACH/DETACH MODE

**Trigger phrases:** "attach agents", "attach agents system", "detach agents", "detach agents system"
**External File:** `~/.agents/modes/ATTACH-DETACH-MODE.md`

**Purpose:** Attach/detach a local `.agents/` copy for environments without access to global `~/.agents/`.

---
## DISCUSSION MODE

**Trigger phrases:** "discussion mode", "discuss this", "let's discuss", "need to discuss", "think through", "think this through", "plan this out", "planning mode", "theoretical mode", "weigh alternatives", "consider options", "no changes", "let me know what you think"
**External File:** `~/.agents/prompts/modes/DISCUSSION-MODE.md`

**Purpose:** Read-only analysis mode (no file modifications, no code, no execution).

---
## PROJECT DOCUMENTATION MODE

**Trigger phrases:** "document project", "create docs", "validate docs", "documentation audit", "gap tracker", "readme as entry point"
**External File:** `~/.agents/skills/project-documentation/methodology.md`

**Purpose:** Systematic project docs creation and validation (skill-driven).

---
## RECOVERY MODE

**Trigger phrases:** "do recovery", "run recovery", "project recovery", "sync state"
**External File:** `~/.agents/modes/RECOVERY-MODE.md`

**Purpose:** Reconstruct project state from repo history and agent logs.

---
## DOCUMENT ORGANIZATION MODE

**Trigger phrases:** "organize documents", "organize ai files", "reorganize documents"
**External File:** `~/.agents/modes/DOCUMENT-ORGANIZATION-MODE.md`

**Purpose:** Reorganize AI documents into proper `.dev/ai/` structure.

---
## ORCHESTRATION MODE

**Trigger phrases:** "orchestrator", "orchestrate tasks", "execute plan", "run orchestration", "coordinate project", "launch orchestrator"
**External File:** `~/.agents/prompts/agents/agent-orchestrator.md`

**Purpose:** Autonomous multi-agent coordination ("Conductor, not musician."; delegates to workers, never executes directly).

---
## MANAGER ORCHESTRATION MODE

**Trigger phrases:** "manager orchestrator", "coordinate projects", "portfolio orchestration", "manage orchestrators"
**External File:** `~/.agents/prompts/agents/agent-manager-orchestrator.md`

**Purpose:** Coordinates OTHER orchestrators (multi-project). "VP, not engineer."

---
## YOUTUBE TRANSCRIPT MODE

**Trigger phrases:** "transcript", "get transcript", "youtube transcript", "extract captions"
**External File:** `~/.agents/modes/YOUTUBE-TRANSCRIPT-MODE.md`

**Purpose:** Extract clean, non-repetitive transcripts from YouTube videos.

---
## DEEP RESEARCH MODE

**Trigger phrases:** "deep research", "research mode", "comprehensive research", "academic research"
**External File:** `~/.agents/modes/DEEP-RESEARCH-MODE.md`

**Purpose:** Multi-source research with citation tracking and synthesis.

---
## KNOWLEDGE-TO-BUILD MODE

**Trigger phrases:** "knowledge to build", "knowledge to build system", "k2b", "research to build", "apply research to project", "run k2b", "knowledge to specs"
**External File:** `~/.agents/modes/KNOWLEDGE-TO-BUILD-MODE.md`

**Purpose:** Transform accumulated research and planning docs into build-ready specifications, validation outputs, and work orders.
**Autopilot:** Bootstrap/reconcile -> provenance audit -> repair if needed -> strict validate -> resume first unblocked critical-path WO in same run.

---
## RESEARCH LIBRARIAN MODE

**Trigger phrases:** "organize research", "research librarian", "sort research directory", "categorize research", "organize research files"
**External File:** `~/.agents/modes/RESEARCH-LIBRARIAN-MODE.md`

**Purpose:** Organize research directories using state-based principles.

---
## VAULT ADVANCED MODE

**Trigger phrases:** "query vault", "search knowledge", "vault query advanced", "ask vault"
**External File:** `~/.agents/modes/VAULT-ADVANCED-MODE.md`

**Purpose:** Advanced vault queries with explicit vault selection and power-user options.

---
## QMD MODE (Local Search)

**Trigger phrases:** "qmd", "qmd search", "qmd [query]", "quick search", "local search"
**External File:** `~/.agents/modes/QMD-MODE.md`

**Purpose:** Fast, fully local markdown search with zero API dependencies.

---
## FEATURE REQUEST CREATION MODE

**Trigger phrases:** "create feature request", "create fr", "new feature request", "generate feature request"
**External File:** `~/.agents/prompts/creation/CREATE-FEATURE-REQUEST.md`

**Purpose:** Capture complex needs and requirements that aren’t ready for implementation yet.

---
## PROPOSAL GENERATION MODE

**Trigger phrases:** "create proposal", "generate proposal", "create work proposal", "new proposal"
**External File:** `~/.agents/prompts/creation/CREATE-WORK-PROPOSAL.md`
**Template:** `~/.agents/templates/PROPOSAL-TEMPLATE.md`

**Purpose:** Generate comprehensive work proposals for complex initiatives requiring analysis and phased execution.

---
## WORK ORDER CREATION MODE

**Trigger phrases:** "create work order", "create wo", "new work order", "generate work order"
**External File:** `~/.agents/prompts/work-orders/CREATE-WORK-ORDER.md`

**Purpose:** Create self-contained, executable work orders with complete context for zero-context execution.

---
## WORK ORDER EXECUTION MODE

**Trigger phrases:** "execute work order [file]", "execute wo [file]", "run work order [file]", "work on [wo-id]"
**External File:** `~/.agents/prompts/work-orders/EXECUTE-WORK-ORDER.md`

**Purpose:** Execute existing work order with progress tracking, file operation logging, and recovery support.

---
## ARTIFACT ECOSYSTEM

**Full Documentation:** `~/.agents/docs/ARTIFACT-ECOSYSTEM.md`
**Related:** `~/.agents/docs/ARTIFACT-TYPES.md`

**Purpose:** Understand how Issues/Proposals/Blueprints/Work Orders/Tasks relate.

---
## PORT MODE (PROACTIVE - READ THIS)

**Trigger phrases:** "check port", "register port", "port registry", "port conflict", "suggest port", "port mode"
**External File:** `~/.agents/modes/PORT-MODE.md`

**Purpose:** Prevent port conflicts (always check port availability before starting any dev server).

---
## WORKTREE MODE

**Trigger phrases:** "use worktree", "work in isolation", "create worktree", "isolated development", "don't disturb current", "separate workspace"
**External File:** `~/.agents/modes/WORKTREE-MODE.md`

**Purpose:** Create isolated git worktrees so the current dev server stays undisturbed.

---
## DESIGN CRITIQUE MODE

**Trigger phrases:** "critique design", "review design", "analyze design", "check design", "design feedback", "/critique-design"
**External File:** `~/.agents/tools/design_critique/AGENT-GUIDE.md`
**Slash Command:** `/critique-design <url>`

**Purpose:** Design analysis of web interfaces using research-backed frameworks.

---
## CLAUDE SETTINGS UPDATE MODE

**Trigger phrases:** "update claude settings", "sync claude settings", "update claude settings file", "update claude rules", "update claude permissions", "restore claude settings"
**External File:** `~/.agents/modes/CLAUDE-SETTINGS-MODE.md`

**Purpose:** Synchronize project Claude settings with enhanced defaults (backup + restore).

---
## DIGITAL TWIN MODE

**Trigger phrases:** "digital twin", "create digital twin", "run digital twin process", "digital twin methodology", "prototype with digital twin"
**External File:** `~/.agents/modes/DIGITAL-TWIN-MODE.md`

**Purpose:** Digital Twin methodology for high-fidelity prototyping before development.

---
## BLUEPRINT MODE

**Trigger phrases:** "create blueprint", "define what done means", "lock specification", "blueprint this feature", "spec to blueprint", "change blueprint", "update specification", "modify requirements", "pivot feature"
**External File:** `~/.agents/modes/BLUEPRINT-MODE.md`
**Purpose:** Create and manage locked specifications that define exactly what "done" means (Blueprint + Change Orders).

---
## PROJECT COMPLETION AUDIT MODE

**Trigger phrases:** "completion audit", "are we really done", "project completion audit", "finish everything", "verify completion", "done-done check"
**External File:** `~/.agents/prompts/general/PROJECT-COMPLETION-AUDIT.md`
**Methodology:** `~/.agents/docs/methodologies/project-completion-methodology.md`

**Purpose:** Verify projects are genuinely complete via the Two-Parity Principle:
1. **Parity Check 1 (Vision to Blueprint):** Does the spec still match what the human wants?
2. **Parity Check 2 (Blueprint to Implementation):** Does the build match the spec?

**Two modes:** (A) Focused Parity Audit -- scoped check, 30-90 min. (B) Comprehensive Completion Audit -- full project, 2-8 hours.
**Verdict:** SHIP IT / CONDITIONAL SHIP / NOT READY.
**Integrates with:** Blueprint Mode (Change Orders for drift), Work Orders (gaps become WOs), GAS Hierarchy (L3 triggers, L4 executes).

---
## 🚨 PROJECT INITIALIZATION RULES (/init command)

**Full Documentation:** `~/.agents/docs/PROJECT-INIT-GUIDE.md`

**Core Commands:**
```bash
cp ~/.agents/templates/INIT-CLAUDE-TEMPLATE.md ./CLAUDE.md
cp ~/.agents/AGENTS.md ./AGENTS.md
cp ~/.agents/templates/PROJECT-RULES-TEMPLATE.md ./PROJECT-RULES.md
mkdir -p .cursor/rules
cp ~/.agents/templates/INIT-CURSOR-TEMPLATE.mdc .cursor/rules/default-rules.mdc
mkdir -p .dev/ai .dev/scripts .dev/temp .dev/notes
mkdir -p .dev/blueprints/{architecture,data,features,flows,logic,ui}
mkdir -p .dev/change-orders/archive
wc -l CLAUDE.md AGENTS.md PROJECT-RULES.md .cursor/rules/default-rules.mdc
```

**MANDATORY**: Keep project `AGENTS.md` identical to the global copy. Put project config in `PROJECT-RULES.md`.

**FORBIDDEN**: Don't write minimal AGENTS.md, don't put config in CLAUDE.md or default-rules.mdc, don't skip creating .cursor/rules/default-rules.mdc, don't skip validation.

**When to Read Full Guide:** Validation failures, placeholder details, troubleshooting.

---

## 🔧 PLATFORM INTEGRATION

**Full Documentation:** `~/.agents/docs/PLATFORM-INTEGRATION-GUIDE.md`

**Quick Reference:**

**Supported Platforms:**
- **Claude**: `AGENTS.md` in project root (NEVER CLAUDE.md)
- **Cursor IDE**: `.cursor/rules/default-rules.mdc` (MANDATORY redirect file, created via /init)
- **GitHub Copilot**: `.github/copilot-instructions.md`
- **Windsurf**: `.windsurfrules` in project root
- **Continue**: `.continue/config.json`
- **ChatGPT**: `GPT_INSTRUCTIONS.md` in project root
- **Gemini**: `GEMINI_RULES.md` in project root

**When to read full guide:**
- Setting up platform-specific integration
- Viewing detailed configuration examples
- Understanding platform file structures

---

## 🔌 MCP SERVER USAGE RULES

**Full Documentation:** `~/.agents/docs/MCP-USAGE-GUIDE.md`

**Quick Reference:**

**FORBIDDEN - NEVER DO THIS**:
- ❌ `npx playwright` commands (CLI invocation)
- ❌ Direct Chrome DevTools Protocol connections
- ❌ Using CSS selectors with Chrome DevTools (use UIDs from snapshots)

**REQUIRED - ALWAYS DO THIS**:
- ✅ Use ONLY `mcp__playwright__*` or `mcp__chrome_devtools__*` tools
- ✅ Call `take_snapshot()` FIRST before Chrome DevTools interaction
- ✅ Use UIDs from snapshots for reliable element selection
- ✅ Always use `--isolated` mode for security

**When to read full guide:**
- Implementing browser automation workflows
- Performance analysis or Core Web Vitals measurement
- Troubleshooting MCP tool failures
- Understanding snapshot-UID system

**Related Guides:**
- `~/.agents/docs/AGENT-BROWSER-GUIDE.md` (agent-browser CLI)

---

## 🔄 WORKFLOW INTEGRATION

**Full Documentation:** `~/.agents/docs/WORKFLOW-INTEGRATION-GUIDE.md`

**Quick Reference:**

**Rule Hierarchy:**
1. Universal Standards (this file) → 2. Platform Rules → 3. Project Template → 4. Local Overrides

**Essential QA Checklist:**
- [ ] Follows language conventions + error handling + tests
- [ ] Clear documentation + security review
- [ ] **HANDOFF TASK CREATED** (if human action needed)
- [ ] **CHANGELOG ENTRY** with time tracking data
- [ ] **MERMAID DIAGRAMS VALIDATED** (see `~/.agents/docs/MERMAID-COMPATIBILITY-RULES.md`)
- [ ] **MARKDOWN VALIDATED** (see `~/.agents/docs/MARKDOWN-COMPATIBILITY-RULES.md`)

**When to Read Full Guide:**
- Project type detection logic (9 languages/frameworks)
- Complete 15-item QA checklist
- Comprehensive markdown/Mermaid requirements
- Rule application hierarchy details

**Critical:** All markdown docs MUST use GitHub Flavored Markdown. All Mermaid diagrams MUST avoid line breaks and emojis in labels.

**🚨 CRITICAL MARKDOWN FORMATTING RULE:**
**ALWAYS add a blank line after headers before lists.** This happens constantly and makes markdown render incorrectly.

❌ **WRONG:**
```markdown
## Header
- Item 1
- Item 2
```

✅ **CORRECT:**
```markdown
## Header

- Item 1
- Item 2
```

**This applies to ALL markdown files: documentation, work orders, proposals, features, changelogs, etc.**

---

## 🤖 AUTOMATIC BEHAVIOR ENFORCEMENT

**Full Documentation:** `~/.agents/docs/ENFORCEMENT-THRESHOLDS.md`

**Quick Reference:**
- Triggers: task completion, session end/handoff, 10+ minutes, or 2+ files AND 50+ lines changed
- Skip override: user explicitly says "skip changelog", "no documentation", "WIP", or "experimental only"
- Full details (config + examples): `~/.agents/docs/ENFORCEMENT-THRESHOLDS.md`

---

## 🎯 ACTIONABLE PATH REQUIREMENTS (MANDATORY - NEVER SKIP)

**🚨 CRITICAL: EVERY message with an actionable outcome MUST end with absolute paths.**

**This is NOT optional. Users should NEVER have to ask "where is that?" or "what's the path?"**

**ALWAYS provide absolute paths for:**

- **Apps/executables built**: `/full/path/to/App.app` or `/full/path/to/binary`
- **Files created/modified**: `/full/path/to/file.md`
- **URLs to view**: `http://localhost:3000/dashboard`
- **Commands to run**: `cd /full/path && command`
- **Directories created**: `/full/path/to/directory/`

**Format (REQUIRED at end of actionable messages):**

```
📍 Actionable Paths:
- App: /Users/name/.agents/apps/my-app/target/release/bundle/macos/MyApp.app
- Config: /Users/name/.agents/apps/my-app/src-tauri/tauri.conf.json
- Run dev: cd /Users/name/.agents/apps/my-app && npm run tauri:dev
```

**When to include this block:**
- ✅ After building/compiling anything
- ✅ After creating/modifying files
- ✅ After fixing bugs (path to the fixed file)
- ✅ When saying "it's running" (path to what's running)
- ✅ Task completions, handoffs, session endings
- ✅ ANY message where user might want to access something

**Why:** Users are not in your terminal. They cannot see your working directory. Never make them ask for paths.

---

## 🎬 Session End Protocol (INBOX)

Before ending session (only create handoff if work is UNFINISHED):

1. **Quick INBOX check** (30 seconds):
   - Did you encounter any ideas worth saving?
   - Any links discovered during work?
   - Any future todos identified?

2. **Rapid capture**:
```bash
# If yes to any above, quick dump:
echo "[capture]" >> ~/INBOX/[file].md
```

3. **Then proceed** with handoff or session end.

**Benefit**: Prevents "shower thoughts" - ideas that come after session ends.

---

## 📋 HANDOFFS VS AUDITS VS ACCOMPLISHMENTS (CRITICAL DISTINCTION)

**When to create what:**

### CREATE HANDOFF when:
- ✅ Work is UNFINISHED and needs continuation
- ✅ You're stopping mid-task
- ✅ Another agent needs to pick up where you left off
- ✅ There are SPECIFIC NEXT ACTIONS to execute
- ✅ **USER EXPLICITLY REQUESTS a handoff**, regardless of work completion status
- **Location:** `.dev/ai/handoffs/`
- **Purpose:** Pass unfinished work OR preserve critical context for future work to next agent

### CREATE AUDIT/ACCOMPLISHMENT when:
- ✅ Work is COMPLETE and no handoff is needed
- ✅ You've finished all requested tasks and user doesn't want a handoff
- ✅ You want to document what was done for historical record only
- **Location:** `.dev/ai/audits/` or `.dev/ai/accomplishments/`
- **Purpose:** Document completed work without transferring active responsibility

### NEVER create handoff when:
- ❌ User explicitly says they don't want a handoff
- ❌ There are no actionable next steps AND user hasn't requested context preservation

### NEVER proactively offer handoffs or audits when:
- ❌ The session is still active and the user hasn't indicated they're done
- ❌ A single task just completed but the user may have more work
- **Wait for:** User says "we're done", "wrap up", "create a handoff/audit", or explicitly ends the session

**Critical Rule:** Always respect explicit user requests for handoffs. If user says "create a handoff" or "your work qualifies as a necessary handoff", create the handoff regardless of whether work appears complete. Context preservation for ongoing systems takes precedence over completion status.

**Common mistake:** Refusing to create handoff when user explicitly requests one because "work is complete". User judgment about context preservation always overrides agent assessment of completion status.

**Filename prefix:** All handoffs, audits, and accomplishments require timestamp prefix from `~/.agents/scripts/get-filename-prefix.sh`. Never use placeholders. See `~/.agents/docs/TIMESTAMP-UTILITIES-GUIDE.md`.

---

## AUDITABLE RECORD CREATION MODE

**Trigger phrases:** "create audit", "create auditable record", "audit this work", "document this session"
**External File:** `~/.agents/prompts/creation/CREATE-AUDITABLE-RECORD.md`

**Purpose:** Create comprehensive audit trail of work performed, decisions made, and changes implemented.

---
## CLIENT REPORT MODE

**Trigger phrases:** "client report", "generate client report", "create client report", "project report", "status report for client"
**External File:** `~/.agents/modes/CLIENT-REPORT-MODE.md`

**Purpose:** Generate client-facing progress reports.

---
## 🎯 WORKFLOW PRINCIPLES (Boris Cherney, Claude Code Creator)

**Full Reference:** `~/.agents/docs/references/BORIS-CHERNEY-WORKFLOW-PRINCIPLES.md`

**Key Principles (internalize, do not just read):**

- **Re-plan on failure**: If something goes sideways, STOP and re-plan immediately — don't keep pushing
- **Self-Improvement Loop**: After ANY user correction, capture the pattern in project lessons (`tasks/lessons.md` or `.dev/ai/lessons.md`). Review lessons at session start. Ruthlessly iterate until mistake rate drops
- **Demand Elegance (Balanced)**: For non-trivial changes, pause — "is there a more elegant way?" Skip for simple fixes
- **Autonomous Bug Fixing**: When given a bug report, just fix it. Point at logs, errors, failing tests — then resolve. Zero context switching required from the user
- **Simplicity First**: Make every change as simple as possible. Impact minimal code
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs

**Already enforced by other sections** (see Verification Protocols, Sub-Agent Orchestration, Work Order Enforcement):
Plan-first workflow, subagent delegation, verification before done, task tracking.

---
## 🚨 VERSION CONTROL & GIT OPERATING RULES (MANDATORY)

**Full Documentation:** `~/.agents/docs/GIT-OPERATING-RULES.md`

**ABSOLUTE PROHIBITION — READ THIS CAREFULLY:**

**Agents must NEVER perform ANY git operation — commit, push, pull, branch, merge, rebase, tag, stash, or ANY other repo-mutating action — unless the user EXPLICITLY asks for it in the current message.** This includes "helpfully" committing after finishing a task, suggesting a commit, running `git status` to "check things", or any other git-adjacent behavior. The user's instruction to commit or push is the ONLY trigger. When you finish a task, YOU ARE DONE. Do not think about git. Do not mention committing. Do not offer to commit. Move on or stop.

**Why this exists:** Agents systematically waste enormous amounts of tokens and credits on git operations the user never asked for and can do themselves in 30 seconds. This stops now.

**The rule in three words: NEVER. UNLESS. ASKED.**

- **FORBIDDEN (unless user explicitly requests):** `git commit`, `git push`, `git pull`, `git branch`, `git checkout -b`, `git merge`, `git rebase`, `git tag`, `git stash`, offering to do any of these
- **ALLOWED without asking:** `git status`, `git diff`, `git log` (read-only inspection when needed for YOUR work)
- 🚨 **ZERO AI ATTRIBUTION POLICY** — No Co-Authored-By, no tool markers, user's work only

**When to read full guide:** Git workflows, ZERO AI ATTRIBUTION details, branch/commit standards

---

## 🚨 GIT WORKTREE FILE EDITING (MANDATORY)

**Full Documentation:** `~/.agents/docs/WORKTREE-EDITING-FIX.md`

**CRITICAL:** When editing files in git worktrees, DO NOT use `search_replace` tool directly. Use wrapper script instead.

**Required Usage:**
```bash
run_terminal_cmd(
    command='~/.agents/scripts/worktree-search-replace.sh "relative/path/to/file.md" "old string" "new string"',
    is_background=False
)
```

**Why:** The `search_replace` tool doesn't understand worktree path resolution. The wrapper script handles this automatically.

**See:** `~/.agents/docs/WORKTREE-EDITING-FIX.md` for complete guide and examples.

---

## ⏰ TIMESTAMP UTILITIES (MANDATORY USAGE)

**Official Format:** `YYYY-MM-DD-HH-MM-SS` (e.g., 2025-10-23-14-30-45)

**Full Documentation:** `~/.agents/docs/TIMESTAMP-UTILITIES-GUIDE.md`

### Available Scripts

**Filename Prefix:**
```bash
~/.agents/scripts/get-filename-prefix.sh
# Returns: 2025-10-23-14-30-45
```

**Unix Timestamp:**
```bash
~/.agents/scripts/get-timestamp.sh
# Returns: 1729728000
```

### 🚨 MANDATORY: No Placeholder Timestamps

**NEVER use placeholder text like `<timestamp>`, `[timestamp]`, or `YYYY-MM-DD-HH-MM-SS` in filenames.**

**Why:** Agent clocks drift. The script is the single source of truth.

**Usage:**
```bash
# Call once at start of response, reuse the value
PREFIX=$(~/.agents/scripts/get-filename-prefix.sh)
# Use it: ${PREFIX}-my-report.md, ${PREFIX}-audit.md
```

**WRONG:**
```
❌ "Save to `.dev/ai/reports/<timestamp>-report.md`"
```

**CORRECT:**
```
✅ "Save to `.dev/ai/reports/2025-12-23-21-15-42-report.md`"
```

**Scope:** All files in `.dev/ai/{reports,audits,handoffs,workorders,proposals,accomplishments}/` require timestamp-prefixed filenames.

---

## 🛤️ PATH CONVENTIONS FOR PORTABILITY (MANDATORY)

**Full Documentation:** `~/.agents/docs/PATH-CONVENTIONS.md`

**🚨 CRITICAL WARNING:** If tilde (`~`) is not properly expanded by the shell, it creates a literal directory named `~` in your current working directory!

### The Rules (Context-Specific)

**Shell commands:** Use `~/.agents/` (tilde auto-expands)
```bash
source ~/.agents/scripts/common.sh
~/.agents/scripts/track-project.sh "my-project" "Session started"
```

**Python (CRITICAL - tilde NEVER auto-expands!):**
```python
# ✅ CORRECT - Use Path.home()
agents_dir = Path.home() / ".agents"

# ❌ WRONG - Creates literal "~/.agents" directory!
agents_dir = "~/.agents"  # DISASTER
```

### Quick Reference

| Pattern | Context | Expands? | Use? |
|---------|---------|----------|------|
| `~/.agents/` | Shell | ✅ Yes | ✅ Safe |
| `$HOME/.agents/` | Everywhere | ✅ Always | ✅ Safest |
| `Path.home()` | Python | ✅ Yes | ✅ Best for Python |
| `"~/.agents/"` | Python string | ❌ No | ❌ Creates ~/dir |

**Remember:** If your path contains a literal `~` character after assignment, it's NOT expanded - you WILL create a `~` directory!

---

## 🚀 QUICK SETUP COMMANDS
**Full Documentation:** `~/.agents/docs/QUICK-SETUP-COMMANDS.md`

**Purpose:** Common init/sync/capture/service commands.

---

## 📁 When to Use What - Capture Decision Guide

**Quick reference for choosing the right capture method:**

| Capture Method | Use When | Don't Use When |
|----------------|----------|----------------|
| **INBOX** | Quick thoughts, unclear ideas, future work, links | Current task, clear next steps |
| **Work Order** | Clear task >30 min, defined steps | Vague idea, research needed |
| **Feature Request** | Complex need, unclear solution | Simple task, known solution |
| **Proposal** | Multi-week work, architecture decisions | Single task, clear path |

**INBOX is for:** "I should look into this later" or "This doesn't fit right now"
**Work Orders are for:** "I know exactly what needs to be done"

---

## 📊 SUCCESS METRICS

**Full Documentation:** `~/.agents/docs/AGENT-ONBOARDING-CHECKLIST.md`

**Quick Reference:**
- Consistency, quality, efficiency, maintainability across all models
- Tool display with available triggers and modes

**When to read:** Agent onboarding, tool configuration, trigger phrases

---

## 🚨 AVOID TERMINAL CORRUPTION

**FORBIDDEN**: Long heredocs (>50 lines), nested EOFs, commands >200 chars

**REQUIRED**: Use `echo "content" > file`, break into small commands, test parts first

**Fix Broken Terminal**: Type `EOF` + Enter, or restart terminal

---

## 🧹 CLAUDE CODE ORPHAN CLEANUP (PROACTIVE)

**Problem**: Claude Code processes can become orphaned when terminal tabs are closed, accumulating over days and causing system slowness, high memory usage, and swap exhaustion.

**Proactive Check - Run when system is slow:**
```bash
# Quick health check
ORPHANS=$(ps aux | grep "[c]laude" | grep " ?? " | wc -l | tr -d ' ')
[ "$ORPHANS" -gt 5 ] && echo "⚠️  Found $ORPHANS orphaned Claude processes"

# Full diagnostic
ps aux | grep "[c]laude" | awk '{sum+=$6; cpu+=$3} END {print "Claude: Memory:", int(sum/1024), "MB | CPU:", cpu, "%"}'
```

**Cleanup Command (safe - only kills orphans):**
```bash
ps aux | grep "[c]laude" | grep " ?? " | awk '{print $2}' | xargs kill -9 2>/dev/null
```

**When to suggest cleanup to user:**
- User reports "system is slow" or "high memory"
- iTerm2/terminal at high CPU (>50%)
- Swap usage >80%
- Claude process count >15

**Full documentation:** `~/.agents/.dev/performance-diagnostics/knowledge-base/COMMON-ISSUES.md` (Issue 5)

---

## 📝 EDITING THIS FILE (CRITICAL)

**BEFORE making ANY changes to AGENTS.md, READ:**
`~/.agents/docs/AGENTS-EDITING-GUIDE.md`

**Key Rules:**
- MAX 50 lines per section (TARGET 30)
- Extract content >50 lines to external files
- Keep AGENTS.md under 2,500 lines total
- Follow modular architecture governance

**This applies to:**
- ✅ Global AGENTS.md (this file)
- ✅ External files referenced by this file (`/Users/grig/.agents/docs/`, `/Users/grig/.agents/modes/`, `/Users/grig/.agents/prompts/`, `/Users/grig/.agents/templates/`)
- ❌ Per-project `AGENTS.md` copies are immutable (do not edit; sync by file copy)
- ✅ Per-project rules and configuration go in `PROJECT-RULES.md`

**When agents suggest adding content, they MUST:**
1. Check current section size
2. If section would exceed 50 lines → propose extraction
3. Create external file in docs/, modes/, or prompts/
4. Add slim reference instead of inline content
5. Validate: `wc -l AGENTS.md` (must be <2,500)

**Quick Validation:**
```bash
# Check total line count
wc -l ~/.agents/AGENTS.md

# Check section sizes
awk '/^## / {if (section) print section": "count; section=$0; count=0; next} {count++} END {print section": "count}' ~/.agents/AGENTS.md | awk -F: '$2 > 50'
```

**When in doubt:** Extract to external file. It's easier to keep content external than to extract it later.

## 📁 AGENT BACKUP FILE ORGANIZATION

**Rule:** Agent backup files must be stored in `agents-backup/` subdirectory and must not be edited.

## Document Organization Standards

**Methodology**: See `~/.agents/templates/AI_DOCUMENT_ORGANIZATION.md`

**Key Principles**:
- Semantic classification based on document PURPOSE, not filename patterns
- Confidence thresholds with human oversight for uncertain classifications
- Non-destructive operations with full audit trails
- Quality gates before and after any reorganization

**For Research Directories**: Use Research Librarian Mode (`~/.agents/modes/RESEARCH-LIBRARIAN-MODE.md`)

**Note**: Automated migration scripts have been deprecated in favor of agent-driven semantic classification. AI agents must read and understand each document before classification.
