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
  const[title, setTitle] = useState<string>(getType());
  const[description, setDescription] = useState<string>(props.event.description as string);
  const [startTime, setStartTime] = useState<string>(props.event.start as string);
  const [endTime, setEndTime] = useState<string>(props.event.end as string);
  const [course, setCourse] = useState<string>(props.event.courseCode as string);


  // @ts-ignore
  const resetToDefault = (e:MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault();
    setTitle(props.event.title as string);
    setDescription(props.event.description as string);
    setStartTime(props.event.start as string);
    setEndTime(props.event.end as string);
    setCourse(props.event.courseCode as string);
  }

  const handleSubmit  = (e: React.SyntheticEvent) =>{
    e.preventDefault();

    //TODO: need an object for state and another one for the backend since the state one has to work with react FC
    const newHours:HoursType = {
      title: `${title} (ID:${props.event.id})`,
      courseCode:course,
      description:description,
      start:startTime,
      end:endTime,
      name: props.event.name as string
    }

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
      <Label className="text-left mt-5 w-full"> Updated Start Time (EDT) [Leave blank for no change]
        <Input
          type = "time"
          className="mt-5 w-full"
          value = {startTime}
          onChange={(e)=>setStartTime(e.target.value)}
        />
      </Label>

      <Label className="text-left mt-5 w-full"> End Time (EDT) [Leave blank for no change]
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