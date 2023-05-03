import { render, screen } from "@testing-library/react";

import { Loading } from "./Loading.tsx";

it("Default text is \"Loading...\"", async () => {
    render(<Loading />);

    const element = await screen.getByText("Loading...");

    expect(element).not.toBeNull();
});

it("Text can be overrided", async () => {
    render(<Loading message="Processing..." />);

    const element = await screen.getByText("Processing...");

    expect(element).not.toBeNull();
});