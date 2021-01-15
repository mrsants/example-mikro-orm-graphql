import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "../resolvers/hello";
import { PostsResolver } from "../resolvers/posts";
import dotenv from "dotenv";
import "reflect-metadata";
import { UserResolver } from "../resolvers/user";
import redis from "redis";
import connectRedis from "connect-redis";
import session from "express-session";

dotenv.config();

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);

  const redisClient = redis.createClient();

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redisClient,
        disableTTL: true,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: true,
      },
      secret: "alksjaisuanshsaidatslkasmssak",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostsResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  apolloServer.applyMiddleware({ app });

  app.get("/", (_, res) => {
    res.send("teste");
  });

  app.listen(process.env.APP_PORT, () => {
    console.log("server started on localhost:4000");
  });
};

main();
