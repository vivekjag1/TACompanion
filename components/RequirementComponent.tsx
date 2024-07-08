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
    requirementTile:string;
    requirementsMap:Map<string, number>;
    requirementsProgress: Map<string, CourseItem[]>;
  }

  export  const RequirementComponent = (props:RequirementProps) => {
    const [completionPercentage, setCompletionPercentage] = useState<number>(0);








    return(
      <div className = "items-center justify-center">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center justify-between w-full">
                <p>Humanities and Arts (HUA)</p>
                <div className="flex items-center space-x-2">
                  <Progress className="relative right-0 w-32 mr-3" value={33}/>
                </div>
              </div>

            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )




  }