import fs from "fs";
import { Request, Response } from "express";
import { generateCSV } from "../helpers/generateFile";

export const getCSV = async (req: Request, res: Response) => {
  const { numRows, numExtraColumns } = req.query;

  try {
    const csv = generateCSV(
      Number(numRows || 10),
      Number(numExtraColumns || 0)
    );

    fs.writeFileSync("./files/downloads/carInfo.csv", csv);

    return res.json({ message: "file saved in server/files/downloads" });
  } catch (error) {
    return res.status(500).send(error);
  }
};
