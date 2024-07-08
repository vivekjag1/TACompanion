    import {
      Accordion,
      AccordionContent,
      AccordionItem,
      AccordionTrigger,
    } from "@/components/ui/accordion"

    import { Progress } from "@/components/ui/progress"
    import {CourseItem} from "@/mongoose/course/schema";
    import {useState} from "react";


    interface RequirementProps{
      requirementTitle:string;
      requirementDescription:string;
      coursesCompleted:CourseItem[];
      requiredNumber: number;

    }

    export  const RequirementComponent = (props:RequirementProps) => {






      return(
        <div className = "items-center justify-center">
          <Accordion type="single" collapsible className="mr-5">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center justify-between w-full">
                  <p className = "flex-1 text-left">{`${props.requirementTitle}`}</p>
                  <p className = "flex-1 text-center">{` Status - ${props.requiredNumber === props.coursesCompleted.length ? 'Completed' : props.coursesCompleted.length === 0 ? 'Not Started' : 'In Progress'}`}</p>
                  <div className="flex items-center space-x-2">
                    <Progress className="relative right-0 w-32 mr-3"
                              value={(((props.coursesCompleted.length) / props.requiredNumber) * 100)}/>
                  </div>
                </div>

              </AccordionTrigger>
              <AccordionContent>
                <h1> Description: {props.requirementDescription}</h1>
                {(props.coursesCompleted as CourseItem[]).length?
                <h1> Eligible Courses </h1> : <></>
                }
                <ul>
                  {props.coursesCompleted.map((item) =>{
                  const itemNum = props.coursesCompleted.indexOf(item);
                  return(
                  <li key = {itemNum}> {item.courseCode as string} - {item.title as string}</li>
                  )
                })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )




    }