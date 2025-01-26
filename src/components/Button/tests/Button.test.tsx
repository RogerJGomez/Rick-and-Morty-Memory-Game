/* eslint-disable testing-library/prefer-screen-queries */
import Button, { ButtonType } from "..";
import { render } from "@testing-library/react";

describe("Button", () => {
  it("Should render the button with the correct text", async () => {
    const view = await render(
      <Button text="Play again" type={ButtonType.primary} />
    );

    const button = await view.findByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Play again");
  });

  it("Should have the secondary color", async () => {
    const view = await render(
      <Button text="Play" type={ButtonType.secondary} />
    );

    const button = await view.findByTestId("button");
    expect(button).toHaveClass("secondary");
  });
});
