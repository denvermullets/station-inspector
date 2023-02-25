import { Request, Response } from "express";
import fs from "fs";
import csv from "csv-parser";
import { addCarToQueue } from "../workers/ingestCars";
import { CarPayload } from "../models/vehicle.model";

export const ingestCSV = async (req: Request, res: Response) => {
  const { file } = req;

  if (!file) {
    return res.status(400).send("Missing required file properties");
  }

  try {
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", (data) => {
        if (!data["VIN"] || !data["Make"] || !data["Model"] || !data["Year"]) {
          // console.log("missing record", data);
          return;
        }

        const normalizedPayload: CarPayload = {
          vin: data["VIN"],
          make: data["Make"],
          model: data["Model"],
          mileage: Number(data["Mileage"].replace(/[^0-9]/g, "")),
          year: Number(data["Year"].replace(/[^0-9]/g, "")),
          price: Number(data["Price"].replace(/[^0-9]/g, "")),
          zipCode: data["Zip Code"],
        };

        addCarToQueue(normalizedPayload);
      })
      .on("end", () => {
        console.log("CSV file is processed");
      });

    return res.json({ message: "file successfully uploaded" });
  } catch (error) {
    return res.status(500).send(error);
  }
};
