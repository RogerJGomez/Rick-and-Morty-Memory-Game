/* eslint-disable testing-library/prefer-screen-queries */
import Button, { ButtonType } from "..";
import { render } from "@testing-library/react";

describe("Button", () => {
  it("Should render the button with the correct text", async () => {
    const view = await render(
      <Button text="Jugar de nuevo" type={ButtonType.primary} />
    );

    const button = await view.findByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Jugar de nuevo");
  });

  it("Should have the secondary color", async () => {
    const view = await render(
      <Button text="Jugar" type={ButtonType.secondary} />
    );

    const button = await view.findByTestId("button");
    expect(button).toHaveClass("secondary");
  });
});
