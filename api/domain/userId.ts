import { uid } from "../deps.ts";

export type UUID = string & { __uuid: true };

export const generateUUID = (): UUID => {
  return uid() as UUID;
};

export const parseAndCoerceUUID = (id: string | null): UUID => {
  return id as UUID;
};
