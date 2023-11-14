import { Elysia, t } from "elysia";
import jwt from "jsonwebtoken";
import { checkUser } from "../models/usersModels";
import { pool } from "../db/index";

const secret = process.env.KEY as string;

export const user = new Elysia().group(
  "/user",
  (app) =>
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

          //see if user has a  record in db
          const { userUUID } = context.params;
          const { email, username } = context.query;

          const checkUser = `SELECT * FROM users WHERE uuid='${userUUID}'`;
          const addUser = `INSERT into users ("uuid","email","username") VALUES ($1, $2, $3)  RETURNING "uuid", "email", "username"`;
          const values = [userUUID, email, username];
          async function getResults() {
            try {
              await pool.connect();
              const response = await pool.query(checkUser);
              let data = response.rows[0];
              if (data) {
                return data;
              }

              const response2 = await pool.query(addUser, values);
              return response2.rows[0];
            } catch (error) {
              return error;
            } finally {
           
            }
          }
const data = await getResults()

          return {data:JSON.stringify(data)};
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
  /* .post("/", async (context) => {
      try {
        const accessToken = context.headers.authorization?.replace(
          "Bearer ",
          ""
        ) as string;

        //Verify the token using the account's JWT public key

        const verifiedPayload = jwt.verify(accessToken, secret, {
          algorithms: ["RS256"],
        });

        type userBody = {
          age: number;
          postcount: number;
          email: string;
          username: string;
        };
        const user = context.body as userBody;

        const query = `INSERT INTO users (age, postcount, "email","username") VALUES (${user.age}, ${user.postcount}, '${user.email}', '${user.username}');`;

        pool
          .connect()
          .then(() => console.log("connected successfully"))
          .then(() => pool.query(query))
          .then((result) => result.rows[0])
          .catch((error) => console.log(error))
          .then(() => pool.end)
          .finally(() => (context.set.status = 200));

        //return "user updated"
      } catch (error) {
        context.set.status = 401;

        return { message: "Unauthorized", status: 401 };
      }
    })*/
);
