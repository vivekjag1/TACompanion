import todoItems from "../../mongoose/todo/model";
import {TodoItem} from "../../mongoose/todo/schema";

interface todoInterface{
  id:number;
  name:string;
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
  addTodo: async (_: any, { id, name, title, courseCode, role, status, description}: todoInterface) => {
    const findDocs = await todoItems.countDocuments({})
    let newId = findDocs + 1;
    while ((await todoItems.find({id: newId})).length != 0) {//do not create a todolist item that already exists
      newId++;

    }
    try {
      const newTodo: TodoItem = {
        id: newId,
        name:name,
        title: title,
        courseCode: courseCode,
        role: role,
        status: status,
        description: description
      }
      await todoItems.create(newTodo);
      return newTodo;
    } catch (error) {
      return null;
    }
  },
  changeValue: async (_: any, {id, newAttribute, attrValue}: updateInterface) => {
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
        const data = await todoItems.findOneAndUpdate({id: id}, {status: attrValue}, {new: true});
        return data;
      }
    }
  },
  deleteTodo: async (_: any, id: number) => {
    // @ts-ignore
    //@ts-ignore
    return await todoItems.deleteMany({id: id['id']});
  },
  deleteAll: async (_: any) => {

    return await todoItems.deleteMany({});

  },
  addManyTodos: async(_:any, toAdd: TodoItem[]) =>{
    // @ts-ignore
    try{
      // @ts-ignore
      await todoItems.insertMany(toAdd['toAdd']);
      return true;
    }
    catch(err){
      console.log(err);
      return false;
    }

  }




}
