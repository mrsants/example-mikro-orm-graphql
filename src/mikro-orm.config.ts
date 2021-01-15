import dotenv from 'dotenv';
import { Post } from "./entities/Post";
import { Options } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { User } from './entities/User';
import { __prod__ } from './constant';

dotenv.config();

export default {
  migrations: {
    path: './migrations', // path to the folder with migrations
    pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
  },
  entities: [Post, User],
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  type: process.env.DB_TYPE,
  password: process.env.DB_PASS,
  debug: __prod__,
  metadataProvider: TsMorphMetadataProvider,
} as Options;
