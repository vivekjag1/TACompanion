import mongoose, {model} from "mongoose";
import {HoursType, hoursSchema} from "./schema";
export default mongoose.models.hours || model<HoursType>("hours", hoursSchema);
