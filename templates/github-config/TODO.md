# TODO : GitHub Actions

Once you have created this template, to activate the pipeline in GitHub, you will need to:

## Initial Setup

The first time you will be using Netlify in GitHub, you will need to:

1. Create a new GitHub service account.
    1. Set this account as a `Collaborator`.
2. Allow Netlify to access your GitHub account. This will be requested on your first project setup.

## By project Setup

1. Connect to Netlify.
2. Click on `Sites > Add new site > Import an existing project`.
3. Click on `Deploy GitHub`. During this step, you will see quickly a window that will ask you to connect to GitHub or if you are already connected, will close automatically.
4. Select the `organization` then the `repository`.
5. Fill out the form. Normally the information will look like this:
    1. **Team**: \<your Netlify team\>
    2. **Branch**: `main`
    3. **Base directory**: \<path to your project package.json file in your repository\> (empty if the package.json file is at the root of your repository)
    4. **Build command**: `pnpm build`
    5. **Publish directory**: `dist`
    6. **Function directory**: \<Empty\>
6. Click on `Deploy <your repo name>` button.
7. From there everything should be automatic.

> It is also possible to accomplish part of the steps above using the `Netlify CLI` using the `netlify init` command.
