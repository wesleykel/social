import { pool } from "../db/index";

type User = {
  userUUID: string;
  email: string | null;
  username: string | null;
};
type UserUpdate = {
  userUUID: string;
  username: string | null;
};
export const findUser = async ({ userUUID, email, username }: User) => {
  const checkUser: string = `SELECT * FROM users WHERE uuid=$1`;
  const cuValues = [userUUID];
  const addUser: string = `INSERT into users ("uuid","email","username") VALUES ($1, $2, $3)  RETURNING "uuid", "email", "username"`;
  const auValues = [userUUID, email, username];

  try {
    await pool.connect();
    const response = await pool.query(checkUser, cuValues);
    const data = response.rows[0];
    if (data) {
      return data;
    }

    const newUser = await pool.query(addUser, auValues);
    return newUser.rows[0];
  } catch (error) {
    return error;
  }
};

export const updateUserName = async ({ userUUID, username }: UserUpdate) => {
  const updatedUser = `UPDATE users SET "username"=($1) WHERE "uuid"=($2) RETURNING "username", "uuid"`;
  const values = [username, userUUID];

  try {
    await pool.connect();
    const response = await pool.query(updatedUser, values);
    const data = response.rows[0];
    if (data) {
      return data;
    }

    pool.end();
  } catch (error) {
    console.log(error);
  }
};
