import type { Meta, StoryObj } from "@storybook/react";

import { RootErrorBoundary } from "./RootRoutingErrorBoundary.tsx";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: "Example/RootErrorBoundary",
    component: RootErrorBoundary,
    tags: ["autodocs"]
} satisfies Meta<typeof RootErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    args: {
        message: "This is an error message"
    }
};
