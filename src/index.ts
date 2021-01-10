import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "../resolvers/hello";
import { PostsResolver } from "../resolvers/posts";
import dotenv from 'dotenv';

import "reflect-metadata";

dotenv.config();

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  orm.getMigrator().up();
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostsResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  apolloServer.applyMiddleware({ app });
  app.get("/", (_, res) => {
    res.send("hello");
  });

  app.listen(process.env.APP_PORT, () => {
    console.log("server started on localhost:4000");
  });
};

main();
