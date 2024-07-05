import {NextPage} from "next";
import {useEffect, useState} from "react";
import {CourseItem} from "@/mongoose/course/schema";
import {useRouter} from "next/router";
import {useUser} from "@auth0/nextjs-auth0/client";
import CourseCard from "@/components/CourseCard";
import {DataTable} from "@/components/dataTable";
import {columns} from "@/components/Columns";
import type {Course} from "../components/Columns"
import {gql} from "graphql-tag";
import client from "../graphql/client";
const Courses:NextPage = () =>{
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const router = useRouter(); //router for redirecting if not logged in
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
  });


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
    console.log('data is', data);
    setCourses(data['data']['fetchCoursesByName']);
    setFetched(true);
    return data;
  };







  return (
    <>
      <div className="flex flex-row  justify-center mb-4">
        <h1 className="font-bold md:text-5xl font-mono"> Your Courses</h1>
      </div>
      <div className="flex flex-row  justify-center mb-4">
         <DataTable columns={columns} data={courses} addCourse = {(course:CourseItem) => setCourses((prev) => [...prev, course])}/>
      </div>
    </>
  );
}
export default Courses;