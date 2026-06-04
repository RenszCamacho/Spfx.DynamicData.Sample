# SPFx DynamicData Sample

A SharePoint Framework sample demonstrating **Provider → Consumer communication** using the SPFx DynamicData API. The Provider web part exposes product data from a SharePoint list; the Consumer web part subscribes to a selected product via the property pane and displays its detail.

![SPFx](https://img.shields.io/badge/SPFx-1.23.0-green.svg)
![React](https://img.shields.io/badge/React-17-blue.svg)
![Fluent UI](https://img.shields.io/badge/Fluent_UI-8-blueviolet.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## How it works

```
┌─────────────────┐                      ┌─────────────────┐
│    Provider     │                      │    Consumer     │
│                 │   notifyProperty    │                 │
│  ┌───────────┐  │  Changed ─────────►  │  ┌───────────┐  │
│  │ Products  │  │                      │  │  Detail   │  │
│  │   list    │  │  productoSeleccionado │  │   view    │  │
│  └───────────┘  │                      │  └───────────┘  │
└─────────────────┘                      └─────────────────┘
        │                                         ▲
        │ SharePoint REST (PnPjs)                 │ DynamicProperty
        ▼                                         │ (Property Pane binding)
   [Productos] list                                │
```

1. **Provider** connects to the `Productos` SharePoint list and renders a selectable list of products.
2. When the user selects a product, the Provider calls `notifyPropertyChanged` on the `productoSeleccionado` property.
3. **Consumer** subscribes to the Provider source via a `DynamicProperty` configured in its property pane.
4. The Consumer receives the selected product and renders its detail (ID, Name, Price).

---

## Quick start

### Prerequisites

- Node.js >= 22.14.0
- SharePoint Framework development environment ([setup guide](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant))
- A SharePoint list named `Productos` with columns: `Title` (text), `Precio` (number)

### Build

```bash
npm install
npx heft build
```

### Package

```bash
npx heft package-solution --production
```

The `.sppkg` is generated at `sharepoint/solution/spfx-dynamic-data-sample.sppkg`.

### Deploy

1. Upload the `.sppkg` to your **App Catalog**.
2. Add the **Provider** web part to a page.
3. Add the **Consumer** web part to the same page.
4. Edit the Consumer web part → in the property pane, select the Provider as the source for `productoSeleccionado`.
5. Click a product in the Provider — the Consumer updates with the product detail.

---

## Architecture

### Folder structure

```
src/
├── constants/       # Centralized magic strings (DYNAMIC_DATA_PROPERTIES, SHAREPOINT_LISTS, COLUMNS)
├── sources/         # IDynamicDataCallables methods (getPropertyDefinitions, getPropertyValue, getPropertyById)
├── models/          # Domain interfaces (IProduct)
├── services/        # PnPjs service (ProductService) with ServiceScope DI
└── webparts/
    ├── provider/
    │   ├── hooks/   # useProducts (Provider-specific custom hook)
    │   └── ...
    └── consumer/
        ├── hooks/   # useConsumer (Consumer-specific custom hook)
        └── ...
```

### Key design decisions

| Area | Decision | Why |
|------|----------|-----|
| Components | **Dumb** (zero business logic) | All logic lives in custom hooks — easy to test, clear separation of concerns |
| Constants | Centralized in `src/constants/` | No magic strings, single source of truth |
| DynamicData methods | Dedicated `src/sources/` folder | Semantic match for the "sources" concept; not pure utils |
| `initializeSource` | Called in `onInit()` | Runs once, not on every render — avoids duplicate registration |
| `productoSeleccionado` | Reactive property with `notifyPropertyChanged` | Native DynamicData pattern; function properties have limited support |
| Consumer binding | `PropertyPaneDynamicField` + `DynamicProperty` | User-configurable source binding via property pane |
| `Selection` for DetailsList | `onSelectionChanged` on single click | `onItemInvoked` only fires on double-click — bad UX |

### Exposed DynamicData properties

| Property ID | Type | Description |
|-------------|------|-------------|
| `products` | `IProduct[]` | Full product list |
| `productCount` | `number` | Total number of products |
| `productoSeleccionado` | `IProduct \| undefined` | Currently selected product (notifies on change) |

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | SharePoint Framework 1.23.0 |
| UI | React 17 + Fluent UI 8 (`@fluentui/react`) |
| Data access | PnPjs 4.20.0 (`@pnp/sp`, `@pnp/logging`) |
| Build | Heft 1.2.17 |
| TypeScript | 5.8.x |
| Linting | ESLint 9.37.0 with `@microsoft/eslint-config-spfx` |

---

## Development

### Run locally

```bash
npx heft start
```

This launches the local workbench where you can test both web parts side by side.

### Lint

```bash
npx heft build
```

Linting runs as part of the build. Zero warnings is the target.

### Project conventions

- Use `const` and `let`, never `var`
- Prefer `interface` over `type` for object shapes
- Avoid `any` — use `unknown` or specific types
- Functional components with hooks — no class components
- Named exports only — no default exports
- No custom CSS/SCSS unless absolutely necessary — prefer Fluent UI styling
- All magic strings go in `src/constants/`
- All business logic lives in custom hooks, not components

---

## Version history

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Jun 2026 | Initial release — Provider + Consumer DynamicData sample |

---

## License

MIT

---

## References

- [SharePoint Framework documentation](https://aka.ms/spfx)
- [Dynamic Data and connected web parts](https://docs.microsoft.com/sharepoint/dev/spfx/dynamic-data)
- [PnPjs documentation](https://pnp.github.io/pnpjs/)
- [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)
- [Heft build system](https://heft.rushstack.io/)
