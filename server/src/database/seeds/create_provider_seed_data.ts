import { faker } from "@faker-js/faker";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries and reset ID
  await knex("providers").del();

  // Inserts seed entries
  await knex("providers").insert([
    {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
    },
    {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
    },
    {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
    },
    {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
    },
    {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
    },
    {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
    },
    {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
    },
    {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
    },
    {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
    },
    {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
    },
  ]);
}
