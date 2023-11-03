import { Elysia} from "elysia";
import jwt from "jsonwebtoken";
const secret = process.env.KEY as string;


export const user  = new Elysia().group("/user",(app)=>
 app.get("/", async (context) => {
    try {
      const accessToken = context.headers.authorization?.replace(
        "Bearer ",
        ""
      ) as string;

//Verify the token using the account's JWT public key

      const verifiedPayload = jwt.verify(accessToken, secret, {
        algorithms: ["RS256"],
      });
      context.set.status = 200;
     return "all users"
    } catch (error) {
      context.set.status = 401;
      return { message: "Unauthorized", status: 401 };
    }
  })
.get("/:id", async (context)=>{

  try {
    const accessToken = context.headers.authorization?.replace(
      "Bearer ",
      ""
    ) as string;

//Verify the token using the account's JWT public key

    const verifiedPayload = jwt.verify(accessToken, secret, {
      algorithms: ["RS256"],
    });
    context.set.status = 200;
  return  `User ${context.params.id}`
  } catch (error) {
    context.set.status = 401;
    return { message: "Unauthorized", status: 401 };
  }



})
.post("/",()=> "create user")
)
