import client from "../graphql/client";
import { gql } from 'graphql-tag';
import {useEffect, useState} from "react";
import {TodoItem} from "@/mongoose/todo/schema";
import {Kanban} from "../components/Kanban"
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () =>{
  let { user, error, isLoading } = useUser();


  const router = useRouter();
  const [todoItemArray, setTodoItemArray] = useState<TodoItem[]>([]);
  const [verified, setVerified] = useState<boolean>(false);
  const heading = `${user?.name}'s todo items`;
  const userName = user?.name;
  useEffect(() =>{
    if(!user && !isLoading){ //if the information is fetched but there is still no user object then move to login
      router.push('/api/auth/login').then();
    }
    else{
      setVerified(true);
      fetchData().then();
    }

  })
  const todoData  = gql `
      query fetchTodoByEmail ($name:String){
          fetchTodosByName(name:$name) {
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

  async function fetchData(){
    const data = await client.query({
      query:todoData,
      variables:{
        name:userName!,
      }
    });
    console.log(data);
    const cleanData = data['data']['fetchTodosByName'].map((item:TodoItem) =>{
      const{__typeName, ...rest}  = item;
      return rest;
    });
    console.log(user?.name);
    setTodoItemArray(cleanData);
    const cachedArray:TodoItem[] = [];
    cleanData.map((item:TodoItem)=>{
      todoItemArray.push( item);
    });
    setTodoItemArray(cachedArray);
    return cleanData;
  }
  return (
      <div className = "flex flex-col ml-20 justify-center overflow-hidden  ">
        <h1 className = " top-0 mb-5 text-5xl text-black font-mono text-center">{heading}</h1>
        <div>
          <Kanban cards={todoItemArray}  />
        </div>
      </div>

  )
};
export default Home;
