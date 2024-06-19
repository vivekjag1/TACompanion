import {JSX} from "react";
import {Dialog} from "@mui/material"
import {CustomForm} from "../components/CustomForm";
interface ModalProps{
  open:boolean;
  handleClose: () => void;
  lastTodoID:number;
}
const CustomModal = (props:ModalProps):JSX.Element =>{
  return(
    <Dialog open = {props.open} onClose={props.handleClose}>
      <CustomForm handleClose = {props.handleClose} lastTodoID={props.lastTodoID}/>

    </Dialog>
  )

}

export default CustomModal;
