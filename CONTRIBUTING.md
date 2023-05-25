# Contributing

The following documentation is only for the maintainers of this repository.

- [Monorepo setup](#monorepo-setup)
- [Project overview](#project-overview)
- [Installation](#installation)
- [Develop the CLI packages](#Develop-the-CLI-packages)
- [Release the packages](#release-the-packages)
- [Available commands](#commands)
- [CI](#ci)
- [Add a new package to the monorepo](#add-a-new-package-to-the-monorepo)

## Monorepo setup

This repository is managed as a monorepo with [PNPM workspace](https://pnpm.io/workspaces) to handle the installation of the npm dependencies and manage the packages interdependencies.

It's important to note that PNPM workspace doesn't hoist the npm dependencies at the root of the workspace as most package manager does. Instead, it uses an advanced [symlinked node_modules structure](https://pnpm.io/symlinked-node-modules-structure). This means that you'll find a `node_modules` directory inside the packages folders as well as at the root of the repository.

The main difference to account for is that the `devDependencies` must now be installed locally in every package `package.json` file rather than in the root `package.json` file.

## Project overview

This project is split into two major sections, [packages/](packages/) and [templates/](templates/).

### Packages

Under [packages/](packages/) we have two tools that are deployed on [NPM](https://www.npmjs.com/).

[@workleap/create-project](packages/create-project/) is a prompt that will call `@workleap/foundry` once each question is answered. It can be called using `npm create @worklead/project` and will prompt the user about template information. It will then call `@workleap/foundry`, using `npx`. More information about this project can be read from [the project README](packages/create-project/README.md).

[@workleap/foundry](packages/foundry/) is a basic CLI. It can be called using `npx @workleap/foundry`, or `foundry` if installed globally. This tool, depending on the command used, will clone the requested template (from the main `/templates` folder) using [degit](https://github.com/Rich-Harris/degit) and apply transformation in files by replacing tokens with the option provided when calling it. More information about this project can be read from [the project README](packages/foundry/README.md).

### Templates

Under [templates/](templates/), are the templates that the `@workleap/foundry` command will clone from. `@workleap/foundry` will always clone the latest version of a template from the `main` branch.

## Installation

This project uses PNPM, therefore, you must [install PNPM](https://pnpm.io/installation):

To install the project, open a terminal at the root of the workspace and execute the following command:

```bash
pnpm install
```

## Develop the CLI packages

The following documentation is a brief overview of the tools and processes involved in the development of the CLI packages.

> To develop for each package, you can either run `pnpm dev` from the project root folder. This will build all the content of the `packages` folder.
> 
> You can also individually run the command `pnpm dev` from a project folder (example `packages/foundry/`). This will only start the automatic build and link the tool to be called from the terminal.

### Working in `@workleap/create-project`

This package can be found under the folder [packages/create-project](packages/create-project/).

To build it for development, from the folder, run `pnpm dev`. This will build the project in development mode and link the binary locally. Once done, you will be able to run it from a terminal by using the `create-project` command. For example: `create-project hello` ; will start a prompt about creating a template in the `hello` folder.

When the package is built from the `pnpm dev` command, you can attach a debugger and debug directly from the TypeScript files.

### Working in `@workleap/foundry`

This package can be found under the folder [packages/foundry](packages/foundry/).

To build it for development, from the folder, run `pnpm dev`. This will build the project in development mode and link the binary locally. Once done, you will be able to run it from a terminal by using the `foundry` command. For example: `foundry --help` ; will show the help in the terminal.

When the package is built from the `pnpm dev` command, you can attach a debugger and debug directly from the TypeScript files.

### Working with Storybook in `templates`

First, navigate to the folder of the template you want to work with a command line tool. After, run the command `pnpm install --ignore-workspace` to locally install all the dependencies needed.

You will also want to configure MSW for local testing, without affecting the template. `pnpm dlx msw init public` will automatically generate the `generatedServiceWorker.js` file in the `public` folder.

To start the Storybook server, run `pnpm storybook`. This will start the Storybook server and will allow you to see the components in action.

### Linting

To lint the packages, call `pnpm lint` from the project root folder.

### Testing

To run the automated tests, call `pnpm test`. The tests are run using [Jest](https://jestjs.io/) and the result will be displayed on the terminal.

To run manual tests, call `pnpm dev`, then you will have access to the `create-project` and `foundry` commands from a terminal.

### Done developing

#### Method 1:

You can unlink the CLI packages from their folder (`packages/create-project` and `packages/foundry`) by using `pnpm unlink` 

#### Method 2:

By deleting the files `create-project`, `create-project.*`, `foundry` and `foundry.*` from `%LOCALAPPDATA%\pnpm`;

Example in PowerShell:
```ps1
cd $env:LOCALAPPDATA\pnpm
rm .\create-project .\create-project.CMD .\create-project.ps1 .\foundry .\foundry.CMD .\foundry.ps1
```

## Release the packages

When you are ready to release the packages, you must follow the following steps:
1. Run `pnpm changeset` and follow the prompt. For versioning, always follow the [SemVer standard](https://semver.org/).
2. Commit the newly generated file in your branch and submit a new Pull Request(PR). Changesets will automatically detect the changes and post a message in your pull request telling you that once the PR closes, the versions will be released.
3. Find someone to review your PR.
4. Merge the Pull request into `main`. A GitHub action will automatically trigger and update the version of the packages and publish them to [npm]https://www.npmjs.com/). A tag will also be created on GitHub tagging your PR merge commit.

### Troubleshooting

#### Github

Make sure you're Git is clean (No pending changes).

#### npm

Make sure GitHub Action has **write access** to the selected npm packages.

#### Compilation

If the packages failed to compile, it's easier to debug without executing the full release flow every time. To do so, instead, execute the following command:

```bash
pnpm build
```

By default, packages compilation output will be in their respective *dist* directory.

#### Linting errors

If you got linting error, most of the time, they can be fixed automatically using `eslint . --fix`, if not, follow the report provided by `pnpm lint`.

## Commands

From the project root, you have access to many commands, the main ones are:

### dev

Build the packages for development and link them to be called from the local terminal.

```bash
pnpm dev
```

### build

Build the packages for release.

```bash
pnpm build
```

### test

Run the packages unit tests.

```bash
pnpm test
```

### lint

Lint the packages files.

```bash
pnpm lint
```

### changeset

To use when you want to publish a new package version. Will display a prompt to fill in the information about your new release.

```bash
pnpm changeset
```

### clean

Clean the packages (delete `dist` folders, clear caches, etc..)

```bash
pnpm clean
```

### reset

Reset the monorepo installation (delete `dist` folders, clear caches, delete `node_modules` folders, etc..)

```bash
pnpm reset
```

## CI

We use [GitHub Actions](https://github.com/features/actions) for this repository.

The configuration is in the `.github/workflows` folder and the build results available [here](https://github.com/workleap/wl-foundry-cli/actions).

We currently have 2 builds configured:

### Changesets

This build run on a push on the `main` branch, and if theirs a file present in the `.changeset` folder, will publish the new package version on npm.

### CI

This build will trigger when a commit is done in a PR to `main` or after a push to `main` and will run `build`, `lint-ci` and `test` commands on the source code.

## Add a new package to the monorepo

There are a few steps to add new packages to the monorepo.

Before you add a new package, please read the [GSoft GitHub guidelines](https://github.com/gsoft-inc/github-guidelines#npm-package-name).

### Create the package

First, create a new folder matching the package name in the [packages](/packages) folder.

Open a terminal, navigate to the newly created folder, and execute the following command:

```bash
pnpm init
```

Answer the CLI questions.

Once the `package.json` file is generated, please read again the [GSoft GitHub guidelines](https://github.com/gsoft-inc/github-guidelines#npm-package-name) and make sure the package name, author and license are valid.

Don't forget to add the [npm scope](https://docs.npmjs.com/about-scopes) `"@workleap"` before the package name. For example, if the project name is "foo", your package name should be `@workleap/foo`.

Make sure the package publish access is *public* by adding the following to the `package.json` file:

```json
{
  "publishConfig": {
    "access": "public"
  }
}
```

### Dependencies

npm *dependencies* and *peerDependencies* must be added to the package own *package.json* file.
