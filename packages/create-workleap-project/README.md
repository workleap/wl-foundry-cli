# Create-Workleap-Project

A CLI to create new Workleap projects using prompts and your favourite package manager `create` command.

## Interactive

You can create a new project interactively by running:

```cmd
npm create workleap-project@latest <output-directory>
# or
npx create-workleap-project@latest <output-directory>
# or
yarn create workleap-project@latest <output-directory>
# or
pnpm create workleap-project@latest <output-directory>
```

After simply follow the prompts.

## Develop

During development, we are using `pnpm`, this is the recommended tooling.

To test locally your development version, without the need to rebuild and install it continually, use this command:

```cmd
pnpm dev
```

Then you can call the CLI as a global command from `create-workleap-project`.

Then to remove the link:

```cmd
pnpm unlink
```
