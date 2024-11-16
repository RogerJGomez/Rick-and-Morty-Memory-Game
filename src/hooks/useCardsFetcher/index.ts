import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../../queries";
import { getRandomNumber, sortByName } from "../../utils";
import { useContext, useEffect, useState } from "react";
import { Character } from "../../types";
import AppContext from "../../context/appContext";

export const useCardsFetcher = () => {
  const [page, setPage] = useState<number>(1);
  const { setCharactersState } = useContext(AppContext);

  const { loading, error, data, refetch } = useQuery(GET_CHARACTERS, {
    variables: {
      page,
    },
  });

  useEffect(() => {
    setPage(getRandomNumber(1, 42));
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results } = data.characters;
    const slicedData = results.slice(0, 6);
    const cards = [...slicedData, ...slicedData] as Character[];

    setCharactersState(sortByName(cards));
  }, [data, setCharactersState]);

  return {
    loading,
    error,
    refetch,
  };
};
