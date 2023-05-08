import { render, screen } from "@testing-library/react";

import { TheAnswer } from "./TheAnswer.tsx";

it("The answer mus been known", async () => {
    render(<TheAnswer />);

    const element = screen.getByText("42");

    expect(element).not.toBeNull();
});
