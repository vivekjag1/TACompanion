import {NextPage} from "next";
import {useEffect, useState} from "react";
import {CourseItem} from "@/mongoose/course/schema";
import {useRouter} from "next/router";
import {useUser} from "@auth0/nextjs-auth0/client";
import CourseCard from "@/components/CourseCard";
import {DataTable} from "@/components/dataTable";
import {gql} from "graphql-tag";
import client from "../graphql/client";
const Courses:NextPage = () =>{
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const router = useRouter(); //router for redirecting if not logged in
  let {user, error, isLoading} = useUser(); //hold auth0 hooks
  const fetchData = async () => {
    setFetched(false);
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
      },
      fetchPolicy:'network-only'
    });
    console.log('fetched data', data['data']['fetchCoursesByName']);

    setCourses(data['data']['fetchCoursesByName']);
    setFetched(true);
    return data;
  };


  const changeCourse = (course:CourseItem, toReplace:string, action:string) => {
    const newArr: CourseItem[] = [];
    for(let i = 0; i < courses.length; i++){
      if((courses[i].courseCode as string).trim() !== toReplace.trim()){
        newArr.push(courses[i]);

      }
      else{
        if(action === 'update'){
          newArr.push(course);
        }
        else{
          continue;
        }

      }
    }





    // const newArr:CourseItem[] = courses.filter((item) => item.courseCode != toReplace);
    // newArr.push(course);

    setCourses(newArr);

  }


  useEffect(() =>{
    if(!user && !isLoading){
      router.push('/api/auth/login').then();
    }
    else{
      if(!fetched && !isLoading){
        fetchData().then();
      }
     //fetch data function goes here
      else{
        return;
      }
    }
  }, [fetched, user, isLoading, router, fetchData]);


  return (
    <>
      <div className="flex flex-row  justify-center mb-4">
        <h1 className=" md:text-4xl font-mono"> Your Courses</h1>
      </div>
      <div className="flex flex-row  justify-center mb-4">
         <DataTable  changeCourse={changeCourse} data={courses} addCourse = {(course:CourseItem) => setCourses((prev) => [...prev, course])}/>
      </div>
    </>
  );
}
export default Courses;