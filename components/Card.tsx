import {CustomDragIndicator} from "../components/CustomDragIndicator";
import {TodoItem} from "@/mongoose/todo/schema";
interface cardProps{
  title:string;
  id: number;
  column: string;
  handleDragStart:(e: React.DragEvent<HTMLDivElement>, title: string, id: number, column: string) =>void;
}


export const Card = (props:cardProps) =>{


  return(
    <>
      <CustomDragIndicator beforeID = {props.id} column = {props.column}/>
      <div draggable={true} onDragStart = {(e)=>props.handleDragStart(e, props.title, props.id, props.column)}>
        <p  className = "cursor-grab rounded border border-neutral-700 bg-white p-3 active:cursor-grabbing text-sm text-black">{`Title: ${props.title}`}</p>
      </div>
    </>
  )

}