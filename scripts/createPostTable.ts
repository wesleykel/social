import { pool } from "../db/index";

const newPostTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS post(
    PostId INT GENERATED ALWAYS AS IDENTITY,
    uuid VARCHAR(255),
    Time TIMESTAMP, 
    Post VARCHAR(255),
    Date DATE,
    Likes INT,
    Dislikes INT,
    IsResponse BOOLEAN, 
    IsOriginalPost BOOLEAN);`;

  pool
    .connect()
    .then(() => console.log("connected successfully"))
    .then(() => pool.query(query))
    .catch((error) => console.log(error))
    .finally(() => pool.end);
};

await newPostTable()
  .then(() => console.table("new table created"))
  .catch((error) => console.error(error.stack));
export default newPostTable;
