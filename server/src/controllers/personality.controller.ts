import express from "express";
import { setPersonalityItems } from "../service/personality.service";

export const register = async (
  { body }: express.Request,
  res: express.Response
) => {
  const { data } = body;

  await setPersonalityItems(data);

  return res.status(201).json({ success: true });
};
