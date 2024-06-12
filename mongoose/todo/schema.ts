import {Schema, InferSchemaType} from "mongoose";
export const TodoSchema:Schema = new Schema<TodoItem>({
  id:{
    type: Number,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
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