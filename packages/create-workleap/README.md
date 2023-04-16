# Create-Workleap

A CLI to create new Workleap projects using prompts and your favorite package manager `create` command.

## Interactive

You can create a new project interactively by running:

```cmd
npm create workleap@latest <output-directory>
# or
npx create-workleap@latest <output-directory>
# or
yarn create workleap@latest <output-directory>
# or
pnpm create workleap@latest <output-directory>
```

After simply follow the prompts.

## Develop

During development, we are using `pnpm`, this is the recommended tooling.

To test locally your development version, without need the need to rebuild it and install continually, use this command:

```cmd
# first compile the TypeScript to JS
tsc
# then link the bin globally
pnpm link --global
```

Then you can call the CLI as a global command from `create-workleap`.

Then to remove the link:

```
pnpm unlink
```
