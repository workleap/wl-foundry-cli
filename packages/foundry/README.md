# @workleap/foundry

This project is a non-interactive command-line tool that allows users to quickly create customized copies of a template stored in a Git repository. By specifying the desired values for text tokens within the template, users can easily generate new files that incorporate their own content and configurations. The tool streamlines the process of creating new projects based on an existing template, saving time and effort while ensuring consistency and accuracy.

See `@workleap/foundry --help`:

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
  generate-web-application [options]   use the web-application template
  help [command]                       display help for command
```

## Commands

### generate-host-application

Use the [host-application](https://github.com/workleap/wl-foundry-cli/tree/main/templates/host-application) template as a base to customize with these options:

| option                   | description                  | required |
|--------------------------|------------------------------|----------|
| --out-dir <string>       | where to create the template | ✔        |
| --package-scope <string> | package scope                | ✔        |
| -h, --help               | display help for command     |          |

### generate-remote-module

Use the [remote-module](https://github.com/workleap/wl-foundry-cli/tree/main/templates/remote-module) template as a base to customize with these options:

| option                  | description                  | required |
|-------------------------|------------------------------|----------|
| --out-dir <string>      | where to create the template | ✔        |
| --host-scope <string>   | host scope                   | ✔        |
| --package-name <string> | package name                 | ✔        |
| -h, --help              | display help for command     |          |

### generate-static-module

Use the [static-module](https://github.com/workleap/wl-foundry-cli/tree/main/templates/static-module) template as a base to customize with these options:

| option                  | description                  | required |
|-------------------------|------------------------------|----------|
| --out-dir <string>      | where to create the template | ✔        |
| --host-scope <string>   | host scope                   | ✔        |
| --package-name <string> | package name                 | ✔        |
| -h, --help              | display help for command     |          |

### generate-web-application

Use the [web-application](https://github.com/workleap/wl-foundry-cli/tree/main/templates/web-application) template as a base to customize with these options:

| option                  | description                                         | required |
|-------------------------|-----------------------------------------------------|----------|
| --out-dir <string>      | where to create the template                        | ✔        |
| --package-name <string> | package name                                        | ✔        |
| --provider <string>     | build provider (choices: "github", "azure", "none") | ✔        |
| --project-name <string> | project name                                        |          |
| -h, --help              | display help for command                            |          |

## Develop

During development, we are using `pnpm`, this is the recommended tooling.

To test locally your development version, without the need to rebuild and install it continually, use this command:

```cmd
pnpm dev
```

Then you can call the CLI as a global command from `foundry`.

Then to remove the link:

```cmd
pnpm unlink
```
