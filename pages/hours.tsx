import {useEffect, useState} from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {DateClickArg, EventResizeDoneArg} from '@fullcalendar/interaction';
import moment from 'moment-timezone';
import CustomModal from "@/components/CustomModal";
import type {HoursType} from "@/mongoose/timeWorked/schema";
import {useUser} from "@auth0/nextjs-auth0/client";
import {gql} from "graphql-tag";
import client from "../graphql/client";
import {useRouter} from "next/router";
import {EventClickArg, EventDropArg} from "@fullcalendar/core";
import EditEventModal from "@/components/EditEventModal";
import {WarningModal} from "@/components/WarningModal";
moment.tz.setDefault('America/New_York');
const Hours = () => {
  let {user, error, isLoading} = useUser(); //hold auth0 hooks
  const router = useRouter(); //router for redirecting if not logged in
  const [open, setOpen] = useState<boolean>(false); //modal open state
  const [startTime, setStartTime] = useState<Date>(new Date()); //start
  const [hours, setHours] = useState<HoursType[]>([]); //array of hours
  const [date, setDate] = useState<string>(""); //data clicked
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [clickedHour, setClickedHour] = useState<HoursType>(hours[0]);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(false);
  const [acknowledged, setAcknowledged] = useState<boolean>(false);
  //all the code related to getting the hours on an initial page reload
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
      }`;
  useEffect(() => {
    if (!user && !isLoading) { //if the information is fetched but there is still no user object then move to l
      router.push('/api/auth/login').then();
    } else {
      fetchData().then();
    }
    // eslint-disable-next-line
  }, [user, isLoading]);
  const fetchData = async () => {
    if (user == undefined) return;
    const data = await client.query({
      query: getHours,
      variables: {
        name: user?.name
      }
    });
    const hoursResults = data['data']['fetchHoursByName'];
    const newItems = hoursResults.map((item: HoursType) => {
      const toRet = {
        title: `Type: ${(item.title as string).substring(0, (item.title as string).length - 8)}, Description: ${item.description as string},  (ID: ${item.id as number})`,
        start: item.start,
        end: item.end,
        color: (item.title as string).includes('office hours') ? 'green' : ((item.title as string).includes('meeting') ? 'blue' : 'red')
      };
      return toRet;
    });
    setHours(newItems);

    return newItems;
  }
  //code related to ADDING another hour
  const addHourMutation = gql`
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

  //opens the model and sets the start
  const handleClick = (arg: DateClickArg) => {
    setOpen(true);
    const index = arg.dateStr.indexOf("T");
    const date = arg.dateStr.substring(0, index);
    setDate(date);
    setStartTime(arg.date);
  }

  //actually adds the hours
  const addHours = (hour: HoursType) => {
    const end = new Date(date.concat("T").concat(hour.end as string).concat(':00'));
    const executeMutation = async () => {
      const data = await client.mutate({
        mutation: addHourMutation,
        variables: {
          title: hour.title,
          courseCode: hour.courseCode,
          description: hour.description,
          start: moment(startTime).format(),
          end: moment(end).format(),
          name: user?.name
        }
      });
      const addToCalendar = {
        id:hours.length +1,
        title: `Type: ${(hour.title as string)}, Description: ${hour.description as string},  (ID: ${data['data']['addHour']['id']})`,
        start: moment(startTime).format(),
        end: moment(end).format(),
        color: (hour.title as string).includes('office hours') ? 'green' : ((hour.title as string).includes('meeting') ? 'blue' : 'red')
      }

      setHours(prev => [...prev, addToCalendar]);
      countHours();

      return addToCalendar;
    }
    executeMutation().then();
  }

  useEffect(() => {
    if(totalHours > 10){
      //open modal
      setWarningModalOpen(true);
    }

  }, [totalHours]);





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
    const {event} = info;
    const eventID: number = +event.title.substring(event.title.length - 3, event.title.length - 1);
    const eventStart: string = moment(event.start).format();
    const eventEnd: string = moment(event.end).format();
    updateHours(eventID, eventStart, eventEnd).then(); //update actual item
    //update state
    const newData = hours.filter(hour =>{
      return (hour.title != event.title)
    });
    const newItem ={
      title:event.title,
      start: eventStart,
      end:eventEnd,
      color: (event.title as string).includes('office hours') ? 'green' : ((event.title as string).includes('meeting') ? 'blue' : 'red')
    };
    newData.push(newItem);
    setHours(newData);
  }
  const handleEventResize = (arg: EventResizeDoneArg) => {
    const eventID: number = +arg.event.title.substring(arg.event.title.length - 3, arg.event.title.length - 1);
    const eventIDAsString = arg.event.title.substring(arg.event.title.length - 3, arg.event.title.length - 1);
    const eventStart = moment(arg.event.start!).format();
    const eventEnd = moment(arg.event.end!).format();
    updateHours(eventID, eventStart, eventEnd).then();
    let acc = 0;
    acc += (((new Date( eventEnd as string).getTime() - new Date(eventStart as string).getTime())) /(1000 * 60 * 60));
    const newHours = hours.map((item) =>{
      if(((item.title as string).includes(eventIDAsString))){
        item.start = eventStart;
        item.end = eventEnd;
      }
      return item;
    });
    setHours(newHours);

    //
    //
    // if(acc > 10){
    //   setAcknowledged(false);
    //   setWarningModalOpen(true);
    // }
    // setTotalHours(totalHours + acc);
    // console.log("new total hours", acc);
    //
    //
    //
    //
    //
    //
    //
    //
    //
    // setTotalHours(totalHours + ((((new Date( eventEnd as string).getTime() - new Date(eventStart as string).getTime())) /(1000 * 60 * 60))))
  }
  const updateHours = async (id: number, start: string, end: string) => {
    const data = await client.mutate({
      mutation: updateHoursMutation,
      variables: {
        id: id,
        start: start,
        end: end
      }
    });
    return data;
  }
  const handleEventClick = async(arg:EventClickArg) =>{



    const eventID = +arg.event.title.substring(arg.event.title.indexOf('(') + 4, arg.event.title.indexOf(')'));
      const getHourByID = gql `
        query getHourByID($ID:Int){
            fetchHoursByID(ID: $ID){
                id 
                title 
                courseCode
                description 
                start 
                end 
                name 
            }
        }
      `;

      const data = await client.query({
        query:getHourByID,
        variables:{
          ID: eventID
        },
        fetchPolicy:'network-only',
      });
    const fetchedHour = data['data']['fetchHoursByID'];
    setUpdateModalOpen(true);
    setClickedHour(fetchedHour);
  }

  const countHours = () => {
    let acc = 0;
    for(let i = 0; i < hours.length; i++){
      acc += (((new Date( hours[i].end as string).getTime() - new Date(hours[i].start as string).getTime())) /(1000 * 60 * 60));
    }
    if(acc > 10 && totalHours<10){
      setAcknowledged(false);
    }
    setTotalHours(acc);
  }
  useEffect(() =>{
    countHours();

  }, [hours]);

  const changeEvent = (hour:HoursType, action:string) =>{
    if(action === "add"){
      const eventID =  (hour.title as string).substring((hour.title as string).indexOf('(') + 4, (hour.title as string).indexOf(')'));
      const newHours = hours.filter((item) => !((item.title as string).includes(eventID)));
      const addToState = {
        id: +(eventID),
        title: hour.title,
        start: hour.start,
        end: hour.end,
        color:  (hour.title as string).includes('office hours') ? 'green' : ((hour.title as string).includes('meeting') ? 'blue' : 'red')
      };
      newHours.push(addToState);
      setHours(newHours);

      //in this case we need to recount ALL the hours
      setTotalHours(0);
    }
    else{
      const newItems = hours.filter((item) => !((item.title as string).includes(String(clickedHour.id as string))));
      setHours(newItems);
      //update total hours to remove the hour
    }
  }
  return (
    <>
      <CustomModal open={open} handleClose={() => setOpen(false)} startTime={startTime} setHours={addHours}
                   userName={user?.name}/>
      <WarningModal open={warningModalOpen && !acknowledged} onClose={() => setWarningModalOpen(false)} acknowledged={acknowledged} setAcknowledged={() => setAcknowledged(true)}/>

      <div className="text-center text-mono text-4xl">
        Your Hours
      </div>

      <div className=" items-center justify-center ml-[17rem] mr-[8rem]">
        <EditEventModal open={updateModalOpen} handleClose={() => setUpdateModalOpen(false)} event={clickedHour}
                        setHours={changeEvent}/>
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            center: "title",
            start: ''
          }}
          dateClick={handleClick}
          editable={true}
          events={hours}
          eventDrop={handleEventDrop}
          eventResizableFromStart={true}
          eventResize={handleEventResize}
          eventClick={handleEventClick}
        />
      </div>
    </>
  )
}
export default Hours;
