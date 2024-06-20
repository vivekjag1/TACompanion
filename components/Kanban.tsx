import react, {SetStateAction} from "react";
import {Board} from "./Board";
import {TodoItem} from "../mongoose/todo/schema";

interface KBProps{
  cards:TodoItem[];
}
export const Kanban = (props:KBProps) =>{
  return <div className = "h-screen w-full bg-white text-black"><Board cards={props.cards} /></div>
}