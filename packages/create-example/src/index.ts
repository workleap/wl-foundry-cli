import {Option, Prompt, Spinner} from "@foundry-cli/prompts";
import * as process from "process";
import {Loader} from "@foundry-cli/loader";
import {Generator, ReplaceInFile} from "@foundry-cli/generator";

interface Configuration {
    name: string,
    template: string,
    projectDirectory: string
}

export class CreateExample {
    private static readonly DEFAULT_PROJECT_NAME: string = "my-new-project";
    private static readonly NAME_PARAMETER_POSITION: number = 2; // TODO validate position of parameter once ask with `pnpm create`

    private readonly prompt: Prompt;
    private readonly loaderSpinner: Spinner;
    private readonly generatorSpinner: Spinner;
    private readonly generator: Generator;

    constructor() {
        this.prompt = new Prompt("create-example");
        this.loaderSpinner = new Spinner("Getting the template...");
        this.generatorSpinner = new Spinner("Template configuration...");
        this.generator = new Generator();

        console.dir(process.argv);
    }

    async Run(): Promise<void> {
        const config = await this.Configure();

        await this.Load(config);

        await this.Generate(config);

        this.prompt.Outro("That's it for the demo!")
    }

    private async Configure(): Promise<Configuration> {
        const availableTemplates: Option<string>[] = [
            {value: "Workleap/host-application", label: "Host Application"},
            {value: "Workleap/remote-module", label: "Remote Module"},
            {value: "Workleap/static-module", label: "Static Module"}
        ];

        const projectNameFromArgument: string = process.argv[CreateExample.NAME_PARAMETER_POSITION];

        return {
            name: projectNameFromArgument ?? await this.prompt.Text("How should we name the project?", CreateExample.DEFAULT_PROJECT_NAME, CreateExample.DEFAULT_PROJECT_NAME),
            template: await this.prompt.Select<string>("Select the template to download", availableTemplates),
            projectDirectory: await this.prompt.Text("Where do you want the project?", process.cwd(), process.cwd())
        };
    }

    private async Load(config: Configuration): Promise<void> {
        this.loaderSpinner.Start();

        const loader: Loader = new Loader(config.template);
        await loader.Clone(config.projectDirectory)

        this.loaderSpinner.Stop();
    }

    private async Generate(config: Configuration): Promise<void> {
        this.generatorSpinner.Start();

        const tasks: ReplaceInFile[] = [
            {
                src: "package.json",
                patterns: [
                    {from: /b/, to: "bee"},
                    {from: /"name": ".*"/, to: `"name": "${config.name}"`}
                ]
            }
        ];

        await this.generator.Run(tasks);

        this.generatorSpinner.Start();
    }
}