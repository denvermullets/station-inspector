import { Job } from "bullmq";
import db from "../database/db";
import { CarPayload } from "../models/vehicle.model";

export const ingestCarRecord = async (payload: Job<CarPayload>) => {
  const { vin, make, model, mileage, year, price, zipCode, providerId } =
    payload.data;

  // let's verify the provider exists
  // let's check if VIN exists
  // let's create record

  const validProvider = await db("providers")
    .select("*")
    .where({ id: providerId })
    .first()
    .catch((err: Error) => {
      throw err;
    });

  if (!validProvider) {
    console.error("Not a valid Provider");
    return;
  }

  console.log("provider found");

  const existingVehicle = await db("vehicles")
    .select("*")
    .where({ vin: vin })
    .first()
    .catch((err: Error) => {
      throw err;
    });

  if (existingVehicle) {
    console.log("vehicle found");
    await db("vehicles")
      .update({
        make,
        model,
        mileage,
        year,
        price,
        zip_code: zipCode,
        provider_id: providerId,
        updated_at: new Date().toISOString(),
      })
      .returning("*");
  } else {
    await db("vehicles")
      .insert({
        vin,
        make,
        model,
        mileage,
        year,
        price,
        zip_code: zipCode,
        provider_id: providerId,
      })
      .returning("*")
      .catch((err: Error) => {
        throw err;
      });
  }
};
