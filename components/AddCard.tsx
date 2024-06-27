import {FormEvent, SetStateAction, useState} from "react";
import {TodoItem} from "@/mongoose/todo/schema";
import AddIcon from '@mui/icons-material/Add';
import {gql} from "graphql-tag";
import client from "@/graphql/client";
import { useUser } from '@auth0/nextjs-auth0/client';
import{toast} from 'sonner';
interface addProps{
  column:string;
  setCards: React.Dispatch<SetStateAction<TodoItem[]>>;
  cards:TodoItem[];
  lastItemAdded: number;
}
export const AddCard = (props:addProps)=>{
  const { user, error, isLoading } = useUser();
  const [title, setTitle] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [description, setDescription] = useState<string>("")
  const [course, setCourse] = useState<string>("");
  const sendToBackend = (card: TodoItem) =>{
    const createTodo = gql `
        mutation addTodo(  $name:String, $title:String, $courseCode:String, $role:String, $status:String, $description:String ){
            addTodo( name:$name, title:$title, courseCode: $courseCode, role:$role, status: $status, description: $description){
                id
                title
                courseCode
            }
        }
    `;
    const executeQuery = async () =>{
      const data = await client.mutate({
        mutation: createTodo,
        variables: {
          name: user?.name,
          title:card.title,
          courseCode: card.courseCode,
          role: card.role,
          status: props.column,
          description: card.description
        }
      });
      card.id = data['data']['addTodo'].id;
      return data['data']['addTodo'].id;
    }
    executeQuery().then(console.log);
  }
  const [adding, setAdding] = useState<boolean>(false);
  const [numAdded, setNumAdded] = useState<number>(0);

  const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{

    setNumAdded(numAdded+1);

    e.preventDefault();

    const createdTodo = {
      id:props.cards.length + 2 + numAdded,
      title:title,
      courseCode: course,
      role: role,
      status:props.column,
      description: description,
    }
    toast.success("Task added!");
    props.setCards((prev)=>[...prev, createdTodo]);
    sendToBackend(createdTodo);
    setTitle("");
    setDescription("");
    setCourse("");
    setRole("");

    setAdding(false);
  }
  return(
    <>
      {adding? (
        <form onSubmit = {handleSubmit}>
          <div className = " rounded-lg    bg-white">
            <p className = "items-center font-black font-mono text-center">Create a new todo </p>

            <textarea
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              placeholder="Title"
              className="w-full rounded border border-blue-500 bg-blue-400/20 p-3 text-sm text-neutral-500 placeholder-black-300 focus:outline-o"/>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              autoFocus
              placeholder="Description"
              className="w-full rounded border border-blue-500 bg-blue-400/20 p-3 text-sm text-neutral-500 placeholder-black-300 focus:outline-o"/>
            <textarea
              onChange={(e) => setCourse(e.target.value)}
              autoFocus
              placeholder="Course Name"
              className="w-full rounded border border-blue-500 bg-blue-400/20 p-3 text-sm text-neutral-500 placeholder-black-300 focus:outline-o"/>
            <textarea
              onChange={(e) => setRole(e.target.value)}
              autoFocus
              placeholder="Role"
              className="w-full rounded border border-blue-500 bg-blue-400/20 p-3 text-sm text-neutral-500 placeholder-black-300 focus:outline-o"/>
          </div>
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button type="button" onClick={() => setAdding(false)}
                    className="px-3 py-1.5 text-xs text-black transition-colors hover:text-red-500">
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