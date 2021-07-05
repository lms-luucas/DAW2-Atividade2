import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("phone_numbers", (table) => {
    table.increments("id").unique().notNullable();
    table.text("phone").notNullable();
    table.boolean("preferencial").notNullable();
    table.integer("client_id").unsigned();
    table.foreign("client_id").references("clients.id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("phone_numbers");
}
