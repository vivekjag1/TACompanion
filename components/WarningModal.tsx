import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface warningProps{
  open:boolean;
  acknowledged:boolean;
  setAcknowledged: () => void;
  onClose: () => void;
}
export function WarningModal(props:warningProps) {
  return (
    <AlertDialog open={props.open}>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className = "text-center text-xl">You have logged more than 10 hours this week!</AlertDialogTitle>
          <AlertDialogDescription className="text-center font-bold ">
           The department of Computer Science at WPI does not recommend working more than 10 hours a week to ensure academic success and adequate free time. Please reconsider the number of hours you are working each week.
            If you are not employed by the department of CS, you should still consider working less to ensure academic success and wellbeing.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() =>{
            props.setAcknowledged();
            props.onClose();
          }}>I understand</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
