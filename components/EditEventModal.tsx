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

interface ModalProps{
  //props related to opening and closing
  open:boolean;
  handleClose: () => void;
  //the event itself that was clicked, and a function to update the state
  event:HoursType;
  setHours:(hour: HoursType, action:string) => void;
}

const EditEventModal = (props:ModalProps):JSX.Element =>{
  return(
    <>
      <Dialog open={props.open} onOpenChange={(isOpen) => { if (!isOpen) props.handleClose(); else props.open = true }}>
        <DialogContent>
          <DialogHeader className = "flex items-center font-black font-mono text-3xl">
            <DialogTitle className="text-3xl" >Edit an event</DialogTitle>
            <DialogDescription className = "text-lg text-center font-black">Update meetings, office hours, and grading</DialogDescription>
          </DialogHeader>
          <UpdateEventForm handleClose={props.handleClose} setHours={props.setHours} event={props.event}/>
          <DialogFooter>
            <button onClick={props.handleClose}>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditEventModal;