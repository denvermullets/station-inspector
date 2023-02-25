import express from "express";
import csvRouter from "./routes/csv.routes";
import ingestRouter from "./routes/ingest.routes";
import providerRouter from "./routes/provider.routes";

const PORT = 3000;
const app = express();

app.use(express.json());

app.use("/api/v1/", csvRouter);
app.use("/api/v1/", ingestRouter);
app.use("/api/v1/", providerRouter);

app.listen(PORT, () =>
  console.log(`station-inspector API listening on ${PORT}`)
);
