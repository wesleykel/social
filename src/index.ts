import { Elysia } from "elysia";
import {user} from "../routes/user";

 const app = new Elysia()

.use(user)
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
