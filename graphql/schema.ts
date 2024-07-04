import gql from "graphql-tag";
export const typeDefs = gql`
  directive @cacheControl (maxAge:Int) on FIELD_DEFINITION | OBJECT
  type Todo @cacheControl(maxAge: 86400){
      id:Int
      title:String
      email:String
      courseCode:String 
      role:String 
      status:String
      description:String
  } 
  type Hours{
      id:Int
      title:String
      courseCode:String
      description:String 
      start:String
      end: String
      name:String
  }
  input HoursInput{
      title:String
      courseCode:String
      description:String
      start:String
      end: String
      name:String
  }
  input TodoInput {
      id:Int
      email:String
      title:String
      courseCode:String 
      role:String 
      status:String
      description:String
  }
  type Course{
      courseCode:String
      title:String 
      term:String 
      role:String
      credits:Int
      requirements:[String]
      name:String
  }
  
  
  
  input updateInterface{
      id:Int
      newAttribute:String
      attrValue:String
  }
  
  type Query{
      findAllTodoItems:[Todo]
      fetchTodosByName(name:String):[Todo]
      fetchTodoByID:Todo
      fetchTodosByRole:[Todo]
      fetchTodosByCourse: [Todo]
      fetchAllHours:[Hours]
      fetchHoursByName(name:String):[Hours]
      fetchHoursByID(ID:Int):Hours
      fetchAllCoursesByName(name:String):[Course]
      
  }
  type Mutation{
      addTodo( name:String, email:String, title:String, courseCode:String, role:String, status:String, description:String): Todo
      changeValue(id:Int, newAttribute:String, attrValue:String): Todo
      deleteTodo(id:Int):Todo
      deleteAll:Todo
      addManyTodos(toAdd:[TodoInput!]):Boolean
      addHour(title:String, courseCode:String, description:String, start:String, end:String, name:String):Hours
      changeStartAndEnd(id:Int, start:String, end:String):Hours
      updateHourByID(id:Int,title:String, courseCode:String, description:String, start:String, end:String, name:String):Hours
      deleteHourByID(id:Int):Hours
  }
`;
