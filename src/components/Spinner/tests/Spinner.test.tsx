/* eslint-disable testing-library/prefer-screen-queries */
import Spinner from "..";
import { render } from "@testing-library/react";

describe("Spinner", () => {
  it("Should render the spinner", async () => {
    const view = await render(<Spinner />);

    const spinner = await view.findByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });
});
