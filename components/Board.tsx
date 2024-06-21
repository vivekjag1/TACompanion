import {SetStateAction, useState} from "react";
import {TodoItem} from "../mongoose/todo/schema";
import {Column} from "./Column";


interface BoardProps{
  cards:TodoItem[];

}
export const Board = (props:BoardProps) =>{
  const [cardsMap, setCardsMap] = useState<TodoItem[]>(props.cards);

  return (
    <div className = "flex h-full  justify-center w-full gap-3  p-12">
      <Column
        title="Not Started"
        column = "notStarted"
        headingColor = "text-red-500"
        cards = {cardsMap}
        setCards = {setCardsMap}
        />
<Column
        title="In Progress"
        column = "started"
        headingColor = "text-yellow-500"
        cards = {cardsMap}
        setCards = {setCardsMap}

/>
      <Column
        title="Review/Need Help"
        column = "review"
        headingColor = "text-orange-500"
        cards = {cardsMap}
        setCards = {setCardsMap}

      />
       <Column
        title="Done"
        column = "done"
        headingColor = "text-green-500"
        cards = {cardsMap}
        setCards = {setCardsMap}

       />




  </div>
  )
}