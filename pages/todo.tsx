import TodoCard from "@/components/TodoCard";
import client from "../graphql/client";
import { gql } from 'graphql-tag';
import {useEffect, useState} from "react";
import {TodoItem} from "@/mongoose/todo/schema";
import { KanbanComponent, ColumnsDirective, ColumnDirective, CardSettingsModel, DragEventArgs } from "@syncfusion/ej2-react-kanban";

import "../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css";
import '../node_modules/@syncfusion/ej2-buttons/styles/bootstrap5.css';
import "../node_modules/@syncfusion/ej2-layouts/styles/bootstrap5.css";
import '../node_modules/@syncfusion/ej2-dropdowns/styles/bootstrap5.css';
import '../node_modules/@syncfusion/ej2-inputs/styles/bootstrap5.css';
import "../node_modules/@syncfusion/ej2-navigations/styles/bootstrap5.css";
import "../node_modules/@syncfusion/ej2-popups/styles/bootstrap5.css";
import "../node_modules/@syncfusion/ej2-react-kanban/styles/bootstrap5.css";
interface updateInterface{
  id:number;
  newAttribute:string;
  attrValue:string;
}
const Home = () =>{
  interface updateInterface{
    id:number;
    newAttribute:string;
    attrValue:string;
  }
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  let updatedItems = new Map();
  const todoData  = gql `
      query {
          findAllTodoItems {
              title
              courseCode
              description
              status
              role
              __typename
          }
      }
  `;
//   useEffect(() =>{
//     async function fetchData(){
//       const data = await client.query({
//         query:todoData
//       });
//
//       const cleanData = data['data']['findAllTodoItems'].map((item:TodoItem) =>{
//         const{_typeName, ...rest}  = item;
//         return rest;
//       });
//
//       setTodoItems(cleanData);
//       console.log(todoItems);
//     }
//     fetchData().then();
//   }, []);// eslint-disable-line
//   const test = {
//     backgroundColor: 'lightgray',
//     borderRadius:"1rem"
//   }
//   useEffect(() =>{
//     const updateTodo = gql `
//       mutation updateStatus($id:Int, $newAttribute:String, $attrValue:String){
//           changeValue(id:$id, newAttribute: $newAttribute, attrValue: $attrValue){
//               courseCode
//           }
//       }
//     `;
//
// const fetch = async () => {
//   const {data} = await client.mutate({
//     mutation: updateTodo,
//     variables: {
//       id: -1,
//       newAttribute: "courseCode",
//       attrValue: "ThisWorked"
//     }
//   });
//   console.log(data);
//   return data;
// }
//  fetch().then(console.log)
// });








  const cardtemplate = (data:TodoItem) =>{
    return(

      <div className = "hover:shadow-2xl">
      <div className = "text-center font-bold text-lg">{data.title as string}</div>
      <div className = "text-center">{`Description: ${data.description as string}`}</div>
        <div className = "text-center">{`Course: ${data.courseCode as string}`}</div>
         <div className = "text-center" >{`Role: ${data.role as string}`}</div>
      </div>
    )
  }

  const updateCard =  (card:DragEventArgs ) =>{
    const updatedCard = card.data;
    console.log("Updated", updatedCard);
    updatedItems.set(updatedCard[0].id, updatedCard[0]);
    console.log(updatedItems);
  }
  const mycardSettings:CardSettingsModel = {
    contentField: "description",
    headerField : "title",
    template :cardtemplate,

  };

  return (
    <div className = "h-screen bg-white overflow-hidden">
      <h1 className = "text-2xl font-mono text-black text-center">
        Your Todo Items
      </h1>

      <div className="bg-white  items-center justify-center h-screen overflow-hidden ml-20 p-5 ">

        <KanbanComponent id = "kanban" keyField = "status" dataSource = {todoItems} cardSettings = {mycardSettings} style = {test}  dragStop ={updateCard} >
          <ColumnsDirective>
            <ColumnDirective headerText = "Not Started" keyField="notStarted"  />
            <ColumnDirective headerText = "In Progress" keyField="started"/>
            <ColumnDirective headerText = "In Review/Need Help" keyField="review"/>
            <ColumnDirective headerText = "Done" keyField="done"/>
          </ColumnsDirective>
        </KanbanComponent>
      </div>
    </div>
  )
};
//why

export default Home;
