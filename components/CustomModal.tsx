import {JSX} from "react";
import {Dialog} from "@mui/material"
import {CustomForm} from "../components/CustomForm";
import {TodoItem} from "@/mongoose/todo/schema";
interface ModalProps{
  open:boolean;
  handleClose: () => void;
  startTime: Date

}
const CustomModal = (props:ModalProps):JSX.Element =>{
  return(
    <Dialog open = {props.open} onClose={props.handleClose}>
      <CustomForm handleClose = {props.handleClose}  />

    </Dialog>
  )

}

export default CustomModal;
