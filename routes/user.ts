import { Elysia, t } from "elysia";
import jwt from "jsonwebtoken";
import { findUser} from "../models/usersModels";
import { pool } from "../db/index";

const secret = process.env.KEY as string;

export const user = new Elysia().group("/user", (app) =>
  app
    .get("/:userUUID", async (context) => {
      try {
        const accessToken = context.headers.authorization?.replace(
          "Bearer ",
          ""
        ) as string;

        //Verify the token using the account's JWT public key

        const verifiedPayload = jwt.verify(accessToken, secret, {
          algorithms: ["RS256"],
        });

        const { userUUID } = context.params;
        const { email, username } = context.query;

        const data = await findUser({userUUID, email, username});

        return { data: JSON.stringify(data) };
      } catch (error) {
        context.set.status = 401;

        return { message: "Unauthorized", status: 401 };
      }
    })
    .get("/", async (context) => {
      try {
        const accessToken = context.headers.authorization?.replace(
          "Bearer ",
          ""
        ) as string;

        //Verify the token using the account's JWT public key

        const verifiedPayload = jwt.verify(accessToken, secret, {
          algorithms: ["RS256"],
        });
        //context.set.status = 200;

        try {
          const query = `SELECT * FROM Users WHERE email=djfa`;
          //const value = [context.params.email];
          pool
            .connect()
            .then(() => console.log("connected successfully"))
            .then(() => pool.query(query))
            .then((result) => result.rows[0])
            .catch((error) => console.log(error))
            .finally(() => pool.end);
        } catch (error) {}
      } catch (error) {
        context.set.status = 401;
        return { message: "Unauthorized", status: 401 };
      }
    })
    .post("/:userUUID", async (context) => {
      console.log(context.params.userUUID);
      console.log(context.query.username);
    })
);
