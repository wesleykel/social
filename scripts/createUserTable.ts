import {pool} from "../db/index"


const newTable = async ()=>{
      
   const  query =`CREATE TABLE IF NOT EXISTS users(
      id INT GENERATED ALWAYS AS IDENTITY,
      Age int,
      PostCount int,
      Email varchar(255),
      UserName varchar(255));`;

   




 pool.connect()
 .then(() => console.log("connected successfully"))
 .then(()=>pool.query(query))
 .catch((error) => console.log(error))
 .finally(() => pool.end);

};


 newTable().then(()=> console.table("new table created"))

export default newTable