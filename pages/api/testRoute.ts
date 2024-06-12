import {NextApiResponse, NextApiRequest} from "next";
import dbConnect from "../../middleware/db-connect";
import todoItems from "../../mongoose/todo/model";
//this route should only be called during development for the purpose of testing the mongodb, rest, and graphql apis
export default async function handler(req:NextApiRequest, res:NextApiResponse){
  await dbConnect();
  const seed = {
    id:-1,
    title:"dummy",
    courseCode: "CS100x",
    role: "ta",
    status:"in progress"
  };

  await todoItems.deleteMany({id:-1});
  await todoItems.insertMany(seed);
  res.status(200).json(seed);

}