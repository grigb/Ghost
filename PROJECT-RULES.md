---
format_version: 1.0
migrated_from: agents-md-split
migration_date: 2026-02-26T19:57:49
project_name: Ghost
project_updated: 2026-02-26T19:57:49
---

# PROJECT-RULES.md

> **This file contains project-specific rules and configuration.**
> Universal agent rules are in `AGENTS.md` (immutable global copy).
> Agents: Read `AGENTS.md` first, then this file.

<!-- MIGRATION-MARKER: format=split-v1 -->

## Quick Decision Guide (AGENTS.md vs PROJECT-RULES.md)

1. `AGENTS.md` = universal rules (immutable, identical across projects).
2. `PROJECT-RULES.md` = this project's configuration and conventions.
3. Modes: keep a short stub in `AGENTS.md`, put full workflow in an external mode file.
4. Project identity (name/description) lives in `PROJECT-RULES.md`.
5. Build/test/dev commands live in `PROJECT-RULES.md`.
6. Repo structure and module boundaries live in `PROJECT-RULES.md`.
7. Coding style and testing expectations live in `PROJECT-RULES.md`.
8. Infra rules (ports, daemons, services) live in `PROJECT-RULES.md`.
9. Discovered patterns, quirks, and known issues live in `PROJECT-RULES.md`.
10. If unsure: default to `PROJECT-RULES.md`.

## Project-Specific Infrastructure Rules

[Add infrastructure rules specific to this project here.
Example: critical service rules, daemon management, port assignments.]

## Repository Guidelines

What goes here:
- What this repo is for (one paragraph)
- Constraints / non-goals
- Any "must know" rules for contributors and agents

[Replace with project-specific content - describe repository purpose, philosophy, approach]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#repository-guidelines`

## Project Structure & Module Organization

What goes here:
- High-level directory map
- Key modules/services and their boundaries
- Where to add new code vs refactor existing

[Replace with project-specific directory structure]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#project-structure--module-organization`

## Build, Test, and Development Commands

What goes here:
- Install dependencies
- Start dev server / run locally
- Run tests (unit/integration/e2e) + any required env
- Lint/format/typecheck/build commands

[Replace with project-specific commands]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#build-test-and-development-commands`

## Coding Style & Naming Conventions

What goes here:
- Naming conventions (files, symbols)
- Code patterns (error handling, logging, tracing)
- Style and formatting expectations (and formatter command)

[Replace with project-specific conventions]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#coding-style--naming-conventions`

## Testing Guidelines

What goes here:
- Testing philosophy (what must be tested)
- Required frameworks and how to run
- Flaky test notes and stability requirements

[Replace with project-specific testing requirements]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#testing-guidelines`

## Project Overview

What goes here:
- One-paragraph overview
- Users / stakeholders
- Key features and priorities

[Replace with project overview]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#project-overview`

## Project Phase & Current Status

What goes here:
- Current phase (discovery/build/launch/etc)
- Active focus, blockers, and near-term plan

[Replace with current status]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#project-phase--current-status`

## Architecture Overview

What goes here:
- High-level architecture diagram (optional)
- Key components/services and data flow
- Deployment/runtime notes

[Replace with architecture overview]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#architecture-overview`

## Repository Structure

What goes here:
- Important directories and what belongs there
- Conventions for docs, tests, scripts

[Replace with actual repository structure]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#repository-structure`

## Key Documentation

What goes here:
- Canon docs to read first
- Any required onboarding docs
- Links/paths to specs, ADRs, etc

[Replace with key documentation paths]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#key-documentation`

## Development Commands

What goes here:
- Common dev workflows (db migrate, seed, start services)
- Troubleshooting commands

[Replace with project-specific development commands]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#development-commands`

## Future Development

What goes here:
- Roadmap bullets (next 1-3 milestones)
- Known follow-ups and refactors

[Replace with roadmap / future work]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#future-development`

## Module Integration Points

What goes here:
- External APIs and integrations
- Service boundaries and contracts
- Shared schemas / message formats

[Replace with module integration points]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#module-integration-points`

## Research Methodology

What goes here:
- How research is captured and validated
- Citation/link capture rules
- Output expectations for research docs

[Replace with project research methodology]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#research-methodology`

## Team Workflow

What goes here:
- How work is requested/approved (PRs, reviews, WOs)
- Communication norms and escalation paths

[Replace with team workflow]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#team-workflow`

## Important Notes

What goes here:
- Known gotchas
- Env quirks
- "Don’t do X" rules

[Replace with important notes]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#important-notes`

## Agent-Specific Instructions

What goes here:
- Any special instructions for agents in this repo
- Constraints and guardrails beyond the universal rules

[Replace with agent-specific instructions]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#agent-specific-instructions`

## AI Document Migration Status

What goes here:
- Whether the repo has migrated to `.dev/ai/` conventions
- Any legacy locations still in use

[Replace with AI document migration status]

**Examples:** `~/.agents/templates/PROJECT-SECTIONS-EXAMPLES.md#ai-document-migration-status`

## Discovered Patterns & Conventions

[Agents: append project-specific patterns discovered during implementation work.]

## Known Issues & Quirks

[Agents: append known issues, flaky tests, CI quirks, environment gotchas.]

## Custom Mode Configuration

[Agents: document project-specific mode behavior or overrides, if any.]
