// ormconfig with postgresql
import { ConnectionOptions } from "typeorm";
import path from "path";

const isCompiled = path.extname(__filename) === ".ts";

export default {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  database: process.env.DB_DATABASE || "type-express",
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "prakashpun",
  synchronize: true,
  logging: false,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 2000,
  entities: [
    "src/entity/**/*.ts"
  ],
  migrations: [
    "src/migration/**/*.ts"
  ],
  cli: {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
  },
} as ConnectionOptions;