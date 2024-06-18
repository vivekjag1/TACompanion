import todoItems from "../../mongoose/todo/model";
import {TodoItem} from "../../mongoose/todo/schema";

interface todoInterface{
  id:number;
  title:string;
  courseCode:string;
  role:string;
  status:string;
  description:string;
}
interface updateInterface{
  id:number;
  newAttribute:string;
  attrValue:string;
}
export const todoMutations= {
  addTodo: async (_:any, params:todoInterface)=> {
    if ((await todoItems.find({id:params.id})).length != 0){ //do not create a todolist item that already exists
      return null;
    }
    try {
      const newTodo: TodoItem = {
        id: params.id,
        title: params.title,
        course: params.courseCode,
        role: params.role,
        status: params.status,
        description: params.description
      }
      await todoItems.insertMany(newTodo);
      return newTodo;
    } catch (error) {
      return null;
    }
  },
  changeValue: async(_:any, {id, newAttribute, attrValue}:updateInterface) => {
    if ((await todoItems.find({id})).length === 0) {
      return null;
    }

    switch (newAttribute) {
      case "title": {
        return await todoItems.findOneAndUpdate({id: id}, {title: attrValue});
      }
      case "courseCode": {
        return await todoItems.findOneAndUpdate({id: id}, {courseCode: attrValue});
      }
      case "role": {
        return await todoItems.findOneAndUpdate({id: id}, {role: attrValue});
      }
      case "status": {
         const data = await todoItems.findOneAndUpdate({id: id}, {status: attrValue}, {new:true});
        return data;
      }
    }
  },
  deleteTodo: async (_:any, id:number) =>{
    return await todoItems.deleteMany({id:id});
  }
  }
