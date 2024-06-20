import client from "../graphql/client";
import { gql } from 'graphql-tag';
import {useEffect, useState} from "react";
import {TodoItem} from "@/mongoose/todo/schema";
import CustomModal from "../components/CustomModal";
// import { KanbanComponent, ColumnsDirective, ColumnDirective, CardSettingsModel, DragEventArgs } from "@syncfusion/ej2-react-kanban";
import {Kanban} from "../components/Kanban"
import {Button} from "@mui/material";
const Home = () =>{
  const[open, setOpen] = useState<boolean>(false);
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
      const cachedArray:TodoItem[] = [];
      cleanData.map((item:TodoItem)=>{
        todoItemArray.push( item);
        cachedArray.push(item);


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





  const handleDeleteAll = () =>{
    const deleteQuery = gql`
      mutation deleteEverything{
          deleteAll {
              id 
          }
      }
    `;
    const executeMutation = async () =>{
      await client.mutate({
        mutation: deleteQuery
      });
    }
    executeMutation().then();
    location.reload();
  }

  const addNewTodo = (newTodo:TodoItem) =>{
    const cachedArray = [];
    cachedArray.push(newTodo);
    setTodoItemArray(cachedArray);
    console.log("added the todo, map is now", todoItemArray);

  }

  useEffect(()=>{
    console.log("todo map is now", todoItemArray);
    setTodoItemArray(todoItemArray);
  }, [todoItemArray]);


  return (
    <>
      <div className = "flex items-center justify-center   ">
        <CustomModal updateTodos={addNewTodo} open = {open} handleClose = {() => {

          setOpen(false);

        }}
                     lastTodoID={todoItemArray.length}/>

      </div>
      <div className = "flex ml-20 items-center justify-center">
        <Kanban cards={todoItemArray}/>
      </div>


    </>
  )
};
export default Home;
