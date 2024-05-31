import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import connectDB from "./db";
import { schema } from "./schema";
import { root } from "./resolvers";
// @ts-ignore
import { ruruHTML } from "ruru/server";


const app = express();
connectDB();

app.all("/graphql", createHandler({ schema, rootValue: root }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});

app.get("/", (req, res, next) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  return res.end(
    ruruHTML({
      endpoint: "/graphql",
    }),
  );
});