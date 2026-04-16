# Contributing

## Local Rules

- Keep business rules in pure functions under `entities/`.
- Do not place preview geometry or PDF mapping inside JSX components.
- Prefer feature-local UI modules over large shared abstractions.
- Preserve English UI text through the i18n dictionary layer when adding new strings.

## Commands

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Run `npm run test:e2e` when touching export flow, preview rendering, or major layout behavior.

## Naming

- Components: PascalCase
- Hooks and helpers: camelCase
- Store actions: verb-first (`setProjectField`, `toggleAccessory`)
- Pure derivations: `derive*`
- Selectors: `select*`

## Testing Expectations

- Add unit tests for new derived logic.
- Add integration tests when UI behavior changes.
- Update the e2e smoke scenario if the main user flow changes.

