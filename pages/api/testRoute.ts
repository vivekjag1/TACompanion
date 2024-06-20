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
    status:"notStarted",
    description: "I need to do stuff"
  };
  const seedTwo = {
    id:-2,
    title:"dummy2",
    courseCode: "ECE100x",
    role: "ta",
    status:"notStarted",
    description: "I dont need to do stuff"
  };

  const seedCourse = {
    courseCode: "CS0000",
    title: "Dummy Course",
    term: "F24",
    meetingDays: "never",
    meetingTime: "0 AM"
  }
  await todoItems.deleteMany({id:-1});
  await todoItems.deleteMany({id:-2});
  await todoItems.insertMany(seed);
  await todoItems.insertMany(seedTwo);
  await course.insertMany(seedCourse);
  res.status(200).json(seed);

}