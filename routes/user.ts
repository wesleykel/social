import { Elysia, t } from "elysia";
import jwt from "jsonwebtoken";
import { checkUser } from "../models/usersModels";
import { pool } from "../db/index";


const secret = process.env.KEY as string;

export const user = new Elysia().group("/user", (app) =>
  app
    .get("/:userEmail", async (context) => {
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
        const email = context.params.userEmail;
        const checkUser = `SELECT * FROM users WHERE email='${email}'`;
        //add user if not exist
        const addUser = `INSERT into users ("email") VALUES ('${email}')`;

        //postGres

        pool
          .connect()
          .then(() => console.log("connected successfully"))
          .then(() => pool.query(checkUser))
          .then(function (result) {
            if (result.rows[0] === undefined) {
              pool.query(addUser);
            } 
          })

          .then(() => pool.end);
       
        return JSON.stringify({user:"wes"})
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
    .post("/", async (context) => {
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
    })
);
