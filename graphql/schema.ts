import gql from "graphql-tag";
export const typeDefs = gql`
  directive @cacheControl (maxAge:Int) on FIELD_DEFINITION | OBJECT
  type Todo @cacheControl(maxAge: 86400){
      id:Int
      title:String
      courseCode:String 
      role:String 
      status:String
      description:String
  } 
  input TodoInput {
      id:Int
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
      fetchTodoByID:Todo
      fetchTodosByRole:[Todo]
      fetchTodosByCourse: [Todo]
  }
  type Mutation{
      addTodo(id:Int, title:String, courseCode:String, role:String, status:String, description:String): Todo
      changeValue(id:Int, newAttribute:String, attrValue:String): Todo
      deleteTodo(id:Int):Todo
      deleteAll:Todo
      addManyTodos(toAdd:[TodoInput!]):Boolean
  }
`;
