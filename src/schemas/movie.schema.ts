import { z } from "zod";

export const MovieSchema = z.object({
  title: z.string().describe("Movie title"),
  year: z.number().describe("Release year "),
  genre: z.array(z.string()).describe("List of genres"),
  cast: z.array(z.string()).describe("Top 3 cast members"),
  reason : z.string().describe("Reason for recommendation"),
  rating: z.number().min(1).max(10).describe("IMDB style of rating out of 10")
});


export const RecommendationSchema  = z.object({
    movies: z.array(MovieSchema).describe("List of recommended movies")
})


export type Movie = z.infer<typeof MovieSchema>

export type Recommendation = z.infer<typeof RecommendationSchema>