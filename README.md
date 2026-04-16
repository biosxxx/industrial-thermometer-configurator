# Industrial Thermometer Configurator 2.0

Standalone frontend application for configuring an industrial dial thermometer, rendering a live SVG preview, and exporting a client-side PDF datasheet.

## Stack

- Node.js 22+ (`npm` is used in this repository)
- React + TypeScript + Vite
- Tailwind CSS
- Zustand
- Zod
- Vitest + React Testing Library
- Playwright
- jsPDF + html2canvas (lazy-loaded export path)

## Run

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/app.html`.

To emulate the mount path used by the main local website repository, create `.env.local` from `.env.example` and set:

```bash
APP_DEV_MOUNT_PATH=/utility-apps/industrial-thermometer-configurator
```

Then `npm run dev` and Playwright will use:

```text
http://127.0.0.1:5173/utility-apps/industrial-thermometer-configurator/app.html
```

The root `http://127.0.0.1:5173/app.html` path remains available for direct standalone development.

## Build

```bash
npm run build
```

Production output is generated as:

```text
dist/
|- app.html
|- assets/
```

The build uses relative asset paths and is intended to replace the static runtime artifact at `/utility-apps/industrial-thermometer-configurator/app.html`.

## Quality Checks

```bash
npm run typecheck
npm run lint
npm run test
npm run test:e2e
```

## Repository Notes

- The implementation keeps the current configurator workflow while splitting domain logic, UI rendering, preview geometry, and PDF generation into separate modules.
- The advanced technical parameters section supports text blocks, tables, and screenshot uploads with inline page-fragment preview.
- The UI baseline is English-only, with message dictionaries prepared for future i18n expansion.
- Website deploy is handled by `.github/workflows/main.yml` and targets `static/utility-apps/industrial-thermometer-configurator` in `biosxxx/cadautoscript.com`.

## Key Folders

```text
src/
|- app/
|- pages/
|- widgets/
|- features/
|- entities/
|- shared/
tests/
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the module flow and [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution rules.
