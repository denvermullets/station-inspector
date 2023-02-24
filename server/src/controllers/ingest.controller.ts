import { Request, Response } from "express";
import fs from "fs";
import csv from "csv-parser";

export const ingestCSV = async (req: Request, res: Response) => {
  const { file } = req;

  if (!file) {
    return res.status(400).send("Missing required file properties");
  }

  try {
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", (data) => {
        console.log("this is data ======>", data);
      })
      .on("end", () => {
        console.log("CSV file is processed");
      });

    return res.json({ message: "file successfully uploaded" });
  } catch (error) {
    return res.status(500).send(error);
  }
};
