import {useEffect, useState} from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateClickArg } from '@fullcalendar/interaction'; // Import the type
import moment from 'moment-timezone';
import CustomModal from "@/components/CustomModal";
import type {HoursType} from "@/mongoose/timeWorked/schema";
import {useUser} from "@auth0/nextjs-auth0/client";
import {gql} from "graphql-tag";
import client from "../graphql/client";
import {useRouter} from "next/router";
import {EventDropArg} from "@fullcalendar/core";
moment.tz.setDefault('America/New_York');
const Hours = () =>{
  let { user, error, isLoading } = useUser();
  const router = useRouter();
  const userName = user?.name;
  const [open, setOpen] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [hours, setHours] = useState<HoursType[]>([]);
  const [date, setDate] = useState<string>("");
  const [fetched, setFetched] = useState<boolean>(false);
  const getHours = gql`
     query getHoursByName($name:String){
          fetchHoursByName(name:$name){
              id
              title 
              courseCode
              description
              start 
              end
        }
    }
    `;
  useEffect(() =>{
    if(!user && !isLoading){ //if the information is fetched but there is still no user object then move to l
      router.push('/api/auth/login').then();
    }
    else{
      if(!fetched){

        fetchData().then(console.log);
      }
      else{
        return;
      }

    }
  }, [user, isLoading, router, fetched]);
  const fetchData = async () =>{
    if(user == undefined) return;
    const data = await client.mutate({
      mutation: getHours,
      variables:{
        name: user?.name
      }
    });
    const dataArr = data['data']['fetchHoursByName'];
    const newItems = dataArr.map((item:HoursType) =>{
      const toRet = {
        title:item.title,
        start:item.start,
        end: item.end,
        color: (() =>{
          if(item.title as string === "office hours"){
            return 'blue';
          }
          else if (item.title as string === "meeting"){
            return 'green';
          }
          else{
            return 'red';
          }

        })
      };
      return toRet;
    });
    setHours(newItems);
    setFetched(true);

  }



  const addHourMutation  = gql `
      mutation addHour($title:String, $courseCode:String, $description:String, $start:String, $end:String, $name:String){
          addHour(title: $title, courseCode: $courseCode,  description: $description, start: $start, end: $end, name: $name){
              id
              title
              courseCode
              description
              start
              end
          }
      }
  `;

  const handleClick = (arg:DateClickArg) =>{
    setOpen(true);
    const index = arg.dateStr.indexOf("T");
    const date = arg.dateStr.substring(0, index);
    setDate(date);
    setStartTime(arg.date);
  }


  const addHours = (hour:HoursType) =>{
    const end = new Date(date.concat("T").concat(hour.end as string).concat(':00'));
    const addToCalendar  = {
      id:null,
      title: hour.title,
      start : moment(startTime).format(),
      end: moment(end).format(),
      color: (() =>{
        if(hour.type as string === "office hours"){
          return 'blue';
        }
        else if (hour.type as string === "meeting"){
          return 'green';
        }
        else{
          return 'red';
        }
      })
    }
    //add graphql logic here to create an instance of the hours collection
    const executeMutation = async () =>{
      const data = await client.mutate({
        mutation: addHourMutation,
        variables:{
          title: hour.title,
          courseCode: hour.courseCode,
          description: hour.description,
          start: moment(startTime).format(),
          end: moment(end).format(),
          name: user?.name
        }
      })
      addToCalendar.id = data['data']['addHour'].id

      return data;
    }



    setHours(prev => [...prev, addToCalendar]);

    executeMutation().then();
  }
  console.log("hours is",hours);

  let handleEventDrop = (info: EventDropArg) =>{
    const { id } = info.event;
    console.log(id);

  };
  return(
    <>
    <CustomModal open={open} handleClose={() => setOpen(false)} startTime={startTime} setHours={addHours} userName = {userName}/>
    <div className = " items-center justify-center ml-[8rem] mr-[8rem]">
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          center: "title",
          start: ''
        }}
        dateClick = {handleClick}
        editable={true}
        events = {hours}
        eventDrop={handleEventDrop}
      />
    </div>
    </>
  )
}
export default Hours;
