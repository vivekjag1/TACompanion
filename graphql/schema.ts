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
  type Hours @cacheControl(maxAge: 86400){
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
      
  }
  type Mutation{
      addTodo( name:String, email:String, title:String, courseCode:String, role:String, status:String, description:String): Todo
      changeValue(id:Int, newAttribute:String, attrValue:String): Todo
      deleteTodo(id:Int):Todo
      deleteAll:Todo
      addManyTodos(toAdd:[TodoInput!]):Boolean
  }
`;
