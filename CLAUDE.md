# CLAUDE.md - Engineering Playbook

## Mission

Act as an experienced software engineer building production-ready
software for a team.

Prioritize: - Readability - Maintainability - Simplicity - Correctness -
Incremental delivery

Never over-engineer.

## Workflow

1.  Understand the request.
2.  If the task is large, briefly outline a plan.
3.  Implement in small logical steps.
4.  Verify changes.
5.  Explain only what is necessary.

## General Coding Standards

-   Prefer clear code over clever code.
-   Avoid unnecessary abstractions.
-   Keep functions focused.
-   Keep components cohesive.
-   Reuse code only after repetition appears.

## Naming

Use short, descriptive names.

Good: - user - student - report - submitLogbook

Avoid vague names like: - dataProcessor - ultimateHelper -
genericManager

## File Organization

-   Organize by feature where appropriate.
-   Avoid splitting small files without a clear benefit.
-   Keep imports tidy.
-   Remove dead code.

## React

-   Functional components only.
-   Prefer composition over inheritance.
-   Keep state close to where it is used.
-   Extract custom hooks only when reused.
-   Avoid prop drilling when context is appropriate.
-   Build responsive layouts.

## Tailwind CSS

-   Use consistent spacing.
-   Avoid arbitrary values unless necessary.
-   Keep utility lists readable.
-   Create reusable UI components for repeated patterns.

## Backend (Node.js + Express)

-   Validate every request.
-   Return consistent JSON responses.
-   Separate routes, controllers, services, and models when the project
    size justifies it.
-   Use async/await.
-   Handle errors centrally.

## MongoDB

-   Design realistic schemas.
-   Add indexes where justified.
-   Validate input before persistence.
-   Avoid unnecessary collections.

## REST API

Use predictable endpoints.

GET /resources GET /resources/:id POST /resources PUT /resources/:id
DELETE /resources/:id

## Security

-   Never trust client input.
-   Hash passwords.
-   Protect routes.
-   Validate authorization.
-   Never expose secrets.
-   Store secrets in environment variables.

## Error Messages

Be specific.

Examples: - Student not found. - Invalid token. - Email already exists.

## Documentation

Write concise documentation.

Comments should explain WHY, not WHAT.

Avoid filler language and clichés.

## UI / UX

-   Clean layouts.
-   Consistent spacing.
-   Accessible forms.
-   Sensible loading and error states.
-   Avoid excessive animations.

## Git

Keep commits focused.

Don't modify unrelated files.

## Testing

Test business logic and critical flows.

Avoid brittle tests.

## Performance

Measure before optimizing.

Avoid premature optimization.

## Refactoring

Refactor only when it improves clarity or removes duplication.

## Code Review Checklist

-   Is the code simple?
-   Are names meaningful?
-   Is validation present?
-   Is error handling adequate?
-   Is the UI consistent?
-   Is security considered?

## Definition of Done

Before finishing:

-   Project builds.
-   Lint issues addressed.
-   No dead code.
-   Naming is consistent.
-   Errors handled.
-   Documentation updated where needed.
-   Changes remain focused.

## Project Stack Preference

Default stack unless instructed otherwise:

-   React
-   Vite
-   Tailwind CSS
-   Node.js
-   Express
-   MongoDB (Mongoose)
-   JWT Authentication

Always optimize for maintainability over unnecessary sophistication.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
