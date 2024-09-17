import { siteConfig } from "#/config/site";
import { fetchPokemonDetails, fetchPokemonList } from "#/apis/pokemonApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useFetchPokemonList = () => {
  const [pokemonDetails, setPokemonDetails] = useState<{ [key: string]: any }>({});

  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: fetchPokemonList,
    initialPageParam: siteConfig.url,
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  useEffect(() => {
    if (data) {
      data.pages.forEach((page) => {
        page.results.forEach((pokemon) => {
          if (!pokemonDetails[pokemon.name]) {
            fetchPokemonDetailsWithDelay(pokemon);
          }
        });
      });
    }
  }, [data]);

  const fetchPokemonDetailsWithDelay = async (pokemon: { name: string; url: string }) => {
    const details = await fetchPokemonDetails(pokemon.url);
    setPokemonDetails((prev) => ({
      ...prev,
      [pokemon.name]: details,
    }));
  };

  return {
    pokemonDetails,
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useFetchPokemonList;
