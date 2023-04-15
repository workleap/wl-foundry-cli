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

## Non-interactive

Using `@workleap/foundry`, you can also pass command line arguments to set up a new project non-interactively.
See `@workleap/foundry --help`:

```cmd
Usage: @workleap/foundry [options] [command]

Foundry-CLI generator module

Options:
  -V, --version               output the version number
  -h, --help                  display help for command

Commands:
  host-application [options]  use the host-application template
  remote-module [options]     use the remote-module template
  static-module [options]     use the static-module template
  help [command]              display help for command
```

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
