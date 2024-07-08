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
      <RequirementComponent requirementTitle={"Humanities and Arts"} requirementDescription={"This requirement corresponds to the Humanities and Arts requirement at WPI, which requires 5 courses and a HUA seminar. Optionally, all 6 courses may be done in a foreign language. "} requiredNumber={5} coursesCompleted={courses.filter((course) => course.requirements.includes('HUA'))}/>
      <RequirementComponent requirementTitle={"Computer Science"} requirementDescription={"This requirement corresponds to the Humanities and Arts requirement at WPI, which requires 5 courses and a HUA seminar. Optionally, all 6 courses may be done in a foreign language. "} requiredNumber={5} coursesCompleted={courses.filter((course) => course.requirements.includes('CS'))}/>
      <RequirementComponent requirementTitle={"MA - Core Courses"} requirementDescription={"Undergraduate Students majoring in CS must take 5 core math courses, up to 4 of which may be at the 1000 level "} requiredNumber={5} coursesCompleted={courses.filter((course) => (course.requirements.includes('Math') && (course.courseCode != 'MA 2621' && course.courseCode != 'MA 2611' && course.courseCode != 'MA 2631' && course.courseCode != 'MA 2612')))}/>
      <RequirementComponent requirementTitle={"MA - Probability and Statistics"} requirementDescription={"Undergraduate Students majoring in CS must a course in probability (MA 2621, MA 2631) and an additional course in statistics (MA 2611, MA2612) "} requiredNumber={2} coursesCompleted={courses.filter((course) => (course.courseCode == 'MA 2621' || course.courseCode == 'MA 2611' || course.courseCode == 'MA 2631' || course.courseCode == 'MA 2612'))}/>
    </div>
  );
}

export default Tracking;