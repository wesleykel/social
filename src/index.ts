import { Elysia, t } from "elysia";
import jwt from "jsonwebtoken";

import "dotenv/config";
const key = process.env.KEY as string;
const app = new Elysia()
  .get("/protected", async (context) => {
    try {
      const accessToken = context.headers.authorization?.replace(
        "Bearer ",
        ""
      ) as string;

      //Verify the token using the account's JWT public key

      const verifiedPayload = jwt.verify(accessToken, key, {
        algorithms: ["RS256"],
      });
      context.set.status = 200;
      console.log(verifiedPayload);
    } catch (error) {
      context.set.status = 401;
      return { message: "Unathorized", status: 401 };
    }
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
