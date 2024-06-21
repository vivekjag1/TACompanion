import {TodoItem} from "../mongoose/todo/schema";
import {SetStateAction, useEffect, useState} from "react";
import {Card} from "../components/Card";
import {CustomDragIndicator} from "@/components/CustomDragIndicator";
import {AddCard} from "../components/AddCard";
import {gql} from "graphql-tag";
import client from "@/graphql/client";
interface columnProps{
  title:string;
  headingColor:string;
  column:string;
  cards: TodoItem[];
  setCards: React.Dispatch<SetStateAction<TodoItem[]>>;

}
export const Column = (props:columnProps) =>{
  const [hover, setHover] = useState<boolean>(false);
  const filteredTodos = props.cards.filter((card)=> card.status === props.column);
  useEffect(()=>{
    console.log("filter", filteredTodos);
  }, [filteredTodos]);

  const index = props.headingColor.indexOf("-");
  const color = props.headingColor.substring(index + 1);



  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, title:string, id:number, col:string) =>{
    e!.dataTransfer!.setData("cardID", String(id));
    console.log("e is", e);
  }

  const handleDragOver = (e:React.DragEvent<HTMLDivElement>) =>{
    e.preventDefault();
    setHover(true);
  }
  const handleDragLeave = (e:React.DragEvent<HTMLDivElement>) =>{
    e.preventDefault();
    setHover(false);
  }
  const handleDragEnd = (e:React.DragEvent<HTMLDivElement>) =>{
    e.preventDefault();
    setHover(false);
    const cardID = e.dataTransfer.getData("cardID");
    let copy = props.cards;
    let cardToMove = copy.find((c) => c.id == +cardID);
    if(!cardToMove) return ;
    cardToMove.status = props.column;
    copy = copy.filter((card) => card.id !== +cardID);
    copy.push(cardToMove);
    props.setCards(copy);
    console.log("drag done", props.cards);
    updateTodo(cardToMove).then();
    console.log("finished maketodo");



  }
  const highlightIndicator = (e:React.DragEvent<HTMLDivElement>) =>{
    const indicators = getIndicators();
    console.log(indicators);
  }

  const getIndicators = () =>{
    return Array.from(document.querySelectorAll(`[data-column="${props.column}"]`));

  }



  const updateTodo = async(card: TodoItem) =>{

    const createTodo = gql `
        mutation changeValue($id:Int, $newAttribute:String, $attrValue:String ){
            changeValue(id:$id, newAttribute:$newAttribute, attrValue: $attrValue){
                id 
                title
                courseCode
            }
        }
    `;
    const data = await client.mutate({
      mutation: createTodo,
      variables: {
        id:card.id,
        newAttribute: "status",
        attrValue: props.column
      }
    });
    return props.cards;
  };












  const fetchIndicators = () =>{
    return Array.from(document.querySelectorAll(`[data-column="${props.column}"`));
  }

  return(
    <div className = "w-[20rem] shrink-0">
      <div className = "mb-3 flex items-center justify-between">
        <h3 className = {`font-medium ${props.headingColor}`}>
          {props.title}
        </h3>
        <span className = "rounded text-sm text-neutral-400">{filteredTodos.length}</span>
      </div>
      <div onDragOver = {handleDragOver} onDragLeave = {handleDragLeave} onDrop = {handleDragEnd} className = {`h-full w-full transition-colors ${hover? "bg-gray-200":"bg-white"}`}>
        {filteredTodos.map((todo:TodoItem) =>{
          // eslint-disable-next-line react/jsx-key
          return <Card id = {todo.id as number} title = {todo.title as string} columnColor = {color} column = {todo.status as string}  role = {todo.role as string} description = {todo.description as string} course = {todo.courseCode as string}handleDragStart = {handleDragStart}/>
        })}
        <CustomDragIndicator beforeID = {-1} column = {props.column}/>
        <AddCard column={props.column} setCards={props.setCards} cards={props.cards} lastItemAdded={props.cards.length}/>
      </div>
    </div>
  )

}