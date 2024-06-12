import mongoose, {model} from "mongoose";
import {TodoSchema, TodoItem} from "./schema";
export default mongoose.models.todoItems || model<TodoItem>("todoItems", TodoSchema);
