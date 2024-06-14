import mongoose, {model} from "mongoose";
import {CourseItem, courseSchema} from "./schema";
export default mongoose.models.course || model<CourseItem>("course", courseSchema);
