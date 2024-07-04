import { Button } from "@/components/ui/button"
import { useState} from "react";
import { MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem} from "../components/MultiSelect";
import type {CourseItem} from "../mongoose/course/schema";
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
import type {HoursType} from "@/mongoose/timeWorked/schema";
import {useUser} from "@auth0/nextjs-auth0/client";
import gql from "graphql-tag";
import client from "../graphql/client"

interface formProps{
  handleClose: () => void;
  addCourse: (course:CourseItem) => void;
  // setCourses:(course: CourseItem) => void;
  // userName: string | null | undefined;
}

export const requirementsTypes = ['HUA', 'PE', 'Social Science', 'IQP', 'Free Electives', 'CS', 'Math', 'Basic/Engineering Science'];


export const AddCourseForm = (props: formProps) =>{
  let {user, error, isLoading} = useUser(); //hold auth0 hooks

  const [courseCode, setCourseCode] = useState<string>('');
  const [courseTitle, setCourseTitle] = useState<string>('');
  const [courseTerm, setCourseTerm] = useState<string>("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [credits, setCredits] = useState<number>(0);
  const [role, setRole] = useState<string>('');
  //onSubmit={handleSubmit}

  const handleSubmit = (e: React.SyntheticEvent) =>{
    e.preventDefault();


    const executeMutation  = async () => {
      const createMutation = gql `
        mutation createCourse($courseCode:String, $title:String, $term:String, $role:String, $credits:Int, $requirements:[String], $name:String){
            addCourse(courseCode: $courseCode, title: $title, term: $term, role: $role, credits:$credits, requirements: $requirements, name: $name ){
                courseCode,
                title, 
                term, 
                requirements, 
                role
            }
        }
      `;
      const data = await client.mutate({
        mutation: createMutation,
        variables:{
          courseCode: courseCode,
          title: courseTitle,
          term: courseTerm,
          role: role,
          credits: credits,
          requirements: requirements,
          name: user?.name,
        }
      });
      return data;
    }
    executeMutation().then();
    const addToState:CourseItem = {
      courseCode: courseCode,
      title: courseTitle,
      term: courseTerm,
      role: role,
      credits: credits,
      requirements: requirements,
      name: user?.name,
    }
    props.addCourse(addToState);
    props.handleClose();
  }
  return(
    <form onSubmit={handleSubmit} style = {{
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




      <Select value={courseTerm}  onValueChange={(value) => setCourseTerm(value)}>
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
      <Input type = "number"  placeholder="Enter the number of credits for this course" className = "  w-full" onChange={(e) => setCredits(parseInt(e.target.value))}/>
      <div className="flex flex-row px-5">
        <Button variant="destructive" className="m-[2rem] w-[7rem]" type="button">Clear </Button>
        <Button variant="default" className="m-[2rem] w-[7rem] " type="submit">Submit</Button>
      </div>


    </form>

  )

}
