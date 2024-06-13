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
  meetingDays:{
    type:String,
    required:true
  },
  meetingTime:{
    type:Number,
    required:true
  }
});
export declare type CourseItem = InferSchemaType<typeof courseSchema>