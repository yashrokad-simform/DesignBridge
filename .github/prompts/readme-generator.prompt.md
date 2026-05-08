---
agent: 'agent'
description: 'Generate a clear README.md file for a repository to help developers understand, set up, and contribute to the project quickly.'
---

**Prompt: Generate README.md for a Repository**

Your task is to generate a comprehensive, well-structured `README.md` file for this repository that helps developers understand, set up, and contribute to the project quickly.

Take your time to thoroughly explore the codebase before writing. A high-quality README significantly reduces onboarding time and support overhead.

---

### Goals
- Help new developers understand the project's purpose and architecture within minutes.
- Provide accurate, copy-paste-ready setup and usage instructions.
- Reduce back-and-forth questions by anticipating common issues.
- Serve as a single source of truth for the project.

---

### Limitations
- Keep it scannable — use headers, bullet points, and code blocks.
- Avoid task-specific details; focus on what's universally useful.
- Do not include sensitive credentials, keys, or internal-only information.

---

### What to Include

**Project Overview**
- What the project does and why it exists (2–4 sentences).
- Who the intended users or consumers are.
- Any live demo links, screenshots, or badges (build status, version, license).

**Tech Stack**
- Languages, frameworks, runtimes, and key libraries used.
- Versions of critical tools (e.g., Node 20, Python 3.11, Java 17).

**Project Structure**
- A annotated directory tree of the top 2 levels.
- Call out the purpose of key files and folders (config, entry points, tests, scripts).

**Prerequisites**
- All tools, runtimes, and accounts required before setup begins.
- Exact versions where applicable. Flag anything that breaks on other versions.

**Installation & Setup**
- Step-by-step commands from a clean environment to a running project.
- Flag any steps that look optional but are actually required.
- Document any known setup errors and their fixes.

**Running the Project**
- How to start the app locally.
- Environment variables needed — use a `.env.example` format.
- Any seed data or database migration steps required.

**Running Tests**
- Commands to run the full test suite.
- Commands to run a single test or test file.
- Any required setup before tests can run (e.g., test DB, fixtures).

**Linting & Formatting**
- Commands to lint and auto-format code.
- Note whether these are enforced in CI.

**Build & Deployment**
- How to create a production build.
- Deployment process or links to deployment docs.
- Any environment-specific configuration to be aware of.

**Contributing**
- Branch naming conventions, PR process, and commit style.
- How to run checks locally before pushing.
- Link to `CONTRIBUTING.md` if one exists.

**License**
- License type and a link to the `LICENSE` file.

---

### Steps to Follow

1. Inspect all build scripts, `Makefile`, `package.json`, `pyproject.toml`, `pom.xml`, or equivalent.
2. Check CI/CD pipelines (`.github/workflows/`, `Jenkinsfile`, etc.) for the canonical build/test/deploy steps.
3. Look for `.env.example`, `docker-compose.yml`, and config files to document environment setup.
4. Scan for `HACK`, `TODO`, `FIXME`, and `WORKAROUND` comments — note any that affect setup.
5. Run the setup, build, and test commands yourself and document exactly what works, what fails, and in what order things must be done.
6. Note the time taken for any slow commands (builds, test suites) so readers know what to expect.
7. When you find a working sequence of commands, document it verbatim in a code block.

> **Trust what you verify.** Only include instructions you have confirmed work. Flag anything unverified with a note like `(unverified — check before use)`.

---

Use this as your template structure and fill it in based on what you find in the codebase. Prefer accuracy over completeness — a shorter, correct README beats a long, broken one.