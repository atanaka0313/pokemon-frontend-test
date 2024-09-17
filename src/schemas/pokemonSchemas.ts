import { z } from "zod";

// schema for individual Pokémon result
const PokemonResultSchema = z.object({
  name: z.string(),
  url: z.string(),
});

// schema for Pokémon list response
export const PokemonListSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(PokemonResultSchema),
});

// schema for Pokémon details response
export const PokemonDetailsSchema = z.object({
  id: z.number(),
  sprites: z.object({
    front_default: z.string().nullable(),
  }),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
      }),
    }),
  ),
  weight: z.number(),
  height: z.number(),
  base_experience: z.number(),
});
