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
interface formProps{
  handleClose: () => void;
  // setCourses:(course: CourseItem) => void;
  // userName: string | null | undefined;
}

export const requirementsTypes = ['HUA', 'PE', 'Social Science', 'IQP', 'Free Electives', 'CS', 'Math', 'Basic/Engineering Science'];


export const AddCourseForm = (props: formProps) =>{
  const [courseCode, setCourseCode] = useState<string>('');
  const [courseTitle, setCourseTitle] = useState<string>('');
  const [courseTerm, setCourseTerm] = useState<string>("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [credits, setCredits] = useState<number>(0);
  //onSubmit={handleSubmit}
  return(
    <form  style = {{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
    }}>
      <Input value={courseCode} className="mt-5" placeholder="Enter Course Code" onChange={(e)=>setCourseCode(e.target.value)}/>
      <Input value={courseTitle} className="mt-5" placeholder="Enter Course Title" onChange={(e)=>setCourseTitle(e.target.value)}/>
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
