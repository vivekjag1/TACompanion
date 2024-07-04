import {Schema, InferSchemaType} from "mongoose";
export const courseSchema:Schema = new Schema<CourseItem>({
  courseCode:{
    type:String,
    required: true
  },
  title:{
    type:String,
    required: true
  },
  term:{
    type: String,
    required:true
  },
  role:{
    type:String,
    required: true,
  },
  credits:{
    type:Number,
    required:true,
  },
  requirements:{
    type:[String],
    required:true
  },
  name:{
    type:String,
    required:true
  }
});
export declare type CourseItem = InferSchemaType<typeof courseSchema>