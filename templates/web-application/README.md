# {{PACKAGE-NAME}}

> Your web-application information go here

## Scripts

### dev

Start a development server at the address [http://localhost:8080](http://localhost:8080).

```bash
pnpm dev
```

### build

Build {{PACKAGE-NAME}} as production ready and output the result in `dist`;

```bash
pnpm build
```

### test

Run the tests on the sections of {{PACKAGE-NAME}}.

```bash
pnpm test
```

### serve-build

Run a local server on the content of the `dist` folder at the address [http://localhost:8080](http://localhost:8080).

```bash
pnpm serve-build
```

### reset

Delete all build results and `pnpm` installed packages in this project.

```bash
pnpm reset
```

Run linting on {{PACKAGE-NAME}} files.

### lint

```bash
pnpm lint
```

### storybook

Runs storybook at the address [http://localhost:6006](http://localhost:6006).

```bash
pnpm storybook
```

### chromatic

This requires a [Chromatic](https://www.chromatic.com/) account and a Chromatic token in the `CHROMATIC_TOKEN` environment variable.
Make sure to also specify the `CHROMATIC_PROJECT_TOKEN` either in an environment variable or via the `--project-token` CLI flag.

```bash
pnpm chromatic
```
### analyze

Run Webpack with bundle analyzer on the result of a production-ready build.

To learn how to analyze the result, you can look at [this article](https://blog.jakoblind.no/webpack-bundle-analyzer/#what-should-i-look-for-in-the-reports).

```bash
pnpm analyze
```

---
Build with [wl-foundry-cli](https://github.com/workleap/wl-foundry-cli) from [web-application template](https://github.com/workleap/wl-foundry-cli/tree/main/templates/web-application) 🚀
