import {RequirementComponent} from "@/components/RequirementComponent";
import {useEffect, useState} from 'react';
import {JSX} from 'react'
import {CourseItem} from "@/mongoose/course/schema";
import {useRouter} from "next/router";
import {useUser} from "@auth0/nextjs-auth0/client";
import {gql} from "graphql-tag";
import client from "@/graphql/client";
const Tracking = ():JSX.Element =>{
  const [requirements, setRequirements] = useState<Map<string, number>>(new Map());
  const [degree, setDegree] = useState<string>('Computer Science');
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const router = useRouter();
  const [userCourseProgress, setUserCourseProgress] = useState<Map<string, CourseItem[]>>(new Map());
  let {user, error, isLoading} = useUser(); //hold auth0 hooks

  const reqs = new Map<string, CourseItem[]>();

  const filterByRequirement = () =>{
    const PE:CourseItem[] = [];
    const IQP:CourseItem[] = [];
    const Stats:CourseItem[] = [];
    const MA:CourseItem[] = [];
    const SocialScience:CourseItem[] = [];
    const HU:CourseItem[] = [];
    const HUA:CourseItem[] = [];
    const Systems:CourseItem[] = [];
    const Design:CourseItem[] = [];
    const Theory:CourseItem[] = [];
    const CS:CourseItem[] = [];
    const MQP:CourseItem[] = [];
    const FourThousand:CourseItem[] = [];
    const basicScience:CourseItem[] = [];
    const engineeringScience:CourseItem[] = [];
    const freeElectives:CourseItem[] = [];
    courses.map((course:CourseItem) =>{


      if((course.courseCode as string ).substring(0, 3) == 'PE'){
        PE.push(course);
      }
      else if((course.courseCode as string ).includes('IQP')){
        IQP.push(course);
      }
      else if((course.courseCode as string ) === 'MA 2621' || (course.courseCode as string ) === 'MA 2611' || (course.courseCode as string ) === 'MA 2612' || (course.courseCode as string ) === 'MA 2631'){
        Stats.push(course);
      }
      else if((course.courseCode as string ).includes('MA')){
        MA.push(course);
      }
      else if((course.courseCode as string ).includes('DEV') || (course.courseCode as string ).includes('ECON') || (course.courseCode as string ).includes('ENV') ||  (course.courseCode as string ).includes('GOV') || (course.courseCode as string ).includes('SD') || (course.courseCode as string ).includes('SOC') || (course.courseCode as string ).includes('SS') || (course.courseCode as string ).includes('STS') ){
        SocialScience.push(course);
      }
      else if((course.courseCode as string).includes('HUA')){
        HUA.push(course)
      }
      else if((course.courseCode as string ).includes('AB') || (course.courseCode as string ).includes('AR') || (course.courseCode as string ).includes('CN') ||  (course.courseCode as string ).includes('EN') || (course.courseCode as string ).includes('GN') || (course.courseCode as string ).includes('HI') || (course.courseCode as string ).includes('HU') || (course.courseCode as string ).includes('ID') || (course.courseCode as string ).includes('MU') || (course.courseCode as string ).includes('PY') || (course.courseCode as string ).includes('RE') || (course.courseCode as string ).includes('SP') || (course.courseCode as string ).includes('TH') || (course.courseCode as string ).includes('WR')){

        HU.push(course);
      }
      else if((course.courseCode as string ) == 'CS 3013' || (course.courseCode as string ) == 'CS 4516' || (course.courseCode as string ) == 'CS 4513' ||  (course.courseCode as string ) == 'CS 4515'){
        Systems.push(course);
      }
      else if((course.courseCode as string ) == 'CS 3733' || (course.courseCode as string ) == 'CS 3431' || (course.courseCode as string ) == 'CS 3041' ||  (course.courseCode as string ) == 'CS 4233'){
        Design.push(course);
      }
      else if((course.courseCode as string ) == 'CS 3133' || (course.courseCode as string ) == 'CS 4123' || (course.courseCode as string ) == 'CS 4533' ||  (course.courseCode as string ) == 'CS 4120' ||  (course.courseCode as string ) == 'CS 4536'){
        Theory.push(course);
      }
      else if((course.courseCode as string ).includes('CS')){
       CS.push(course);
      }
      else if((course.courseCode as string ).includes('MQP')){
       MQP.push(course);
      }
      if((course.courseCode as string ).includes('CS 4')){
       FourThousand.push(course);
      }
      else if((course.courseCode as string ).includes('CS 4')){
       FourThousand.push(course);
      }
      else if ((course.courseCode as string ).includes('BB') || (course.courseCode as string ).includes('CH') || (course.courseCode as string ).includes('GE')|| (course.courseCode as string ).includes('PH')){
        basicScience.push(course);
      }
      else if ((course.courseCode as string ).includes('BME') || (course.courseCode as string ).includes('CE') || (course.courseCode as string ).includes('CHE')|| (course.courseCode as string ).includes('ECE') || (course.courseCode as string ).includes('ES') || (course.courseCode as string ).includes('ME') || (course.courseCode as string ).includes('RBE')){
        engineeringScience.push(course);
      }
      else{
        freeElectives.push(course);
      }
    });
    /*
      const PE:CourseItem[] = [];
    const IQP:CourseItem[] = [];
    const Stats:CourseItem[] = [];
    const MA:CourseItem[] = [];
    const SocialScience:CourseItem[] = [];
    const HU:CourseItem[] = [];
    const HUA:CourseItem[] = [];
    const Systems:CourseItem[] = [];
    const Design:CourseItem[] = [];
    const Theory:CourseItem[] = [];
    const CS:CourseItem[] = [];
    const MQP:CourseItem[] = [];
    const FourThousand:CourseItem[] = [];
    const basicScience:CourseItem[] = [];
    const engineeringScience:CourseItem[] = [];
    const freeElectives:CourseItem[] = [];
     */
    reqs.set('PE', PE);
    reqs.set('IQP', IQP);
    reqs.set('statistics', Stats);
    reqs.set('MA', MA);
    reqs.set('Social Science', SocialScience);
    reqs.set('HUA', HUA);
    reqs.set('HU', HU);
    reqs.set('Systems', Systems);
    reqs.set('Design', Design);
    reqs.set('Theory', Theory);
    reqs.set('CS', CS);
    reqs.set('MQP', MQP);
    reqs.set('Four Thousand', FourThousand);
    reqs.set('Basic Science', basicScience);
    reqs.set('Engineering Science', engineeringScience);
    reqs.set('Free Electives', freeElectives);












  }



  useEffect(() =>{
    if(!user && !isLoading){
      router.push('/api/auth/login').then();
    }
    else{
      if(!fetched){
        fetchData().then();
        filterByRequirement();
      }
      //fetch data function goes here
      else{
        return;
      }
    }
  }, [fetched, user, isLoading]);
  const fetchData = async () => {
    const getAllCourses = gql `
        query getCoursesForUser($name:String){
            fetchCoursesByName(name:$name){
                courseCode
                title
                term
                role
                credits
                requirements
                name
            }
        }
    `;
    const data = await client.query({
      query:getAllCourses,
      variables:{
        name: user?.name
      }
    });
    setCourses(data['data']['fetchCoursesByName']);
    setFetched(true);
    return data;
  };


  //get all courses for the current user






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

  //basic science requirements
  CSRequirements.set('Basic Science', 3);
  CSRequirements.set('Engineering Science/Basic Science', 2);










  return(
    <div className = "ml-[6rem]">
      {Array.from(reqs.keys()).map((item) =>{
        return(
          <RequirementComponent key = {Array.from(reqs.keys()).indexOf(item)} requirementTile = {item} requirementsMap={CSRequirements} requirementsProgress={} />

        )

      })}

    </div>
  );
}

export default Tracking;