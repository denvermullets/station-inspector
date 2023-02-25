import express, { Request, Response } from "express";
import { getProviders } from "../controllers/provider.controller";

const providerRouter = express.Router();

providerRouter.get(
  "/providers",
  async (req: Request, res: Response) => await getProviders(req, res)
);

export default providerRouter;
