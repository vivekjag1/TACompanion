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
import {AddCourseForm} from "@/components/AddCourseForm";
interface ModalProps{
  open:boolean;
  handleClose: () => void;

}
const CreateCourseModal = (props:ModalProps):JSX.Element =>{
  return(
    <>
      <Dialog open={props.open} onOpenChange={(isOpen) => { if (!isOpen) props.handleClose(); else props.open = true }}>
        <DialogContent>
          <DialogHeader className = "flex items-center font-black font-mono text-3xl">
            <DialogTitle className="text-3xl" >Add a course</DialogTitle>
            <DialogDescription className = "text-lg text-center font-black">Keep track of requirements, credits, and more</DialogDescription>
          </DialogHeader>
          <AddCourseForm handleClose={props.handleClose} />
          <DialogFooter>
            <button onClick={props.handleClose}>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateCourseModal;
