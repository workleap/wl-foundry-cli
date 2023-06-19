# TODO : Azure DevOps Pipeline

Once you have created this template, to activate the pipeline in Azure DevOps, you will need to:

1. Validate that a variable group name `CloudflarePages` exists in the Azure DevOps project.
   1. Go to `Pipelines > Library`. From there you can create or edit the variable group `CloudflarePages`.
   2. Add the following variables (more details on how to get the values [here](https://developers.cloudflare.com/workers/wrangler/ci-cd/)):
      1. `CLOUDFLARE_ACCOUNT_ID` : the Cloudflare account ID. Must be set as `secret`.
      2. `CLOUDFLARE_API_TOKEN` : the Cloudflare API token. Must be set as `secret`.
2. For the pipeline to work, you also need to install the extension `PR Messenger` in your Azure DevOps organization.
   1. Install the extension `PR Messenger` from the [marketplace](https://marketplace.visualstudio.com/items?itemName=Workleap.pr-messenger).
   2. Give your build user the right to comment on pull requests. `Project Settings > Repositories > Security > <your project> Build Service (<your organisation>) > Contribute to pull requests > Allow > Save`.
3. Push this to an Azure DevOps repository.
4. Add the pipeline to your Azure DevOps project.
   1. In Azure DevOps, go to `Pipelines > Pipelines` and click on `New pipeline`.
   2. Select `Azure Repos Git` as the source.
   3. Select the repository you just pushed.
   4. Select `Existing Azure Pipelines YAML file`.
   5. Select `main` as the branch.
   6. Select `/.ado/pipelines/build.yml` as the path.
   7. Click on `Continue`.
   8. Click on `Save` to save the pipeline.
   9. Click on `Rename/move` to rename the pipeline to something more useful.
5. Add the branch policy to your Azure DevOps project.
   1. In Azure DevOps, go to `Repos > Branches`.
   2. Click on the `...` next to `main` and select `Branch policies`.
   3. Select `Policies`.
   4. Enable `Require a minimum number of reviewers`.
      1. Set the number of reviewers to `2`.
      2. Check `When new changes are pushed`.
         1. Select `Reset all approval votes (does not reset votes to reject or wait)`.
   5. Enable `Check for comment resolution`
      1. Select `Required`
   6. Enable `Limit merge types`
      1. Only check `Squash merge`.
   7. Enable `Build Validation`.
      1. Select the pipeline you just created.
      2. For `Trigger` select `Automatic`.
      3. For `Policy requirement` select `Required`.
      4. For `Build expiration` select `24 hours`.
6. Your CI/CD pipeline is now ready to be used. You can now delete this file.
