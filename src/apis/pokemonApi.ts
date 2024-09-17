import { siteConfig } from "#/config/site";
import axios from "axios";
import { PokemonListSchema, PokemonDetailsSchema } from "#/schemas";
import { z } from "zod";

type PokemonList = z.infer<typeof PokemonListSchema>;
type PokemonDetails = z.infer<typeof PokemonDetailsSchema>;

export const fetchPokemonList = async ({
  pageParam = siteConfig.url,
}: {
  pageParam?: string;
}) => {
  return await fetchData<PokemonList>(pageParam, PokemonListSchema);
};

export const fetchPokemonDetails = async (url: string) => {
  return await fetchData<PokemonDetails>(url, PokemonDetailsSchema);
};

const fetchData = async <T>(url: string, schema: z.ZodSchema<T>) => {
  try {
    const { data } = await axios.get(url);
    return schema.parse(data);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw new Error(`Failed to fetch data from ${url}`);
  }
};
