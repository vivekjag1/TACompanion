import client from "../graphql/client";
import { gql } from 'graphql-tag';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from "react";
import MenuItem from '@mui/material/MenuItem';



interface formProps{
  handleClose: () => void;


}
export const CustomForm = (props:formProps) =>{

  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [course, setCourse] = useState<string>("");

  const handleClear = () =>{
    setTitle("");
    setType("");
    setRole("");
    setCourse("");
  }

  const handleSubmit  =(e: React.SyntheticEvent) =>{
    e.preventDefault();
    props.handleClose();


  };

  const customStyles = {
    marginBottom:"1rem",
    width:"25rem",
    font:"black"


  }



  return (
    <form onSubmit={handleSubmit} style = {{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      padding:"2rem",

    }}>
      <h1 className="text-3xl font-mono font-black mb-5">Log hours</h1>
      <TextField
        select
        label="Type of Work"
        value={type}
        onChange={(e) => setType(e.target.value)}
        variant="filled"
        fullWidth
        required
        sx={customStyles}
        className="bg-gray-50"
      >
        <MenuItem value = {"Office Hours"}>Office Hours</MenuItem>
        <MenuItem value = {"Meeting"}>Meeting</MenuItem>
        <MenuItem value = {"Grading"}>Grading</MenuItem>
      </TextField>
      <TextField label = "Title" className = "bg-gray-50" fullWidth variant="filled" required sx = {customStyles} value={title} onChange={(e) => setTitle(e.target.value)}/>
      <TextField label = "Course" className = "bg-gray-50" variant="filled" required sx = {customStyles} value = {course} onChange={(e) => setCourse(e.target.value)}/>



      <div className = "flex flex-row px-5">
        <Button variant = "contained"  sx = {{margin:"2rem", backgroundColor:"red"}} onClick = {handleClear}>Clear</Button>
        <Button variant = "contained" type = "submit" sx = {{margin:"2rem"}} onClick = {handleSubmit}>Submit</Button>
      </div>
    </form>
  )
}