import todoItems from "../mongoose/todo/model";
import {TodoItem} from "../mongoose/todo/schema";
import hours from "../mongoose/timeWorked/model";
import {HoursType} from "@/mongoose/timeWorked/schema";
import course from "../mongoose/course/model";
interface todoInterface{
  id:number;
  name:string;
  title:string;
  courseCode:string;
  role:string;
  status:string;
  description:string;
}

interface hoursInterface{
  id:number;
  title:string;
  courseCode:string;
  description:string;
  start:string;
  end:string;
  name:string;
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
  },
  addHour: async(_:any, { title, courseCode, description, start, end, name} :hoursInterface) =>{
    try{
      let newID:number = (await hours.countDocuments({})) + 1;
      while ((await hours.find({id:newID})).length != 0){
        newID++;
      }
      const newHour:HoursType = {
        id: newID,
        title: title.concat(` (ID: ${newID})`),
        courseCode: courseCode,
        description:description,
        start:start,
        end:end,
        name:name,
      }
      await hours.create(newHour);
      return newHour;
    }
    catch(err){
      console.error(err);
      return null;
    }
  },
  changeStartAndEnd: async (_:any, {id, start, end}:{id:number,  start:string, end:string}) =>{

    return await hours.findOneAndUpdate({id:id}, {start:start, end:end}, {new:true}) ;
  },
  updateHourByID: async(_:any,{ id, title, courseCode, description, start, end, name} :hoursInterface ) =>{
    return hours.findOneAndUpdate({id: id}, {
      title: title,
      courseCode: courseCode,
      description: description,
      start: start,
      end: end,
      name: name
    });
  },
  deleteHourByID: async(_:any, {id}:{id:number}) =>{
    return await hours.deleteMany({id: id});
  },
  addCourse: async(_:any, params:{courseCode:string, title:string, term:string, role:string, credits:number, requirements:string[], name:string}) =>{
    const newCourse = {
      courseCode:params.courseCode,
      title: params.title,
      term: params.term,
      role: params.role,
      credits: params.credits,
      requirements: params.requirements,
      name: params.name,
    };
    return await course.create(newCourse);
  },
  deleteCourse: async(_:any, params:{courseCode:string, userName:string}) => {
    return await course.deleteOne({courseCode: params.courseCode, name: params.userName});
  },
  //      updateCourse(oldCourseCode:String, courseCode:String, title:String, term:String, role:String, credits:Int, requirements:[String], name:String):Course
  updateCourse: async(_:any, params:{oldCourseCode:string, courseCode:string, title:string, term:string, role:string, credits:number, requirements:string[], name:string}) =>{
    return  await course.findOneAndUpdate({courseCode: params.oldCourseCode, name:params.name}, {
      courseCode: params.courseCode,
      title: params.title,
      term: params.term,
      role: params.role,
      credits: params.credits,
      requirements: params.requirements,
      name: params.name,
    });


  }
}
