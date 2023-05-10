import { UserRefactor1680550198796 } from "src/migrations/1680550198796-UserRefactor";
import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: [],
    migrations: [UserRefactor1680550198796],
  });