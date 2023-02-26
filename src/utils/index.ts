import { Character } from "../types";

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const shuffleArray = (array: Character[]): Character[] => {
  return array.sort((a, b) => 0.5 - Math.random());
};

export const sortByName = (characters: Character[]): Character[] => {
  return characters.sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  );
};
