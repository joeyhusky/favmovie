import { Context, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { uid } from "https://deno.land/x/usid@2.0.0/mod.ts";
import * as favsService from "../services/favs.service.ts";
import * as movieService from "../services/movie.service.ts";

function init({ request, response }: Context) {
  const id = request.headers.get("X-MID") ?? uid();
  const favs = favsService.getFavs(id);
  response.body = { id, favs };
}

export const initializeRoutes = new Router().get("/init", init);

async function search(ctx: Context) {
  const key = ctx.request.url.searchParams.get("key") ?? "";
  ctx.response.body = await movieService.searchMovie(key);
}

export const setupRoutes = new Router().get("/movies/search", search);
// .get("/movies/:id", getDetails)
// .post("/movies/:id/favs", addMovieToFavs)
// .delete("/movies/:id/favs", removeMovieFromFavs));
