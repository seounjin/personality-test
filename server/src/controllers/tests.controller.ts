import express from "express";

export const register = ({ body }: express.Request, res: express.Response) => {
  const { data } = body;
  console.log("req", data);
};
