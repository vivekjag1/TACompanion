import {NextApiResponse, NextApiRequest} from "next";
import dbConnect from "../../middleware/db-connect";
import todoItems from "../../mongoose/todo/model";
import course from "../../mongoose/course/model";
//this route should only be called during development for the purpose of testing the mongodb, rest, and graphql apis
export default async function handler(req:NextApiRequest, res:NextApiResponse){
  await dbConnect();
  const seed = {
    id:-1,
    title:"dummy",
    courseCode: "CS100x",
    role: "ta",
    status:"done",
    description: "I need to do stuff"
  };

  const seedCourse = {
    courseCode: "CS0000",
    title: "Dummy Course",
    term: "F24",
    meetingDays: "never",
    meetingTime: "0 AM"
  }
  await todoItems.deleteMany({id:-1});
  await todoItems.insertMany(seed);
  await course.insertMany(seedCourse);
  res.status(200).json(seed);

}