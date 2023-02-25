import express from "express";
import csvRouter from "./routes/csv.routes";
import ingestRouter from "./routes/ingest.routes";
import providerRouter from "./routes/provider.routes";
import { Server } from "socket.io";

const PORT = 3000;
const app = express();

// socket io noise
const http = require("http");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    // depends on what your host url is
    // origin: "http://localhost:5173",
  },
});

app.use(express.json());

app.use("/api/v1/", csvRouter);
app.use("/api/v1/", ingestRouter(io));
app.use("/api/v1/", providerRouter);

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(PORT, () =>
  console.log(`station-inspector API listening on ${PORT}`)
);
