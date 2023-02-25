import express, { Request, Response } from "express";
import { ingestCSV } from "../controllers/ingest.controller";
import multer from "multer";
import socketio from "socket.io";

const upload = multer({ dest: "./files/uploads/" });

const ingestRouter = express.Router();

export default (io: socketio.Server) => {
  ingestRouter.post(
    "/ingest",
    upload.single("file"),
    async (req: Request, res: Response) => await ingestCSV(req, res, io)
  );

  return ingestRouter;
};
