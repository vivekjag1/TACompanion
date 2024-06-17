import TodoCard from "@/components/TodoCard";
import client from "../graphql/client";
import { gql } from 'graphql-tag';
import {useEffect, useState} from "react";
import {TodoItem} from "@/mongoose/todo/schema";

const Home = () =>{
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const todoData  = gql `
      query {
          findAllTodoItems {
              title
              courseCode
              description
              status
              role
          }
      }
  `;
  useEffect(() =>{
    async function fetchData(){
      const data = await client.query({
        query:todoData
      });
      setTodoItems(data['data']['findAllTodoItems']);
      console.log(todoItems); 
    }
    fetchData().then();
  }, [todoItems, setTodoItems, todoData])

  return (
      <div className="bg-white   items-center justify-center h-screen overflow-hidden">
        <p className = "font-mono mt-5 text-5xl text-center text-black ">Todo Items</p>
        <p className = "text-2xl text-blue-500 text-center">Create and Update Action Items</p>
        <div className = "flex flex-wrap">
          {todoItems.map((todo:TodoItem) =>(
            <TodoCard key = {todo.id as number} title={todo.title as string} course={todo.courseCode as string} role={todo.role as string} status={todo.status as string} description={todo.description as string}/>
          ))}
        </div>
      </div>
  )
};
//why

export default Home;
