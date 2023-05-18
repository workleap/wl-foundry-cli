import browserslist from "browserslist";
import { merge } from "lodash-es";

// If no browserslist file path is specified, it will search for a local ".browserslistrc" file.
export async function loadSwcConfig(swcConfig, { browserslistFilePath } = {}) {
    const browsers = browserslist(undefined, {
        path: browserslistFilePath
    });

    return merge(swcConfig, {
        env: {
            targets: browsers
        }
    });
}
