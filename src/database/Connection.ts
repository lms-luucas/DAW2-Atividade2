import knex from "knex";
import path from "path";

const Connection = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "db.sqlite"),
  },
  migrations: {
    directory: path.resolve(__dirname, "migrations"),
  },
  useNullAsDefault: true,
});

export { Connection };
