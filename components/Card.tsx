import {CustomDragIndicator} from "../components/CustomDragIndicator";
import {TodoItem} from "@/mongoose/todo/schema";
interface cardProps{
  title:string;
  id: number;
  role:string;
  description:string;
  course:string;
  column: string;
  columnColor: string;
  handleDragStart:(e: React.DragEvent<HTMLDivElement>, title: string, id: number, column: string) =>void;
}


export const Card = (props:cardProps) =>{
  console.log(` border-${props.columnColor}`);

  const test = `cursor-grab rounded border border-${props.columnColor} bg-white p-3 active:cursor-grabbing text-sm text-black text-center`

  return(
    <>
      <CustomDragIndicator beforeID = {props.id} column = {props.column}/>
      <div draggable={true} onDragStart = {(e)=>props.handleDragStart(e, props.title, props.id, props.column)} className = {test}>
        <p className = "mb-1.5">{`Title: ${props.title}`}</p>
        <p className = "mb-1.5">{`Course: ${props.course}`}</p>
        <p className = "mb-1.5"  >{`Role: ${props.role}`}</p>
        <p className = "mb-1.5" >{`Description: ${props.description}`}</p>

      </div>
    </>
  )

}