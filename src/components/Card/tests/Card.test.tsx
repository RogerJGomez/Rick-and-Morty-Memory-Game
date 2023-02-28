/* eslint-disable testing-library/prefer-screen-queries */
import Card from "..";
import { Character } from "../../../types";
import { render } from "@testing-library/react";
import BackgroundImage from "../../../assets/img/card.png";

const mockCard: Character = {
  name: "Rick Sanchez",
  species: "Human",
  status: "Alive",
  image: "photo.jpg",
};

describe("Card", () => {
  it("Should render the card name", async () => {
    const view = await render(<Card data={mockCard} flipped />);

    const characterName = await view.findByText("Rick Sanchez");
    expect(characterName).toBeInTheDocument();
  });

  it("Should have the card back", async () => {
    const view = await render(
      <Card data={mockCard} flipped onClick={jest.fn()} />
    );

    const card = view.getByAltText("card-back");
    await expect(card).toHaveAttribute("src", BackgroundImage);
  });
});
