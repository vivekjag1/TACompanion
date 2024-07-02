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
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface ModalProps{
  //props related to opening and closing
  open:boolean;
  handleClose: () => void;
  currentWage:string;
  setWage: (wage:string) => void;

}

const WageModal = (props:ModalProps):JSX.Element =>{
  const [wage, setWage] = useState<string>(props.currentWage as string);

  const handleSubmit =  (e: React.SyntheticEvent) =>{
    e.preventDefault();
    props.setWage(wage);
    props.handleClose();
    return;
  }


  return(
    <>
      <Dialog open={props.open} onOpenChange={(isOpen) => { if (!isOpen) props.handleClose(); else props.open = true }}>
        <DialogContent>
          <DialogHeader className = "flex items-center font-black font-mono text-3xl">
            <DialogTitle className="text-3xl" >Change hourly wage</DialogTitle>
            <DialogDescription className = "text-lg text-center font-black">Create an accurate estimate of your earnings</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Input
              type ="number"
              className="mt-5 w-full"
              value={wage.toString()}
              onChange={(e) => setWage((e.target.value).substring(0, 5))}
            />
            <div className="flex flex-row px-5">
              <Button variant="destructive" className="m-[2rem] w-[7rem]" type="button" onClick={() => setWage("16.50")}>Clear </Button>
              <Button variant="default" className="m-[2rem] w-[7rem] " type="submit">Submit</Button>
            </div>

          </form>


          <DialogFooter>
            <button onClick={props.handleClose}>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default WageModal;