import { ChatGoogle } from "@langchain/google/node";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {ChatOpenAI} from '@langchain/openai'
import { RecommendationSchema } from "../schemas/movie.schema.js";



function getChatModel(){
  const provider = process.env.LLM_PROVIDER
  if (provider === "google"){
    return new ChatGoogle({
      model: "gemini-3.6-flash",
      temperature: 0.3,
    })
  }
  return new ChatOpenAI({
    model : process.env.OPENAI_MODEL || "gpt-4o-mini",
    temperature: 0.3
  })
}

const model = getChatModel()

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    `
    You are a movie recommendation expert.
    Return high-quality recommendations based :
    - user's request
    - genre
    - mood
    - count
    Every movie should feel intentional.
    Do not recommend only the most obvious titles every time.
    `,
    //system message = who the AI + how it should behave
    //sets the personality ans rules for the system
  ],
  [
    "human",
    `
    User request: {userPrompt}
    Preferences:
    - Genre: {genre}
    - Mood: {mood}
    - Number of movies: {count}`,
  ],
]);

export async function getMovieRecommendations(input: {
     userPrompt: string;
     genre: string;
     mood: string;
     count: number;
}) {
    const chain = promptTemplate.pipe(model)
    const response = await chain.invoke({
        userPrompt: input.userPrompt,
        genre: input.genre,
        mood: input.mood,
        count: input.count
    })
    console.log("Response from LangChain:", response);
    return response.text
}

const structureModel = model.withStructuredOutput(RecommendationSchema)

export async function getStructuredRecommendations(input: {
    userPrompt: string;
    genre: string;
    mood: string;
    count: number;
}) {
    const chain = promptTemplate.pipe(structureModel)
    const response = await chain.invoke({
        userPrompt: input.userPrompt,
        genre: input.genre,
        mood: input.mood,
        count: input.count
    })
    console.log("Structured Response from LangChain:", response);
    return response
  }