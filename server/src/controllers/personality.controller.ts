import express, { Response } from "express";
import {
  setPersonalityItems,
  getAllPersonalityItems,
} from "../service/personality.service";

export const setPersonality = async (
  { body }: express.Request,
  res: express.Response
): Promise<Response> => {
  const { data } = body;

  await setPersonalityItems(data);

  return res.status(201).json({ success: true });
};

export const getPersonality = async (
  _req: express.Request,
  res: express.Response
): Promise<Response> => {
  const data = await getAllPersonalityItems();
  return res.status(200).json({ data: data });
};
