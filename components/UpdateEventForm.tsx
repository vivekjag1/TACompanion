import { Button } from "@/components/ui/button"
import { useState} from "react";
import { Label } from "@/components/ui/label"
import type {HoursType} from "../mongoose/timeWorked/schema"
import moment from 'moment-timezone';
moment.tz.setDefault('America/New_York');
import{toast} from 'sonner';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
interface formProps{
  handleClose: () => void;
  setHours:(hour: HoursType) => void;
  event:HoursType
}
//TODO: need to refactor so that all the fields in the form START with information from the todo
export const UpdateEventForm = (props:formProps) =>{
  const getType = () => {
    if((props.event.title as string).includes('office hours')){
      return 'office hours';
    }
    else if((props.event.title as string).includes('Grading')){
      return 'Grading';
    }
    else{
      return 'meeting'
    }
  };

  const indexT = (props.event.start as string).indexOf("T");
  const indexDash = (props.event.start as string).length -  9;

  const[title, setTitle] = useState<string>(getType());
  const[description, setDescription] = useState<string>(props.event.description as string);
  const [startTime, setStartTime] = useState<string>((props.event.start as string).substring(indexT + 1, indexDash));
  const [endTime, setEndTime] = useState<string>((props.event.end as string).substring(indexT + 1, indexDash));
  const [course, setCourse] = useState<string>(props.event.courseCode as string);


  // @ts-ignore
  const resetToDefault = (e:MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault();
    setTitle(getType());
    setDescription(props.event.description as string);
    setStartTime((props.event.start as string).substring(indexT + 1, indexDash));
    setEndTime((props.event.end as string).substring(indexT + 1, indexDash));
    setCourse(props.event.courseCode as string);
  }

  const handleSubmit  = (e: React.SyntheticEvent) =>{
    e.preventDefault();
    //2024-06-27T10:55:00-04:00

    const indexT = (props.event.start as string).indexOf("T");
    const indexDash = (props.event.start as string).length -  9;
    const date = (props.event.start as string).substring(0, indexT);
    const end =  new Date(date.concat("T").concat(endTime).concat(':00-04:00'));
    const start = new Date(date.concat("T").concat(startTime).concat(':00-04:00'));


    console.log("Start", (props.event.start as string).substring(indexT + 1, indexDash));
    console.log("end", moment(end).format());

    //TODO: need        an object for state and another one for the backend since the state one has to work with react FC



    const newHours:HoursType = {
      title: `Type: ${title}, Description: ${description},  (ID:${props.event.id})`,
      courseCode:course,
      description:description,
      start:moment(start).format(),
      end:moment(end).format(),
      // start:date.concat("T").concat(startTime).concat(':00-04:00'),
      // end:date.concat("T").concat(endTime).concat(':00-04:00'),
      name: props.event.name as string
    }
    console.log("new hours is", newHours);

    //TODO: update backend on form submission



    props.setHours(newHours);
    props.handleClose();
    toast.success("Your hours were updated!");
  };
  return (
    <form onSubmit={handleSubmit} style = {{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",

    }}>
      <Select value={title} onValueChange={(value) => setTitle(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a type"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value = "office hours">Office Hours</SelectItem>
            <SelectItem value = "meeting">Meeting</SelectItem>
            <SelectItem value = "Grading">Grading</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input value={course} className="mt-5" placeholder="Enter Course Code" onChange={(e)=>setCourse(e.target.value)}/>
      <Textarea value={description} className="mt-5" placeholder="Add a description" onChange={(e)=>setDescription(e.target.value)}/>
      <Label className="text-left mt-5 w-full"> Updated Start Time (EDT)
        <Input
          type = "time"
          className="mt-5 w-full"
          value = {startTime}
          onChange={(e)=>setStartTime(e.target.value)}
        />
      </Label>

      <Label className="text-left mt-5 w-full"> Update End Time (EDT)
        <Input
          type="time"
          className="mt-5 w-full"
          value={endTime}
          onChange={(e)=>setEndTime(e.target.value)}
        />
      </Label>
      <div className = "flex flex-row px-5">
        <Button  variant="destructive" className="m-[2rem] w-[7rem]"  onClick = {(e) => resetToDefault(e)}>Clear</Button>
        <Button  variant="default" className="m-[2rem] w-[7rem] "  type = "submit" >Submit</Button>
      </div>
    </form>
  )
}