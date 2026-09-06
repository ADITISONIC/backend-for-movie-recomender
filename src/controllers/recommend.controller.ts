import type { Request, Response } from "express";
import { getMovieRecommendations, getStructuredRecommendations } from "../services/langchain.service.js";

export async function recommendMovies(req: Request, res: Response) {
  try {
    const {
      userPrompt = "Suggest movies for a rainy night",
      genre = "thriller",
      mood = "relaxed",
      count = 2,
    } = req.body;
    const result = await getStructuredRecommendations({
      userPrompt,
      genre,
      mood,
      count: Number(count),
    });
    res.json(result);
  } catch (error) {
    console.error(
      "Error occurred while fetching movie recommendations:",
      error,
    );
    res.status(500).json({ error: "Failed to fetch movie recommendations" });
  }
}
