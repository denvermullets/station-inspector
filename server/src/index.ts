import express from "express";
import { Request, Response } from "express";
const PORT = 3000,

app = express();

app.get("/api/v1", (req: Request, res: Response) => {
  const response = {'hi':'this works'}
  res.send(response);
});

app.listen(PORT, () => console.log());
