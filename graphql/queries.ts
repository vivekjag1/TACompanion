import todoItems from "../mongoose/todo/model";
import hours from "../mongoose/timeWorked/model";

export const todoQueries ={
  findAllTodoItems: async (_:any) =>{
    return await todoItems.find({});
  },
  fetchTodoByID: async (_:any, params:{id:number})=>{

    return await todoItems.findOne({id:params.id});
  },
  fetchTodosByName: async (_:any, params:{name:string})=>{
    return await todoItems.find({name:params.name});
  },
  fetchTodosByRole: async (_:any, params: { role:string })=>{
    return await todoItems.find({role:params.role});
  },
  fetchTodosByCourse: async(_:any, params:{course:string})=>{
    return await todoItems.find({course:params.course});
  },
  fetchAllHours: async(_:any) =>{
    return await hours.find({});
  },
  fetchHoursByName: async (_:any, params:{name:string}) =>{
    return await hours.find({name: params.name});
  },
  fetchHoursByID: async (_:any, params:{ID:number}) => {
    return await hours.findOne({id:params.ID});
  }

}
