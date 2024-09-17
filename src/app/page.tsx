"use client";

import useFetchPokemonList from "#/hooks/useFetchPokemonList";
import { PokemonCard } from "#/components/PokemonCard";
import { SkeletonCardGroup } from "#/components/Skeletons";

export default function Home() {
  const {
    pokemonDetails,
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchPokemonList();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    if (isAtBottom && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div
      className="mx-auto h-screen overflow-y-auto bg-[#393C41] py-4"
      onScroll={handleScroll}
    >
      <header className="p-8">
        <h1 className="mb-4 text-center text-4xl font-bold text-white">
          Pokémon Cards
        </h1>
      </header>

      <main className="grid grid-cols-1 place-items-center gap-4 px-4 sm:px-8 md:grid-cols-2 md:px-12 lg:grid-cols-3 lg:px-20 xl:grid-cols-4">
        {isFetching || isFetchingNextPage ? (
          <SkeletonCardGroup count={10} />
        ) : (
          data?.pages.flatMap((page) =>
            page.results.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                image={pokemonDetails[pokemon.name]?.sprites?.front_default}
                types={pokemonDetails[pokemon.name]?.types}
                weight={pokemonDetails[pokemon.name]?.weight}
                height={pokemonDetails[pokemon.name]?.height}
                experience={pokemonDetails[pokemon.name]?.base_experience}
              />
            )),
          )
        )}
      </main>
    </div>
  );
}
