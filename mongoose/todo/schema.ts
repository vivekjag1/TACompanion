import {Schema, InferSchemaType, Types} from "mongoose";
import type {CourseItem} from "../course/schema";
export const TodoSchema:Schema = new Schema<TodoItem>({
  id:{
    type: Number,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  courseCode: {
    type: String,
    required: false
  },
  role:{
    type:String,
    required: true
  },
  status:{
    type:String,
    required:true
  }
});

export declare type TodoItem = InferSchemaType<typeof TodoSchema>;