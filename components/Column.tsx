import {TodoItem} from "../mongoose/todo/schema";
import {SetStateAction, useState} from "react";
import {Card} from "../components/Card";
import {CustomDragIndicator} from "@/components/CustomDragIndicator";
import {AddCard} from "../components/AddCard";
interface columnProps{
  title:string;
  headingColor:string;
  column:string;
  cards: TodoItem[];
  setCards: React.Dispatch<SetStateAction<TodoItem[]>>;
}
export const Column = (props:columnProps) =>{
  const [hover, setHover] = useState<boolean>(false);
  console.log("todos", props.cards);
  const filteredTodos = (Array.from(props.cards.values())).filter((card) => card.status === props.column);

  return(
    <div className = "w-[20rem] shrink-0">
      <div className = "mb-3 flex items-center justify-between">
        <h3 className = {`font-medium ${props.headingColor}`}>
          {props.title}
        </h3>
        <span className = "rounded text-sm text-neutral-400">{filteredTodos.length}</span>
      </div>
      <div className = {`h-full w-full transition-colors ${hover? "bg-gray-200":"bg-white"}`}>
        {filteredTodos.map((todo:TodoItem) =>{
          return <Card key = {todo.id as number} title = {todo.title as string} column = {todo.status as string}/>
        })}
        <CustomDragIndicator beforeID = {-1} column = {props.column}/>
        <AddCard column={props.column} setCards={props.setCards} cards={props.cards} lastItemAdded={props.cards.length}/>
      </div>
    </div>
  )

}