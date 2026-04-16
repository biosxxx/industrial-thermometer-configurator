# Architecture

## Overview

The application is a modular frontend monolith organized around one thermometer configurator flow:

1. `entities/thermometer-config` owns the typed configuration model, catalogs, schema, defaults, store, and pure selectors.
2. `features/*` render isolated form sections and update the Zustand store through explicit actions.
3. `entities/thermometer-preview` renders the SVG preview from a precomputed visual layout.
4. `entities/pdf-datasheet` builds the PDF payload and exports the datasheet without coupling to page JSX.
5. `widgets/*` compose header, layout, sidebar, and preview stage.
6. `pages/configurator` assembles the screen.

## State Flow

- Source of truth: `useThermometerConfiguratorStore`
- Derived logic:
  - `deriveModelName`
  - `deriveAccuracyClass`
  - `deriveVisualLayout`
  - `buildPdfPayload`
- Validation:
  - `selectIsRangeValid`
  - `selectHasCriticalValidationErrors`

UI components read the current config from the store and dispatch narrow actions such as `setProjectField`, `setStemField`, `setRangePreset`, `toggleAccessory`, and `toggleOption`.

## Preview Pipeline

1. Form inputs update the store.
2. `selectVisualLayout(config)` converts configuration into dial, stem, thermowell, and mounting geometry.
3. `ThermometerPreviewSvg` receives only `config` and `visual`.
4. `ThermometerPreviewStage` wraps the SVG into a white capture area with badges and watermark text.

This separation keeps rendering deterministic and suitable for snapshot or visual regression coverage.

## PDF Pipeline

1. `ExportPdfButton` calls `exportThermometerDatasheet(config, previewElement)`.
2. `buildPdfPayload(config)` maps domain state to export sections.
3. `capturePreview(previewElement)` rasterizes the preview stage with `html2canvas`.
4. `exportThermometerDatasheet` lazy-loads `jspdf`, writes sections, embeds the preview image, and applies footers.

The PDF layer does not depend on the page component tree beyond the capture element reference.

## Deployment Contract

- Entry HTML file: `app.html`
- Build base: `./`
- Hashed assets: `dist/assets/*`
- Standalone static deployment supported
- Shell/iframe embedding supported through `app.html`
- GitHub Actions deploy target: `static/utility-apps/industrial-thermometer-configurator`
