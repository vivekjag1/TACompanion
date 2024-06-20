import {FormEvent, SetStateAction, useState} from "react";
import {TodoItem} from "@/mongoose/todo/schema";
import AddIcon from '@mui/icons-material/Add';
interface addProps{
  column:string;
  setCards: React.Dispatch<SetStateAction<TodoItem[]>>;
  cards:TodoItem[];
  lastItemAdded: number;

}
export const AddCard = (props:addProps)=>{
  const [text, setText] = useState<string>("");
  const [adding, setAdding] = useState<boolean>(false);
  const [numAdded, setNumAdded] = useState<number>(0);
  const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
    console.log("inside handle submit");
    e.preventDefault();
    if(text.trim().length==0) return;
    const newTodo:TodoItem = {
      id: props.lastItemAdded + numAdded + 1,
      title: text.trim(),
      description: text.trim(),
      role:"Student",
      status:props.column,
      courseCode: "dummy"
    }
    props.setCards((prev)=>[...prev, newTodo]);
    console.log("cards is now", props.cards);
    setAdding(false);
  }
  return(
    <>
      {adding? (
        <form onSubmit = {handleSubmit}>



          <textarea
            onChange = {(e)=>setText(e.target.value)}
            autoFocus
            placeholder="Add a new todo..."
            className = "w-full rounded border border-blue-500 bg-blue-400/20 p-3 text-sm text-neutral-500 placeholder-black-300 focus:outline-o"/>









          <div className = "mt-1.5 flex items-center justify-end gap-1.5">
            <button type = "button" onClick={() => setAdding(false)}
                    className = "px-3 py-1.5 text-xs text-black transition-colors hover:text-red-500">
              Close
            </button>
            <button type = "submit"
                    className = "px-3 py-1.5 text-xs text-black transition-colors hover:text-green-500">
              Submit
            </button>
          </div>
        </form>



      ): <button  onClick={() => setAdding(true)} className = "flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-black transition-colors hover:text-gray">
        <span>Add Todo</span>
        <AddIcon/>
      </button>
      }


    </>
  )




}