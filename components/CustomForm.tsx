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
  startTime:string;
  userName: string | null | undefined;
}
export const CustomForm = (props:formProps) =>{
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [startTime, setStartTime] = useState<string>(props.startTime);
  const [endTime, setEndTime] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  // @ts-ignore
  const handleClear = (e:MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault();
    setDescription("");
    setType("");
      setCourse("");
  }
  const handleSubmit  =(e: React.SyntheticEvent) =>{
    e.preventDefault();
    if(!description.length || !type.length || !startTime.length || !endTime.length||!course.length){
      toast.error("Please enter all fields!");
      return;
    }
    const newHours:HoursType = {
      title: type,
      courseCode:course,
      description:description,
      start:startTime,
      end:endTime,
      name: props.userName
    }
    props.setHours(newHours);
    props.handleClose();
    toast.success("Your hours were added!");
  };
  return (
    <form onSubmit={handleSubmit} style = {{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",

    }}>
      <Select value={type} onValueChange={(value) => setType(value)}>
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
      <Label className="text-left mt-5 w-full"> Start Time (EDT)
      <Input
        className="mt-5 w-full"
        value = {startTime}

      />
      </Label>

      <Label className="text-left mt-5 w-full"> End Time (EDT)
        <Input
          type="time"
          className="mt-5 w-full"
          value={endTime}
          onChange={(e)=>setEndTime(e.target.value)}
        />
      </Label>
      <div className = "flex flex-row px-5">
        <Button  variant="destructive" className="m-[2rem] w-[7rem]"  onClick = {(e) => handleClear(e)}>Clear</Button>
        <Button  variant="default" className="m-[2rem] w-[7rem] "  type = "submit" >Submit</Button>
        </div>
    </form>
  )
}