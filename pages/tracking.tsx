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
  let {user, error, isLoading} = useUser(); //hold auth0 hooks





  useEffect(() =>{
    if(!user && !isLoading){
      router.push('/api/auth/login').then();
    }
    else{
      if(!fetched){
        fetchData().then();
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
















  return(
    <div className = "ml-[6rem]">
      <h1 className = "font-mono text-center text-3xl">Your Tracking Sheet</h1>
      <RequirementComponent requirementTitle={"Humanities and Arts - Depth, Breath, and Elective"} requirementDescription={"This requirement covers the HUA depth, breadth, and elective. Students must complete 5 courses in this area, with 3 courses being thematically related"} requiredNumber={5} coursesCompleted={courses.filter((course) => (course.requirements as string[]).includes('HUA') && ((course.courseCode as string) !== 'HU 3900') &&  (course.courseCode as string) !== 'HU 3910')}/>
      <RequirementComponent requirementTitle={"Humanities and Arts - Inquiry Seminar/Practicum"} requirementDescription={"This requirement covers HUA Capstone Project"} requiredNumber={1} coursesCompleted={courses.filter((course) =>   (((course.courseCode as string) === 'HU 3900') || (course.courseCode as string) === 'HU 3910'))}/>
      <RequirementComponent requirementTitle={"Physical Education"} requirementDescription={"WPI Students must complete 4 courses in physical education"} requiredNumber={4} coursesCompleted={courses.filter((course) =>   ((course.courseCode as string).includes('PE')))}/>
      <RequirementComponent requirementTitle={"Social Science"} requirementDescription={"WPI Students must complete 2 courses in the social sciences"} requiredNumber={2} coursesCompleted={courses.filter((course) =>   ((course.requirements as string[]).includes('Social Science')))}/>
      <RequirementComponent requirementTitle={"IQP"} requirementDescription={"WPI Students must complete the Interactive Qualifying Project (3 units of coursework)"} requiredNumber={1} coursesCompleted={courses.filter((course) =>   ((course.requirements as string[]).includes('IQP')))}/>
      <RequirementComponent requirementTitle={"Free Electives"} requirementDescription={"WPI Students may count 3 courses towards this general category"} requiredNumber={3} coursesCompleted={courses.filter((course) =>   ((course.requirements as string[]).includes('Free Electives')))}/>
      <RequirementComponent requirementTitle={"Computer Science - Systems Requirement"} requirementDescription={"Computer Science Students must complete one course in Systems development"} requiredNumber={1} coursesCompleted={courses.filter((course) => (((course.courseCode as string) == 'CS 3013') || ((course.courseCode as string) == 'CS 4516') ||((course.courseCode as string) == 'CS 4513') || ((course.courseCode as string) == 'CS 4515')))}/>
      <RequirementComponent requirementTitle={"Computer Science - Design Requirement"} requirementDescription={"Computer Science Students must complete one course in design"} requiredNumber={1} coursesCompleted={courses.filter((course) => (((course.courseCode as string) == 'CS 3733') || ((course.courseCode as string) == 'CS 3431') ||((course.courseCode as string) == 'CS 3041') || ((course.courseCode as string) == 'CS 4233')))}/>
      <RequirementComponent requirementTitle={"Computer Science - Theory and Languages Requirement"} requirementDescription={"Computer Science Students must complete one course in theory and languages"} requiredNumber={1} coursesCompleted={courses.filter((course) => (((course.courseCode as string) == 'CS 3133') || ((course.courseCode as string) == 'CS 4123') ||((course.courseCode as string) == 'CS 4533') || ((course.courseCode as string) == 'CS 4120') || ((course.courseCode as string) == 'CS 4536')))}/>
      <RequirementComponent requirementTitle={"Computer Science - Social Implications Requirement"} requirementDescription={"Computer Science Students must complete one course in the Social Implications of Computing"} requiredNumber={1} coursesCompleted={courses.filter((course) => (((course.courseCode as string) == 'CS 3043') || ((course.courseCode as string) == 'GOV 2314') ||((course.courseCode as string) == 'ID 2314') || ((course.courseCode as string) == 'GOV 2315') || ((course.courseCode as string) == 'IMGD 2000') || ((course.courseCode as string) == 'IMGD 2001') || ((course.courseCode as string) == 'RBE 3100')))}/>
      <RequirementComponent requirementTitle={"Computer Science - Core Requirement"} requirementDescription={"Computer Science Students must complete 18 CS courses"} requiredNumber={18} coursesCompleted={courses.filter((course) => ((course.requirements as string[]).includes('CS')))}/>
      <RequirementComponent requirementTitle={"MA - Core Courses"} requirementDescription={"Undergraduate Students majoring in CS must take 5 core math courses, up to 4 of which may be at the 1000 level "} requiredNumber={5} coursesCompleted={courses.filter((course) => ((course.requirements as string[]).includes('Math') && (course.courseCode != 'MA 2621' && course.courseCode != 'MA 2611' && course.courseCode != 'MA 2631' && course.courseCode != 'MA 2612')))}/>
      <RequirementComponent requirementTitle={"MA - Probability and Statistics"} requirementDescription={"Undergraduate Students majoring in CS must complete a course in probability (MA 2621, MA 2631) and an additional course in statistics (MA 2611, MA2612) "} requiredNumber={2} coursesCompleted={courses.filter((course) => (course.courseCode == 'MA 2621' || course.courseCode == 'MA 2611' || course.courseCode == 'MA 2631' || course.courseCode == 'MA 2612'))}/>
      <RequirementComponent requirementTitle={"Basic/Engineering Science"} requirementDescription={"Undergraduate Students majoring in CS must complete 3 courses in Biology, Physics, Chemistry, or Geology, and may either complete 2 additional courses in Engineering Science, or 2 additional basic science courses"} requiredNumber={3} coursesCompleted={courses.filter((course) => ((course.requirements as string[]).includes('Basic/Engineering Science')))}/>








    </div>
  );
}

export default Tracking;