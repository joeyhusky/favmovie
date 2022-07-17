import { UUID } from "../domain/userId.ts";

interface FavEntry {
  movieId: string;
  comment: string;
}

const FAVS = new Map<UUID, FavEntry[]>();

export function getFavs(userId: UUID): FavEntry[] {
  return FAVS.get(userId) ?? [];
}

export function addToFavs(userId: UUID, movieId: string, comment = "") {
  if (!FAVS.has(userId)) {
    FAVS.set(userId, []);
  }

  removeFromFavs(userId, movieId);
  FAVS.get(userId)!.push({ movieId, comment });
}

export function removeFromFavs(memberId: UUID, movieId: string) {
  if (FAVS.has(memberId)) {
    FAVS.set(
      memberId,
      FAVS.get(memberId)!.filter((entry) => entry.movieId !== movieId)
    );
  }
}
