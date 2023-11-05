import { pool } from "../db/index";

const newPostTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS post(
    PostId INT GENERATED ALWAYS AS IDENTITY,
    UserName varchar(255),
    Time varchar(255),
    Post varchar(255),
    Date varchar(255),
    Likes int,
    Dislikes int);`;

  pool
    .connect()
    .then(() => console.log("connected successfully"))
    .then(()=>pool.query(query))
    .catch((error) => console.log(error))
    .finally(() => pool.end);
};

newPostTable()
  .then(() => console.table("new table created"))
  .catch((error) => console.error(error.stack));
export default newPostTable;
