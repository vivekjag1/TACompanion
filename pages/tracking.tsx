import {RequirementComponent} from "@/components/RequirementComponent";
import {useState} from 'react';
import {JSX} from 'react'
const Tracking = ():JSX.Element =>{
  const [requirements, setRequirements] = useState<Map<string, number>>(new Map());
  const [degree, setDegree] = useState<string>('Computer Science');

  const CSRequirements = new Map<string, number>();
  //basic requirements where the types of courses don't really matter
  CSRequirements.set('HUA', 5);
  CSRequirements.set('PE', 4);
  CSRequirements.set('SS', 2);
  CSRequirements.set('IQP', 1);
  CSRequirements.set('Free Electives', 3);
  //more specific requirements

  //math stats, probability, base requirements
  CSRequirements.set('MA', 5);
  CSRequirements.set('STATS', 2);

  //HU 3900 requirement
  CSRequirements.set('INQ-SEM', 1);

  //CS requirements


  //core CS courses that can be whatever
  CSRequirements.set('CS', 8);


  //specific concentration requirements for CS
  CSRequirements.set('Systems', 1);
  CSRequirements.set('Theory', 1);
  CSRequirements.set('Design', 1);
  CSRequirements.set('Social Implications', 1);
  CSRequirements.set('MQP', 1);
  CSRequirements.set('CS-4000', 5);

  //basic science
  CSRequirements.set('Basic Science', 3);
  CSRequirements.set('Engineering Science/Basic Sci', 2);









  return(
    <div className = "ml-[6rem]"><RequirementComponent/></div>
  );
}

export default Tracking;