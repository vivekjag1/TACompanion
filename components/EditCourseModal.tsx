import {JSX, SetStateAction, useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type {HoursType} from "@/mongoose/timeWorked/schema";
import {CustomForm} from "@/components/CustomForm";
import {UpdateEventForm} from "@/components/UpdateEventForm";
import {CourseItem} from "@/mongoose/course/schema";
import {UpdateCourseForm} from "@/components/UpdateCourseForm";

interface ModalProps{
  //props related to opening and closing
  open:boolean;
  handleClose: () => void;
  //the event itself that was clicked, and a function to update the state
  course: CourseItem;
  changeCourse:(course:CourseItem, toReplace:string, action:string) => void;


  // setCourse: (aCourse: CourseItem) => void;
}

const EditCourseModal = (props:ModalProps):JSX.Element =>{
  return(
    <>
      <Dialog open={props.open} onOpenChange={(isOpen) => { if (!isOpen) props.handleClose(); else props.open = true }}>
        <DialogContent>
          <DialogHeader className = "flex items-center font-black font-mono text-3xl">
            <DialogTitle className="text-3xl" >Edit a course </DialogTitle>
            <DialogDescription className = "text-lg text-center font-black">Update your academic and SA work</DialogDescription>
          </DialogHeader>
          <UpdateCourseForm handleClose={props.handleClose} changeCourse={props.changeCourse} course={props.course}/>
          <DialogFooter>
            <button onClick={props.handleClose}>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditCourseModal;