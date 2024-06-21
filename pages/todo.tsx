import client from "../graphql/client";
import { gql } from 'graphql-tag';
import {useEffect, useState} from "react";
import {TodoItem} from "@/mongoose/todo/schema";
import {Kanban} from "../components/Kanban"
const Home = () =>{
  const [todoItemArray, setTodoItemArray] = useState<TodoItem[]>([]);
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
      const cleanData = data['data']['findAllTodoItems'].map((item:TodoItem) =>{
        const{__typeName, ...rest}  = item;
        return rest;
      });
      setTodoItemArray(cleanData);
      const cachedArray:TodoItem[] = [];
      cleanData.map((item:TodoItem)=>{
        todoItemArray.push( item);
      });
      setTodoItemArray(cachedArray);
      return cleanData;
    }
    fetchData().then(console.log);
  }, []);// eslint-disable-line
  return (
      <div className = "flex flex-col ml-20 justify-center overflow-hidden  ">
        <h1 className = " top-0 mb-5 text-5xl text-black font-mono text-center">Your Todo Items </h1>
        <div>
          <Kanban cards={todoItemArray}  />
        </div>
      </div>

  )
};
export default Home;
