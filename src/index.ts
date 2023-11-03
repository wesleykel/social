import { Elysia } from "elysia";
import {cors} from "@elysiajs/cors"
import {user} from "../routes/user";

 const app = new Elysia()
.use(cors())
.use(user)
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
