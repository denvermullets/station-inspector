import { Request, Response } from "express";
import db from "../database/db";

export const getProviders = async (req: Request, res: Response) => {
  try {
    const providers = await db("providers").returning("*");

    return res.json(providers).status(200);
    // return res.json({ message: "file saved in server/files/downloads" });
  } catch (error) {
    return res.status(500).send(error);
  }
};
