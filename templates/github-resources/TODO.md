# TODO : GitHub Actions

Once you have created this template, to activate the pipeline in GitHub, you will need to:

1. Validate that a variable group name `CloudflarePages` exists in the GitHub repository.
   1. Go to `Settings > Secrets and variables > Actions > Secrets`. From there you can create or edit the variables `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`. The values can be found [following this method](https://developers.cloudflare.com/workers/wrangler/ci-cd/).
2. Push this to a GitHub repository.
3. Your CI/CD pipeline is now ready to be used. You can now delete this file.
