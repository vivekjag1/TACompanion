import {NextApiResponse, NextApiRequest} from "next";
import dbConnect from "../../middleware/db-connect";
import todoItems from "../../mongoose/todo/model";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  dbConnect();
  const seed = {
    id:1,
    title:"dummy",
    course: "dummy",
    role: "ta",
    status:"in progress"
  };
  await todoItems.insertMany(seed);
  res.status(200).json(seed);

}