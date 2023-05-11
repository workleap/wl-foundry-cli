# Templates

This folder contains the templates that will be loaded from [@workleap/foundry](../packages/foundry/README.md).

| name               | description                                                                              |
|--------------------|------------------------------------------------------------------------------------------|
| `host-application` | This template is a monorepo project for an host application of a federated application.  |
| `remote-module`    | This template is a standalone repository for a remote module of a federated application. |
| `static-module`    | This template is a standalone repository for a static module of a federated application. |
| `web-applicaiton`  | This template is a standalone repository for a standalone web application.               |

## Develop

To work on a template, you can open VsCode from the template folder and execute `pnpm install --ignore-workspace`. The `--ignore-workspace` is important here to install dependencies from the template folder, as if it was created outside a monorepo. This will be useful for tooling like `Webpack`, `EsLint` and `StyleLint` to work correctly.

Example:
```bash
cd web-application
pnpm i --ignore-workspace
```
