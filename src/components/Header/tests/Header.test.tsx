/* eslint-disable testing-library/prefer-screen-queries */
import Header from "..";
import { render } from "@testing-library/react";

describe("Header", () => {
  it("Should render the header with the correct subtitle and logo", async () => {
    const view = await render(<Header />);

    const header = await view.findByTestId("header");
    const subtitle = await view.findByText("Juego de memoria");
    const logo = view.getByAltText("logo");

    expect(header).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });
});
