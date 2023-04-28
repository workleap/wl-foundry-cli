# Contributing to wl-foundry-cli

Thank you for considering contributing to wl-foundry-cli! This document outlines some guidelines and suggestions to help make the contribution process smooth and effective.

## New contributor guide

If you're new to the project and looking to contribute, welcome! Here are some resources to get started:

- [Project README](README.md): This file provides an overview of the project, its purpose, and how to install and use the wl-foundry-cli tool.
- [Issues](https://github.com/workleap/wl-foundry-cli/issues): Check out the list of open issues to find something to work on. If you have a new feature or bug to report, feel free to create a new issue.
- [Code of Conduct](CODE_OF_CONDUCT.md): We strive to maintain a welcoming and inclusive community, and ask that all contributors abide by our code of conduct.

## Getting started

### Issues

#### Create a new issue

If you spot a problem with the components, [search if an issue already exists](https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests#search-by-the-title-body-or-comments) on our [issues page](https://github.com/workleap/wl-foundry-cli/issues). If a related issue doesn't exist, you can [open a new issue](https://github.com/workleap/wl-foundry-cli/issues).

#### Solve an issue

Scan through our [existing issues](https://github.com/workleap/wl-foundry-cli/issues) to find one that interests you. As a general rule, we don’t assign issues to anyone. If you find an issue to work on, you are welcome to open a PR with a fix.

### Make Changes

#### Requirements

This tooling will be required for building and testing the project:
- [PNPM](https://pnpm.io/) 
- [Node.js](https://nodejs.org/en), the version need to be at least **v18**.

#### Make changes locally

1. Fork the repository: `git clone https://github.com/workleap/wl-foundry-cli.git`
2. Install dependencies: `pnpm install`
3. Build the code: `pnpm dev`
4. Test the code: `pnpm test`
5. Create a working branch and start with your changes!

### Commit your update

Commit the changes once you are happy with them.

Each commit message needs a title and a body. The title must contain a type, a target and a subject.

#### Type

The title type must be one of the following:

- **build**: Changes that affect the build system or external dependencies
- **chore**: Changes that don't affect the logic of the code (formatting, white spaces, missing semicolon)
- **ci**: Modifications targeting configuration files or CI scripts
- **docs**: Modifications to the documentation
- **feat**: For new component or new feature
- **fix**: Bug fix
- **refactor**: Changes to the code base that don't fix a bug or add feature
- **test**: Add missing tests or fix existing ones
- 
### Pull Request

When you're finished with the changes, create a pull request, also known as a PR.

- Run `pnpm changeset` and follow the steps to generate a changeset file (that needs to be committed with your PR).
- Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.

Once you submit your PR, a Workleap team member will review your proposal. We may ask questions or request for additional information.

- We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, checkout this [git tutorial](https://lab.github.com/githubtraining/managing-merge-conflicts) to help you resolve merge conflicts and other issues.

### Your PR is merged!

Congratulations :tada::tada: The Workleap team thanks you.






## Code conventions

We follow a few coding conventions to ensure consistency across the codebase. Here are some of the most important ones:

- Use two spaces for indentation
- Use single quotes for strings
- Use camelCase for variable and function names
- Use PascalCase for class names
- Always use strict equality (`===`) instead of loose equality (`==`)
- Add JSDoc comments to functions and classes

For a more detailed look at our coding conventions, check out the [style guide](https://github.com/wl-foundry/wl-foundry-cli/blob/main/STYLE_GUIDE.md).

Thank you again for contributing to wl-foundry-cli! We appreciate your time and effort, and look forward to reviewing your contributions.
