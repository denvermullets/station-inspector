import { Request, Response } from "express";
import fs from "fs";
import csv from "csv-parser";
import { addCarToQueue } from "../workers/ingestCars";
import { CarPayload } from "../models/vehicle.model";
import socketio from "socket.io";

export const ingestCSV = async (
  req: Request,
  res: Response,
  io: socketio.Server
) => {
  const { file } = req;
  const { providerId } = req.body;

  if (!file || !providerId) {
    return res.status(400).send("Missing required file properties");
  }

  let rowCount = 0;
  let bytesProcessed = 0;
  try {
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", (data) => {
        if (!data["VIN"] || !data["Make"] || !data["Model"] || !data["Year"]) {
          console.warn("Incomplete data, unable to create record!");
          return;
        }

        const normalizedPayload: CarPayload = {
          providerId: providerId,
          vin: data["VIN"],
          make: data["Make"],
          model: data["Model"],
          mileage: Number(data["Mileage"].replace(/[^0-9]/g, "")) || 0,
          year: Number(data["Year"].replace(/[^0-9]/g, "")) || 0,
          price: Number(data["Price"].replace(/[^0-9]/g, "")) || 0,
          zipCode: data["Zip Code"] || null,
        };

        addCarToQueue(normalizedPayload);

        rowCount += 1;
        bytesProcessed += Buffer.byteLength(JSON.stringify(data), "utf8");
        const progress = Math.min(
          (bytesProcessed / fs.statSync(file.path).size) * 100,
          100
        );
        io.emit("progress", { progress });
      })
      .on("end", () => {
        console.log("CSV file is processed");
        io.emit("completed", { rowCount });
      });

    return res.json({ message: "file successfully uploaded" });
  } catch (error) {
    return res.status(500).send(error);
  }
};
