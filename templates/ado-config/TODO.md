# TODO : Azure DevOps Pipeline

Once you have created this template, to activate the pipeline in Azure DevOps, you will need to:

## Initial Setup

The first time you will be using Netlify in Azure DevOps, you will need to:

1. Create a new Azure DevOps service account.
    1. Set this account as a `Project Administrator`.
2. Log in with this account and create a new `Personal access token`.
    1. Set a relevant name, like `Netlify`.
    2. Set the `Packaging - Read` scope.
    3. Set the `Expiration` as long as possible. Put in place a reminder to renew it. when the token change, you will need to update all the Netlify projects.
    4. Set the `Code - Read & Write` scope.
    5. Click on `Create`.

## By project Setup

> The next steps will be easier if you are connected with the service account in Azure DevOps or a Private Browser window.

1. Connect to Netlify.
2. Click on `Sites > Add new site > Import an existing project`.
3. Click on `Deploy Azure DevOps`. During this step, you will see quickly a window that will ask you to connect to Azure DevOps (don't forget to connect with the service account) or if you are already connected, will close automatically.
4. Select the `organization` then the `repository`.
5. Fill out the form. Normally the information will look like this:
    1. **Team**: \<your Netlify team\>
    2. **Branch**: `main`
    3. **Base directory**: \<path to your project package.json file in your repository\> (empty if the package.json file is at the root of your repository)
    4. **Build command**: `pnpm build`
    5. **Publish directory**: `dist`
    6. **Function directory**: \<Empty\>
6. Click on `Deploy <your repo name>` button.
7. Click on `Site Configuration > Build & deploy > Deploy notifications > Add notification > Azure DevOps pull request comment`.
    1. **Event to listen for**: `Deploy Preview started`
    2. **Personal access token**: \<your service account personal access token\>
    3. **Custom context message (optional)**: \<Empty\>
    4. Click on `Save`.
    5. Do it again for `Deploy Preview succeeded` and `Deploy Preview failed`.
8. From there everything should be automatic.

> It is also possible to accomplish part of the steps above using the `Netlify CLI` using the `netlify init` command. However, it is not possible to set the `Azure DevOps pull request comment` notification using the CLI.
