import client from "../graphql/client";
import { gql } from 'graphql-tag';
import {useEffect, useState} from "react";
import {TodoItem} from "@/mongoose/todo/schema";
import CustomModal from "../components/CustomModal";
import { KanbanComponent, ColumnsDirective, ColumnDirective, CardSettingsModel, DragEventArgs } from "@syncfusion/ej2-react-kanban";
import "../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css";
import '../node_modules/@syncfusion/ej2-buttons/styles/bootstrap5.css';
import "../node_modules/@syncfusion/ej2-layouts/styles/bootstrap5.css";
import '../node_modules/@syncfusion/ej2-dropdowns/styles/bootstrap5.css';
import '../node_modules/@syncfusion/ej2-inputs/styles/bootstrap5.css';
import "../node_modules/@syncfusion/ej2-navigations/styles/bootstrap5.css";
import "../node_modules/@syncfusion/ej2-popups/styles/bootstrap5.css";
import "../node_modules/@syncfusion/ej2-react-kanban/styles/bootstrap5.css";
import {Button} from "@mui/material";
const Home = () =>{
  const[open, setOpen] = useState<boolean>(false);
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [updated, setUpdated] = useState<boolean>(false);
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
  let updatedTodos:TodoItem[] = [];
  useEffect(() =>{
    async function fetchData(){
      const data = await client.query({
        query:todoData
      });

      const cleanData = data['data']['findAllTodoItems'].map((item:TodoItem) =>{
        const{__typeName, ...rest}  = item;
        return rest;
      });
      setTodoItems(cleanData);
      return cleanData;
    }
    fetchData().then(console.log);
  }, [updated]);// eslint-disable-line
  const cardStyle = {
    backgroundColor: 'lightgray',
    borderRadius:"1rem"
  }
  useEffect(() =>{

  },[updated]);
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
  const updateCard =  (card:DragEventArgs ) =>{
    setUpdated(!updated);
    const updatedCard = card.data;
    setUpdated(true);
    mutateTodo(updatedCard[0].id, "status", updatedCard[0].status).then();
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
    // console.log("updated todo", newTodo);
    // setUpdated(false);
    // const newArr:TodoItem[] = [];
    // updatedTodos.push(newTodo);
    // todoItems.push(newTodo);
    // const union = newArr.concat(todoItems);
    // setTodoItems(union);
    // setUpdated(true);
  }



  return (
    <>
      <div className = "flex items-center justify-center  ">
        <CustomModal updateTodos={addNewTodo} open = {open} handleClose = {() => {
          setUpdated(!updated);
          setOpen(false);
        setUpdated(true);
        }}
                     lastTodoID={todoItems.length}/>
      </div>

      <div className=" flex flex-col justify-between h-screen bg-white ">
        <h1 className="text-4xl font-mono font-bold text-black text-center">
          Your Todo Items
        </h1>
        <div className=" mt-5 flex flex-row items-center justify-center space-x-5">
          <Button variant = "contained" style = {{backgroundColor:"blue"}}  onClick = {() => setOpen(true)}>New Todo Item </Button>
          <Button variant = "contained" style = {{backgroundColor:"red"}} onClick = {handleDeleteAll}>Delete All </Button>
        </div>

        <div className="bg-white  items-center justify-center h-screen  ml-20 p-5 ">

          <KanbanComponent id = "kanban" keyField = "status" dataSource = {todoItems.concat(updatedTodos)} cardSettings = {{
            contentField: "description",
            headerField : "title",
            template :cardTemplate,
          }}   dragStop ={updateCard} cssClass = "kanban-overview">
            <ColumnsDirective>
              <ColumnDirective headerText = "Not Started" keyField="notStarted"  />
              <ColumnDirective headerText = "In Progress" keyField="started"/>
              <ColumnDirective headerText = "In Review/Need Help" keyField="review"/>
              <ColumnDirective headerText = "Done" keyField="done"/>
            </ColumnsDirective>
          </KanbanComponent>
        </div>
      </div>
    </>
  )
};
export default Home;
