/* eslint-disable testing-library/prefer-screen-queries */
import Layout from "..";
import { render } from "@testing-library/react";

describe("Layout", () => {
  it("Should render the layout with it's children", async () => {
    const view = await render(
      <Layout>
        <div>Test Layout</div>
      </Layout>
    );

    const layout = await view.findByTestId("layout");
    const child = await view.findByTestId("child");
    expect(layout).toContainElement(child);
  });
});
