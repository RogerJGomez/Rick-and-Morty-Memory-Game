import { gql } from "@apollo/client";

export const GET_CHARACTERTS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      results {
        name
        status
        species
        image
      }
    }
  }
`;
