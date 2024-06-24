import {Schema, InferSchemaType} from "mongoose";
export const hoursSchema:Schema = new Schema<HoursType>({
  courseCode:{
    type:String,
    required: true
  },
  description:{
    type:String,
    required: true
  },
  timeIn:{
    type: Number,
    required:true
  },
  timeOut:{
    type:Number,
    required:true
  },
});
export declare type HoursType = InferSchemaType<typeof hoursSchema>