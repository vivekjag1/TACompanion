import {Schema, InferSchemaType} from "mongoose";
export const hoursSchema:Schema = new Schema<HoursType>({
  id: {
    type:Number,
    required: true,
  },

  title:{
    type:String,
    required:true
  },
  courseCode:{
    type:String,
    required: true
  },
  description:{
    type:String,
    required: true
  },
  start:{
    type: String,
    required:true
  },
  end:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required: true
  }
});
export declare type HoursType = InferSchemaType<typeof hoursSchema>
