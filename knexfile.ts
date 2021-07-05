import path from "path"

const knexfile = {
  client: "sqlite3",
  connection: {
      filename: path.resolve(__dirname, "src", "database", "db.sqlite")
  },
  migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations")
  },
  useNullAsDefault: true
}

export default knexfile;
