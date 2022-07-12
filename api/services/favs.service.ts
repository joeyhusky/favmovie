interface FavEntry {
  movideId: number;
  comment: string;
}

const FAVS: Record<string, FavEntry[]> = {};

export function getFavs(memberId: string): FavEntry[] {
  return FAVS[memberId] || [];
}
