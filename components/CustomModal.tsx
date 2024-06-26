import {JSX, SetStateAction} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type {HoursType} from "@/mongoose/timeWorked/schema";

import {CustomForm} from "../components/CustomForm";
interface ModalProps{
  open:boolean;
  handleClose: () => void;
  startTime: Date;
  setHours:(hour: HoursType) => void;
  userName: string | null | undefined;
}
const CustomModal = (props:ModalProps):JSX.Element =>{
  return(
    <>
      <Dialog open={props.open} onOpenChange={(isOpen) => { if (!isOpen) props.handleClose(); else props.open = true }}>
        <DialogContent>
          <DialogHeader className = "flex items-center font-black font-mono text-3xl">
            <DialogTitle className="text-3xl" >Log Your Hours</DialogTitle>
            <DialogDescription className = "text-lg text-center font-black">Log meetings, office hours, and grading</DialogDescription>
          </DialogHeader>
          <CustomForm handleClose={props.handleClose} setHours = {props.setHours} startTime = {props.startTime.toLocaleTimeString()} userName = {props.userName}/>
          <DialogFooter>
            <button onClick={props.handleClose}>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
</>
  )
}

export default CustomModal;
