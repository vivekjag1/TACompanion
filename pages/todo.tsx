import client from "../graphql/client";
import { gql } from 'graphql-tag';
import {useEffect, useState} from "react";
import {TodoItem} from "@/mongoose/todo/schema";
import CustomModal from "../components/CustomModal";
import {Kanban} from "../components/Kanban"

const Home = () =>{
  const[open, setOpen] = useState<boolean>(false);
  const [todoItemArray, setTodoItemArray] = useState<TodoItem[]>([]);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const todoData  = gql `
      query {
          findAllTodoItems {
              id
              title
              courseCode
              description
              status
              role
              __typename
          }
      } 
  `;
  useEffect(() =>{
    async function fetchData(){
      const data = await client.query({
        query:todoData
      });
      console.log("the data is", data);
      const cleanData = data['data']['findAllTodoItems'].map((item:TodoItem) =>{
        const{__typeName, ...rest}  = item;
        return rest;
      });
      console.log("the cleaned data is ", cleanData);
      setTodoItemArray(cleanData);
      console.log("just set to clean", todoItemArray);

      const cachedArray:TodoItem[] = [];
      cleanData.map((item:TodoItem)=>{
        todoItemArray.push( item);
        // cachedArray.push(item);


      });
      console.log("before UE", todoItemArray);
      setTodoItemArray(cachedArray);
      console.log("after UE", todoItemArray);
      return cleanData;
    }
    fetchData().then(console.log);

  }, []);// eslint-disable-line


  const cardStyle = {
    backgroundColor: 'lightgray',
    borderRadius:"1rem"
  }


  const mutateTodo = async (id:number, newAttribute:string, value:string) =>{
    const updateTodo = gql`
        mutation updateTodo($id:Int, $newAttribute:String, $attrValue:String){
            changeValue(id: $id, newAttribute: $newAttribute, attrValue: $attrValue){
                id
                status
                courseCode
            }
        }
    `;
    const fetch = async() =>{
      return await client.mutate({
        mutation:updateTodo,
        variables:{
          id:id,
          newAttribute: "status",
          attrValue:value
        }
      });
    }
    return await fetch();
  }
  const cardTemplate = (data:TodoItem) =>{
    return(
      <div>
        <div className = "text-center font-bold text-lg">{data.title as string}</div>
        <div className = "text-center">{`Description: ${data.description as string}`}</div>
        <div className = "text-center">{`Course: ${data.courseCode as string}`}</div>
        <div className = "text-center" >{`Role: ${data.role as string}`}</div>
      </div>
    )
  }







  const addNewTodo = (newTodo:TodoItem) =>{
    const cachedArray = [];
    cachedArray.push(newTodo);
    setTodoItemArray(cachedArray);
    console.log("added the todo, map is now", todoItemArray);

  }






  return (

      <div className = "flex ml-20 items-center justify-center">
        <Kanban cards={todoItemArray} />
      </div>

  )
};
export default Home;
