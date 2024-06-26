import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { makeSchema, declarativeWrappingPlugin } from "nexus";
import { createServer } from "node:http";
import { format, join } from "node:path";
import { expressMiddleware } from "@apollo/server/express4";
import { useServer } from "graphql-ws/lib/use/ws";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { WebSocketServer } from "ws";
import { graphqlUploadExpress } from "graphql-upload-ts";

dotenv.config();
const { json } = bodyParser;

import * as User from "./api/schema/user/user";
import * as Enroll from "./api/schema/enroll/enroll";
import * as Subject from "./api/schema/subject/subject";
import * as Scalars from "./api/schema/scalar/index";

(async function MedicalApollo() {
  const app = express();

  const httpServer = createServer(app);

  const schema = makeSchema({
    types: [Enroll, User, Scalars, Subject],
    outputs: {
      schema: join(process.cwd(), "/src/api/generated/schema.graphql"),
      typegen: join(process.cwd(), "/src/api/generated/schema.ts"),
    },
    plugins: [declarativeWrappingPlugin()],
  });

  app.use(cookieParser());

  const wsServer = new WebSocketServer({
    path: "/graphql",
    server: httpServer,
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    introspection: true,
    status400ForVariableCoercionErrors: true,
    includeStacktraceInErrorResponses: false,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  app.use(graphqlUploadExpress());

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      credentials: true,
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  await new Promise(() => {
    httpServer.listen({ port: process.env.PORT || 4000 });
    console.log(`Server is running at port 4000 🚀 `);
  });
})();
