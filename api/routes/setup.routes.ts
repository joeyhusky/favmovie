import { Context, helpers, Router, Status } from "../deps.ts";
import { generateUUID, parseAndCoerceUUID, UUID } from "../domain/userId.ts";
import * as favsService from "../services/favs.service.ts";
import * as movieService from "../services/movie.service.ts";

function init({ request, response }: Context) {
  const id: UUID = request.headers.get("X-MID")
    ? parseAndCoerceUUID(request.headers.get("X-MID"))
    : generateUUID();
  const favs = favsService.getFavs(id);
  response.body = { id, favs };
}

export const initializeRoutes = new Router().get("/init", init);

async function search(ctx: Context) {
  const key = ctx.request.url.searchParams.get("key") ?? "";
  ctx.response.body = await movieService.searchMovie(key);
}

async function getDetails(ctx: Context) {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = await movieService.getMovieDetails(id);
}

async function addMovieToFavs(ctx: Context) {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const userId = parseAndCoerceUUID(ctx.request.headers.get("X-MID"));
  const body = ctx.request.body();
  if (body.type !== "json" || userId == null || id == null) {
    ctx.response.status = Status.BadRequest;
    return;
  }

  const value = await body.value;
  favsService.addToFavs(userId, id, value.comment);

  ctx.response.status = Status.OK;
}

function removeMovieFromFavs(ctx: Context) {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const userId = parseAndCoerceUUID(ctx.request.headers.get("X-MID"));
  if (userId == null || id == null) {
    ctx.response.status = Status.BadRequest;
    return;
  }

  favsService.removeFromFavs(userId, id);
  ctx.response.status = Status.OK;
}

export const setupRoutes = new Router()
  .get("/movies/search", search)
  .get("/movies/:id", getDetails)
  .post("/movies/:id/favs", addMovieToFavs)
  .delete("/movies/:id/favs", removeMovieFromFavs);
