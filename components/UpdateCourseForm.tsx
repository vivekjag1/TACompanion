import { Button } from "@/components/ui/button"
import { useState} from "react";
import { Label } from "@/components/ui/label"
import client from "../graphql/client"
import type {CourseItem} from "@/mongoose/course/schema"
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
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput, MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger
} from "@/components/MultiSelect";
import {requirementsTypes} from "@/components/AddCourseForm";
interface formProps{
  handleClose: () => void;
  course:CourseItem;
  changeCourse:(course:CourseItem, toReplace:string, action:string) => void;

}
export const UpdateCourseForm = (props:formProps) =>{
  const [courseCode, setCourseCode] = useState<string>(props.course.courseCode as string);
  const [courseTitle, setCourseTitle] = useState<string>(props.course.title as string);
  const [term, setTerm] = useState<string>(props.course.term as string);
  const [role, setRole] = useState<string>(props.course.role as string);
  const [credits, setCredits] = useState<number>(props.course.credits as number);
  const [requirements, setRequirements] = useState<string[]>(props.course.requirements as string[]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newItem:CourseItem = {
      courseCode: courseCode,
      title: courseTitle,
      term: term,
      role: role,
      credits: credits,
      requirements: requirements,
    };

    props.changeCourse(newItem, (props.course.courseCode as string), 'update');
    props.handleClose();


  }


  // const handleSubmit  = (e: React.SyntheticEvent) =>{
  //   e.preventDefault();
  //
  //   const indexT = (props.event.start as string).indexOf("T");
  //   const indexDash = (props.event.start as string).length -  9;
  //   const date = (props.event.start as string).substring(0, indexT);
  //   const end =  new Date(date.concat("T").concat(endTime).concat(':00-04:00'));
  //   const start = new Date(date.concat("T").concat(startTime).concat(':00-04:00'));
  //   const newHours:HoursType = {
  //     title: `Type: ${title}, Description: ${description},  (ID: ${props.event.id})`,
  //     courseCode:course,
  //     description:description,
  //     start:moment(start).format(),
  //     end:moment(end).format(),
  //     name: props.event.name as string
  //   }
  //   const changedHour:HoursType = {
  //     title: `${title} (ID: ${props.event.id as string})`,
  //     courseCode: course,
  //     description: description,
  //     start:  moment(start).format(),
  //     end:moment(end).format(),
  //     name: props.event.name as string
  //   };
  //   const updateMutation = gql `
  //       mutation updateMutation($id:Int, $title:String, $courseCode:String, $description:String, $start:String, $end:String, $name:String){
  //           updateHourByID(id: $id, title: $title, courseCode: $courseCode, description: $description, start: $start, end: $end, name: $name){
  //               id
  //               title
  //               courseCode
  //               description
  //               start
  //               end
  //           }
  //       }
  //   `;
  //   const executeMutation = async () => {
  //     const data = await client.mutate({
  //       mutation: updateMutation,
  //       variables: {
  //         id: +(props.event.id as string),
  //         title: changedHour.title,
  //         description: changedHour.description,
  //         courseCode: changedHour.courseCode,
  //         start: changedHour.start,
  //         end: changedHour.end,
  //         name: props.event.name as string
  //       }
  //     });
  //     return data;
  //   }
  //   executeMutation().then();
  //
  //
  //   props.setHours(newHours, 'add');
  //   props.handleClose();
  //   toast.success("Your hours were updated!");
  //
  // };







  // const handleDelete = () => {
  //
  //
  //
  //   //just delete the item from the backend
  //   const deleteMutation = gql `
  //       mutation deleteMutation($id:Int){
  //           deleteHourByID(id:$id){
  //               id
  //           }
  //       }
  //   `;
  //   const runMutation = async () =>{
  //     return await client.mutate({
  //       mutation:deleteMutation,
  //       variables:{
  //         id: (props.event.id as number),
  //       }
  //     });
  //   }
  //   runMutation().then();
  //   props.setHours({}, 'remove');
  //   toast.success("Deleted Event!");
  //   props.handleClose();
  //   return;
  //
  //
  //
  //
  //
  //
  // }

  const handleDelete = () => {
    props.changeCourse(props.course, props.course.courseCode as string,  'delete')
    props.handleClose();

  }

  //onSubmit={handleSubmit}
  return (
    <form       onSubmit={handleSubmit}
                style = {{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",


    }}>
      <Input value={courseCode} className="mt-5" placeholder="Enter Course Code" onChange={(e)=>setCourseCode(e.target.value)}/>
      <Input value={courseTitle} className="mt-5" placeholder="Enter Course Title" onChange={(e)=>setCourseTitle(e.target.value)}/>
      <Select value={role}  onValueChange={(value) => setRole(value)}>
        <SelectTrigger className="mt-5 w-full">
          <SelectValue placeholder="Select your role"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value = "Student">Student</SelectItem>
            <SelectItem value = "TA">TA</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={term}  onValueChange={(value) => setTerm(value)}>
        <SelectTrigger className="mt-5 w-full">
          <SelectValue placeholder="Select the term"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value = "A24">A24</SelectItem>
            <SelectItem value = "B24">B24</SelectItem>
            <SelectItem value = "C25">C25</SelectItem>
            <SelectItem value = "D25">D25</SelectItem>
            <SelectItem value = "A25">A25</SelectItem>
            <SelectItem value = "B25">B25</SelectItem>
            <SelectItem value = "C26">C26</SelectItem>
            <SelectItem value = "D26">D26</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <MultiSelector values={requirements} onValuesChange={setRequirements} className=" mt-2 bg-gray text-black">
        <MultiSelectorTrigger>
          <MultiSelectorInput placeholder="Select the requirements this course fufils" />
        </MultiSelectorTrigger>
        <MultiSelectorContent className = "w-full ">
          <MultiSelectorList>
            {requirementsTypes.map((requirement) =>{
              return (
                <MultiSelectorItem className = " mt-5 " key={requirementsTypes.indexOf(requirement)} value={requirement}>{requirement}</MultiSelectorItem>
              )
            })}
          </MultiSelectorList>
        </MultiSelectorContent>
      </MultiSelector>
      <Input type = "number" value={credits}  placeholder="Enter the number of credits for this course" className = "  w-full" onChange={(e) => setCredits(parseInt(e.target.value))}/>
      <div className="flex flex-row px-5">
        <Button variant="destructive" className="m-[2rem] w-[7rem]" type="button" onClick = {handleDelete}>Delete </Button>
        <Button variant="default" className="m-[2rem] w-[7rem] " type="submit">Submit</Button>
      </div>
    </form>
  )
}