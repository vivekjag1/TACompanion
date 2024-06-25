import {useState} from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateClickArg } from '@fullcalendar/interaction'; // Import the type
import moment from 'moment-timezone';
import CustomModal from "@/components/CustomModal";
import type {HoursType} from "@/mongoose/timeWorked/schema";
moment.tz.setDefault('America/New_York');
const Hours = () =>{

  const [open, setOpen] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [hours, setHours] = useState<HoursType[]>([]);
  const [date, setDate] = useState<string>("");
  const handleClick = (arg:DateClickArg) =>{
    setOpen(true);
    const index = arg.dateStr.indexOf("T");
    const date = arg.dateStr.substring(0, index);
    setDate(date);
    setStartTime(arg.date);
  }
  const addHours = (hour:HoursType) =>{
    const end = new Date(date.concat("T").concat(hour.end as string).concat(':00'))
    const addToCalendar  = {
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
    setHours(prev => [...prev, addToCalendar]);
    //add graphql logic here



  }
  return(
    <>
    <CustomModal open={open} handleClose={() => setOpen(false)} startTime={startTime} setHours={addHours}/>
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
      />
    </div>
    </>
  )
}
export default Hours;
