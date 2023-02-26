import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../../queries";
import { getRandomNumber, sortByName } from "../../utils";
import { useContext, useEffect, useMemo, useState } from "react";
import { Character } from "../../types";
import AppContext from "../../context/appContext";
import { useLocation } from "react-router-dom";

export const useCardsFetcher = () => {
  const [page, setPage] = useState<number>(1);
  const { characters, points, setCharactersState } = useContext(AppContext);
  const location = useLocation();
  const skipFetching = useMemo((): boolean => {
    return (
      (location.pathname.includes("/game") && points === 6) ||
      (location.pathname.includes("/game") &&
        points !== 6 &&
        characters.length !== 0)
    );
  }, [characters.length, location.pathname, points]);

  const { loading, error, data, refetch } = useQuery(GET_CHARACTERS, {
    variables: {
      page,
    },
    skip: skipFetching,
  });

  useEffect(() => {
    setPage(getRandomNumber(0, 42));
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
