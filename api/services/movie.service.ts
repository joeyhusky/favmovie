import { toMovieDTO, MovieDTO } from "../domain/movie.domain.ts";
import env from "../env.ts";

export async function searchMovie(key: string): Promise<MovieDTO[]> {
  const resp = await fetch(
    `${env.movideDbUrl}/search/movie?api_key=${env.movieDbKey}&query=${key}`
  );
  const data = await resp.json();
  return data["results"].map(toMovieDTO);
}

export async function getMovieDetails(id: string): Promise<MovieDTO> {
  const resp = await fetch(
    `${env.movideDbUrl}/movie/${id}?api_key=${env.movieDbKey}`
  );
  const data = await resp.json();
  return toMovieDTO(data);
}
