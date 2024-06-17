import TodoCard from "@/components/TodoCard";
import client from "../graphql/client";
import { gql } from 'graphql-tag';
import {useEffect, useState} from "react";
import {TodoItem} from "@/mongoose/todo/schema";
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";

import "../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css";
import '../node_modules/@syncfusion/ej2-buttons/styles/bootstrap5.css';
import "../node_modules/@syncfusion/ej2-layouts/styles/bootstrap5.css";
import '../node_modules/@syncfusion/ej2-dropdowns/styles/bootstrap5.css';
import '../node_modules/@syncfusion/ej2-inputs/styles/bootstrap5.css';
import "../node_modules/@syncfusion/ej2-navigations/styles/bootstrap5.css";
import "../node_modules/@syncfusion/ej2-popups/styles/bootstrap5.css";
import "../node_modules/@syncfusion/ej2-react-kanban/styles/bootstrap5.css";
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
        const{_typeName, ...rest}  = item;
        return rest;
      });

      setTodoItems(cleanData);
      console.log(todoItems);
    }
    fetchData().then();
  }, [todoItems, setTodoItems, todoData])
  const test = {
    backgroundColor: 'lightgray'
  }

  return (
    <div className = "h-screen bg-white overflow-hidden">
      <h1 className = "text-2xl font-mono text-black text-center">
        Your Todo Items
      </h1>

      <div className="bg-white  items-center justify-center h-screen overflow-hidden ml-20 p-5 ">
        <KanbanComponent id = "kanban" keyField = "status" dataSource = {todoItems} cardSettings = {{contentField: "description", headerField:"title"}} style = {test}>
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
