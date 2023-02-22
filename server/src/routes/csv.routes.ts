import express, { Request, Response } from "express";
import { getCSV } from "../controllers/csv.controller";

const csvRouter = express.Router();

csvRouter.get(
  "/csv/generate",
  async (req: Request, res: Response) => await getCSV(req, res)
);

export default csvRouter;
