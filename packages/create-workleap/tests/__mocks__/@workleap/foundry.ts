import {TemplateInterface} from "@workleap/foundry";
import {EventEmitter} from "events";

interface FoundryMock {
    Generator: () => {
        Run: () => Promise<void>;
        GeneratorEvent: EventEmitter;
        LoaderEvent: EventEmitter;
    }
    Templates: {
        [x: string]: TemplateInterface
    }
}

const foundryMock = jest.createMockFromModule<FoundryMock>("@workleap/foundry");

foundryMock.Templates = {
    "FakeTemplate": {
        options: [],
        repositoryUrl: "some/fake/url",
        description: "Use for test",
        action: jest.fn()
    }
}

foundryMock.Generator = jest.fn().mockImplementation(() => {
    return {
        Run: jest.fn(),
        LoaderEvent: {
            addListener: jest.fn()
        },
        GeneratorEvent: {
            addListener: jest.fn()
        }
    }
});

module.exports = foundryMock;