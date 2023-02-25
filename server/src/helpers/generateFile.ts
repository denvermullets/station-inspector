import { faker } from "@faker-js/faker";

const generateRandomRow = (): Array<string | number> => {
  // unsure what price means, assuming it's price of car
  const vin = faker.vehicle.vin();
  const make = faker.vehicle.manufacturer();
  const model = faker.vehicle.model();
  const mileage = faker.datatype.float({ min: 0, max: 200000, precision: 1 });
  const year = faker.datatype.float({ min: 1954, max: 2024, precision: 1 });
  const price = faker.commerce.price(1000, 65000, 0);
  const zipCode = faker.address.zipCode();

  return [vin, make, model, mileage, year, price, zipCode];
};

export const generateCSV = (
  numRows: number,
  numExtraColumns: number
): string => {
  let columns = [
    "VIN",
    "Make",
    "Model",
    "Mileage",
    "Year",
    "Price",
    "Zip Code",
  ];

  for (let i = 0; i < numExtraColumns; i++) {
    columns.push(faker.lorem.word());
  }

  let csv = columns.join(",") + "\n";

  for (let i = 0; i < numRows; i++) {
    let row = generateRandomRow();

    for (let j = 0; j < numExtraColumns; j++) {
      row.push(faker.lorem.word());
    }

    csv += row.join(",") + "\n";
  }

  return csv;
};
