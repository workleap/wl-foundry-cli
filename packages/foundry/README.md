# @workleap/foundry

A CLI to create new Workleap projects non-interactively. See `@workleap/foundry --help`:

```cmd
Usage: @workleap/foundry [options] [command]

Foundry-CLI generator module

Options:
  -v, --version                        output the version number
  -h, --help                           display help for command

Commands:
  generate-host-application [options]  use the host-application template
  generate-remote-module [options]     use the remote-module template
  generate-static-module [options]     use the static-module template
  help [command]                       display help for command
```

## Commands

### generate-host-application

Add and render the template
from [host-application](https://github.com/workleap/wl-foundry-cli/tree/main/templates/host-application).

| option                   | description                  | required |
|--------------------------|------------------------------|----------|
| -o, --out-dir <string>   | where to create the template |          |
| --package-scope <string> | package scope                | ✔        |
| -h, --help               | display help for command     |          |

### generate-remote-module

Add and render the template
from [remote-module](https://github.com/workleap/wl-foundry-cli/tree/main/templates/remote-module).

| option                 | description                  | required |
|------------------------|------------------------------|----------|
| -o, --out-dir <string> | where to create the template |          |
| --host-scope <string>  | host scope                   | ✔        |
| -h, --help             | display help for command     |          |

### generate-static-module

Add and render the template
from [static-module](https://github.com/workleap/wl-foundry-cli/tree/main/templates/static-module).

| option                 | description                  | required |
|------------------------|------------------------------|----------|
| -o, --out-dir <string> | where to create the template |          |
| --host-scope <string>  | host scope                   | ✔        |
| -h, --help             | display help for command     |          |

## Develop

During development, we are using `pnpm`, this is the recommended tooling.

To test locally your development version, without need the need to rebuild it and install it continually, use this
command:

```cmd
# first compile the TypeScript to JS
pnpm build
# then link the bin globally
pnpm link --global
```

Then you can call the CLI as a global command from `foundry`.

Then to remove the link:

```
pnpm unlink
```
