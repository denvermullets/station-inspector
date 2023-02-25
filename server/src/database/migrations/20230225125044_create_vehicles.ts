import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("vehicles", (t) => {
    t.uuid("id").unique();
    t.uuid("provider_id").notNullable();
    t.foreign("provider_id").references("id").inTable("providers");

    t.string("vin").notNullable();
    t.string("make").notNullable();
    t.string("model").notNullable();
    t.integer("mileage").notNullable();
    t.integer("year").notNullable();
    t.integer("price").notNullable();
    t.string("zip_code").notNullable();

    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("vehicles");
}
