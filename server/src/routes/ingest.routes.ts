import express, { Request, Response } from "express";
import { ingestCSV } from "../controllers/ingest.controller";
import multer from "multer";

const upload = multer({ dest: "./files/uploads/" });

const ingestRouter = express.Router();

ingestRouter.post(
  "/ingest",
  upload.single("file"),
  async (req: Request, res: Response) => await ingestCSV(req, res)
);

export default ingestRouter;
