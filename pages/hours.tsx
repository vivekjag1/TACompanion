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
  const handleClick = (arg:DateClickArg) =>{
    const calander = arg.view.calendar;
    setOpen(true);
    calander.addEvent({
      title: "Office Hours",
      start: moment('2024-06-24T10:00:00').format(),
      end: moment('2024-06-24T10:00:00').format(),
      color:'blue'
    })
   console.log(arg.date);
    setStartTime(arg.date);
  }
  return(
    <>
    <CustomModal open={open} handleClose={() => setOpen(false)} startTime={startTime} setHours={setHours}/>
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