# @foundry-cli

## Packages

| Package           | Type        | Version                                                                                                                         |
| ----------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| @workleap/foundry | application | [![NPM Version](http://img.shields.io/npm/v/@workleap/foundry.svg?style=flat)](https://www.npmjs.org/package/@workleap/foundry) |
| create-workleap   | application | [![NPM Version](http://img.shields.io/npm/v/create-workleap.svg?style=flat)](https://www.npmjs.org/package/create-workleap)     |

## Usage

### Interactive

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

### Non-interactive

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

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
