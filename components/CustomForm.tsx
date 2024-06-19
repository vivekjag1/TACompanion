import client from "../graphql/client";
import { gql } from 'graphql-tag';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {styled} from "@mui/system";
import {useState} from "react";
import {TodoItem} from "@/mongoose/todo/schema";

interface formProps{
  handleClose: () => void;
  lastTodoID:number;
  updateTodos: (newItem: TodoItem) => void;

}


export const CustomForm = (props:formProps) =>{

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [course, setCourse] = useState<string>("");

  const handleClear = () =>{
    setTitle("");
    setDescription("");
    setRole("");
    setCourse("");
  }

  const handleSubmit  =(e: React.SyntheticEvent) =>{
    console.log("course is", course);
    e.preventDefault();
    console.log(title, description, role, course);
    props.handleClose();

    const newItem:TodoItem = {
      id:props.lastTodoID,
      title:title,
      courseCode: course,
      role: role,
      status:"inProgress",
      description: description
    };
    props.updateTodos(newItem);

    //graphql logic to make a todo item
    const makeTodo  = async () => {
      const createTodo = gql `
          mutation createTodo($id:Int, $title:String, $status:String, $courseCode:String, $role:String, $description:String){
              addTodo(id:$id, title:$title, status: $status, courseCode: $courseCode, role:$role, description: $description){
                  id
                  status
                  courseCode
              }
          }
      `;
      const data = await client.mutate({
        mutation:createTodo,
        variables:{
          id: props.lastTodoID,
          title: title,
          courseCode: course,
          role: role,
          description: description,
          status:"notStarted"
        }
      });
      return data
    }
    makeTodo().then(console.log);
  };

  const customStyles = {
    marginBottom:"1rem",
    width:"25rem",


  }

  return (
    <form onSubmit={handleSubmit} style = {{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      padding:"2rem"
    }}>
      <h1 className="text-3xl font-mono font-black mb-5">Create a Todo Item</h1>
      <TextField label = "Title" className = "bg-gray-50" fullWidth variant="filled" required sx = {customStyles} value={title} onChange={(e) => setTitle(e.target.value)}/>
      <TextField label = "Description" className = "bg-gray-50" variant="filled" required sx = {customStyles} value = {description} multiline onChange =  {(e) => setDescription(e.target.value)}/>
      <TextField label = "Course" className = "bg-gray-50" variant="filled" required sx = {customStyles} value = {course} onChange={(e) => setCourse(e.target.value)}/>
      <TextField label = "Role" className = "bg-gray-50" variant="filled" required sx = {customStyles} value = {role} onChange={(e) => setRole(e.target.value)}/>
      <div className = "flex flex-row px-5">
        <Button variant = "contained"  sx = {{margin:"2rem", backgroundColor:"red"}} onClick = {handleClear}>Clear</Button>
        <Button variant = "contained" type = "submit" sx = {{margin:"2rem"}} onClick = {handleSubmit}>Submit</Button>
      </div>
    </form>
  )
}