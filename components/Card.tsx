import {CustomDragIndicator} from "../components/CustomDragIndicator";
import DeleteIcon from '@mui/icons-material/Delete';
import {TodoItem} from "@/mongoose/todo/schema";
import client from "../graphql/client";
import {SetStateAction} from "react";
import gql from "graphql-tag";
interface cardProps{
  title:string;
  id: number;
  role:string;
  description:string;
  course:string;
  column: string;
  columnColor: string;
  handleDragStart:(e: React.DragEvent<HTMLDivElement>, title: string, id: number, column: string) =>void;
  setCards: React.Dispatch<SetStateAction<TodoItem[]>>;
  cards: TodoItem[]
}
export const Card = (props:cardProps) =>{
  const deleteQuery = async() => {
    const deleteItem = gql `
        mutation deleteTodo($id: Int){
            deleteTodo(id:$id){
                id
            }
        }
    `;
    const runQuery = async() =>{
      const execute = await client.mutate({
        mutation:deleteItem,
        variables:{
          id: props.id
        }
      });
      return execute;
    }
    await runQuery();
  }
  const handleDeleteTodo = async() => {
    const filtered = props.cards.filter((item) => item.id !== props.id);
    props.setCards(filtered);
    await deleteQuery();
  }
  const classNameString = `relative cursor-grab rounded border border-${props.columnColor} bg-white p-3 active:cursor-grabbing text-sm text-black text-center`
  return(
    <>
      <CustomDragIndicator beforeID = {props.id} column = {props.column}/>
      <div draggable={true} onDragStart = {(e)=>props.handleDragStart(e, props.title, props.id, props.column)} className = {classNameString}>
        <p className = "mb-1.5  ">{`Title: ${props.title}`}</p>
        <p className = "mb-1.5">{`Course: ${props.course}`}</p>
        <p className = "mb-1.5"  >{`Role: ${props.role}`}</p>
        <p className = "mb-1.5" >{`Description: ${props.description}`}</p>
        <DeleteIcon className = "absolute right-0 bottom-0" onClick={handleDeleteTodo}/>
      </div>
    </>
  )
}