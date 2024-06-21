import {JSX} from "react";
import {Dialog} from "@mui/material"
import {CustomForm} from "../components/CustomForm";
import {TodoItem} from "@/mongoose/todo/schema";
interface ModalProps{
  open:boolean;
  handleClose: () => void;
  lastTodoID:number;
  updateTodos: (newItem: TodoItem) => void;
}
const CustomModal = (props:ModalProps):JSX.Element =>{
  return(
    <Dialog open = {props.open} onClose={props.handleClose}>
      <CustomForm handleClose = {props.handleClose} lastTodoID={props.lastTodoID} updateTodos={props.updateTodos}/>

    </Dialog>
  )

}

export default CustomModal;
