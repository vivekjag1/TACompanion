import { Button } from "@/components/ui/button"
import { useState} from "react";
import { Label } from "@/components/ui/label"
import client from "../graphql/client"
import type {HoursType} from "@/mongoose/timeWorked/schema"
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
import gql from "graphql-tag";
interface formProps{
  handleClose: () => void;
  setHours:(hour: HoursType, action:string) => void;
  event:HoursType;
}
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

  const handleSubmit  = (e: React.SyntheticEvent) =>{
    e.preventDefault();

    const indexT = (props.event.start as string).indexOf("T");
    const indexDash = (props.event.start as string).length -  9;
    const date = (props.event.start as string).substring(0, indexT);
    const end =  new Date(date.concat("T").concat(endTime).concat(':00-04:00'));
    const start = new Date(date.concat("T").concat(startTime).concat(':00-04:00'));
    const newHours:HoursType = {
      title: `Type: ${title}, Description: ${description},  (ID: ${props.event.id})`,
      courseCode:course,
      description:description,
      start:moment(start).format(),
      end:moment(end).format(),
      name: props.event.name as string
    }
    const changedHour:HoursType = {
      title: `${title} (ID: ${props.event.id as string})`,
      courseCode: course,
      description: description,
      start:  moment(start).format(),
      end:moment(end).format(),
      name: props.event.name as string
    };
    const updateMutation = gql `
      mutation updateMutation($id:Int, $title:String, $courseCode:String, $description:String, $start:String, $end:String, $name:String){
          updateHourByID(id: $id, title: $title, courseCode: $courseCode, description: $description, start: $start, end: $end, name: $name){
              id 
              title 
              courseCode
              description
              start
              end
          }
      }
    `;
    const executeMutation = async () => {
      const data = await client.mutate({
        mutation: updateMutation,
        variables: {
          id: +(props.event.id as string),
          title: changedHour.title,
          description: changedHour.description,
          courseCode: changedHour.courseCode,
          start: changedHour.start,
          end: changedHour.end,
          name: props.event.name as string
        }
      });
      return data;
    }
    executeMutation().then();


    props.setHours(newHours, 'add');
    props.handleClose();
    toast.success("Your hours were updated!");

  };







  const handleDelete = () => {



    //just delete the item from the backend
    const deleteMutation = gql `
      mutation deleteMutation($id:Int){
          deleteHourByID(id:$id){
              id
          }
      }
    `;
    const runMutation = async () =>{
      return await client.mutate({
        mutation:deleteMutation,
        variables:{
          id: (props.event.id as number),
        }
      });
    }
    runMutation().then();
    props.setHours({}, 'remove');
    toast.success("Deleted Event!");
    props.handleClose();
    return;






  }
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
        <Button  variant="destructive" className="m-[2rem] w-[7rem]" type="button" onClick = {handleDelete}>Delete </Button>
        <Button  variant="default" className="m-[2rem] w-[7rem] "  type = "submit">Submit</Button>
      </div>
    </form>
  )
}