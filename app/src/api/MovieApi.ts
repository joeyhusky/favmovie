import { apiPath } from "../env";

export async function search(key: string) {
  const path = `${apiPath}/movies/search?`;
  return fetch(path + new URLSearchParams({ key }));
}
