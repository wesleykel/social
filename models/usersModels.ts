import { pool } from "../db/index";

export const checkUser = async (email: string) => {
  const query = `SELECT * FROM users WHERE email=${};`;
  //const value = [email];
  console.log(value)
  pool
    .connect()
    .then(() => console.log("connected successfully"))
    .then(() => pool.query(query, value))
    .then((result)=>(result.rows[0]))
    .catch((error) => console.log(error))
    .finally(() => pool.end);
};
