import express from "express";
import csvRouter from "./routes/csv.routes";
import ingestRouter from "./routes/ingest.routes";

const PORT = 3000;
const app = express();

app.use(express.json());

app.use("/api/v1/", csvRouter);
app.use("/api/v1/", ingestRouter);

app.listen(PORT, () =>
  console.log(`station-inspector API listening on ${PORT}`)
);
