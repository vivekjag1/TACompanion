import { useEffect, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {DateClickArg, EventResizeDoneArg} from '@fullcalendar/interaction';
import moment from 'moment-timezone';
import CustomModal from "@/components/CustomModal";
import type { HoursType } from "@/mongoose/timeWorked/schema";
import { useUser } from "@auth0/nextjs-auth0/client";
import { gql } from "graphql-tag";
import client from "../graphql/client";
import { useRouter } from "next/router";
import { EventChangeArg, EventDropArg } from "@fullcalendar/core";
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
  const [adding, setAdding] = useState<boolean>(false);
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

        fetchData().then();
      }
      else{
        return;
      }

    }
  }, [user, isLoading, router, fetched]);
  const fetchData = async () =>{
    console.log("fetching");
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
        //meeting - description ID:
        title: `Type: ${(item.title as string).substring(0, (item.title as string).length - 8)}, Description: ${item.description as string},  (ID: ${item.id as number})`,

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
    setAdding(true);
    const end = new Date(date.concat("T").concat(hour.end as string).concat(':00'));

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
      });
      const addToCalendar  = {
        id:data['data']['addHour']['id'],
        title: `Type: ${(hour.title as string)}, Description: ${hour.description as string},  (ID: ${data['data']['addHour']['id']})`,
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
      setHours(prev => [...prev, addToCalendar]);
      setAdding(false);
      return data;
    }
    executeMutation().then(fetchData).then();
  }
  const updateHoursMutation = gql`
      mutation updateHours($id:Int, $start:String, $end:String){
          changeStartAndEnd(id:$id, start: $start, end: $end){
              id
              start
              end
          }
      }
  `;

  let handleEventDrop = (info: EventDropArg) => {
    if(adding) return;

    const {event} = info;
    const eventID:number = +event.title.substring(event.title.length -3, event.title.length-1);
    const eventStart:string = moment(event.start).format();
    const eventEnd:string = moment(event.end).format();
    updateHours(eventID, eventStart, eventEnd).then();
  }
  const handleEventResize = (arg:EventResizeDoneArg) =>{
    if(adding) return;

    const eventID:number = +arg.event.title.substring(arg.event.title.length -3, arg.event.title.length-1);
    const eventStart = moment(arg.event.start!).format();
    const eventEnd = moment(arg.event.end!).format();
    updateHours(eventID, eventStart, eventEnd).then();
  }
  const updateHours = async(id:number, start:string, end:string) =>{
    if(adding) return;
    const data = await client.mutate({
      mutation:updateHoursMutation,
      variables:{
        id: id,
        start: start,
        end: end
      }
    });
    return data;
  }
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
        eventDrop = {handleEventDrop}
        eventChange={(arg:EventChangeArg) => console.log(arg)}
        eventResizableFromStart={true}
        eventResize = {handleEventResize}
      />
    </div>
    </>
  )
}
export default Hours;
