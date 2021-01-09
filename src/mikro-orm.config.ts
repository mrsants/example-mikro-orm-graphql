import dotenv from 'dotenv';
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { Options } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

dotenv.config();
export default {
  migrations: {
    path: './migrations', // path to the folder with migrations
    pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
  },
  entities: [Post],
  dbName: process.env.DB_NAME,
  host: process.env.HOST,
  type: process.env.DB_TYPE,
  password: process.env.DB_PASS,
  debug: !__prod__,
  metadataProvider: TsMorphMetadataProvider,
} as Options;
