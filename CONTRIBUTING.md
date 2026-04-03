# Contributing to Blego

Thanks for your interest in improving Blego. Contributions from newcomers and experienced maintainers alike are welcome. This document lays out what we look for so you can get from idea to merge with minimal back-and-forth.

## Quick start

1. **Requirements:** [Node.js 22](https://nodejs.org/) or newer (see `engines` in [`package.json`](package.json)).
2. **Install:** From the repository root, run `npm install`.
3. **Verify:** Run `npm test`. It runs ESLint on `lib/` and `tests/`, then [Vitest](https://vitest.dev/) with coverage. Your change should pass this command before you open a pull request.

If something fails locally, fix it or note why it cannot be fixed in the PR description so reviewers know what to expect.

## Project layout

| Location | Purpose |
| -------- | ------- |
| [`lib/`](lib/) | Implementation (ES modules). Subfolders group related behavior (for example `lib/Store/`). |
| [`tests/`](tests/) | Vitest tests; file names mirror what they cover (for example `Store.get.test.js` for `Store.get`). |
| [`main.js`](main.js) / [`main.d.ts`](main.d.ts) | Public entry and TypeScript declarations. |
| [`API.md`](API.md) | User-facing API documentation. Update it when behavior or signatures change. |
| [`CHANGELOG.md`](CHANGELOG.md) | Release notes; add a line under the current unreleased section for user-visible changes. |

Skim nearby files before editing: match import style, naming, and patterns already in use.

## Making a change

1. **Scope:** Prefer small, focused pull requests that solve one problem. That makes review and bisection easier if something regresses later.
2. **Tests:** Add or update tests in `tests/` for bug fixes and new behavior. Tests use Vitest (`describe`, `it`, `expect`); see existing files such as [`tests/Store.get.test.js`](tests/Store.get.test.js) for structure.
3. **Lint:** ESLint is enforced as part of `npm test` (`eslint.config.js`). Do not disable rules broadly unless the project already does so for the same case.
4. **Docs:** If users need to know about the change, update `CHANGELOG.md` and, when applicable, `README.md` or `API.md`.
5. **Types:** If the public surface changes, update `main.d.ts` to stay in sync with `main.js`.

## Pull requests

- Describe **what** changed and **why** (motivation or bug). Link an issue if one exists.
- Confirm **`npm test`** passes on your branch.
- Keep commits readable; squash or split only if it helps clarity—whatever makes the history easy to follow is fine.

Maintainers may suggest tweaks; engaging in review is part of shipping the work.

## Conduct

Be respectful and assume good intent. Technical disagreement is normal; keep discussion about the code and the problem being solved.

## License

By contributing, you agree that your contributions are licensed under the same license as the project ([MIT](LICENSE)).
