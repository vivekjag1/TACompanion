import {NextPage} from "next";
import {useEffect, useState} from "react";
import {CourseItem} from "@/mongoose/course/schema";
import {useRouter} from "next/router";
import {useUser} from "@auth0/nextjs-auth0/client";
import CourseCard from "@/components/CourseCard";


const Courses:NextPage = () =>{
  const [courses, setCourses] = useState<CourseItem[]>();
  const router = useRouter(); //router for redirecting if not logged in
  let {user, error, isLoading} = useUser(); //hold auth0 hooks
  useEffect(() =>{
    if(!user && !isLoading){
      router.push('/api/auth/login').then();
    }
    else{
     //fetch data function goes here
    }
  });







  return(
    <div className = "flex flex-row  justify-center mb-4">
       <h1 className="font-bold md:text-5xl font-mono"> Your Courses</h1>
    </div>




    // <div className = "items-center text-center font-bold  text-3xl font-mono">
    //   <CourseCard courseName={"CS 3013"} term={"A23"} imageSrc={""} role={"SA"}/>
    // </div>

  );
}
export default Courses;