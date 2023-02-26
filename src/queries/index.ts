import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql(/* GraphQL */ `
  query GetCharacters($page: Int) {
    characters(page: $page) {
      results {
        name
        status
        species
        image
      }
    }
  }
`);
