import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import {toast} from "react-toastify";
import useEventStore from "@/store/eventStore";

const CalendarComponent = ({setAddEvent}) => {
  //  const [addEvent , setAddEvent] = useState(false);
  const {setStartDate } = useEventStore();
  const { events, fetchEvents, loading, error } = useEventStore(); // Zustand store

  

  

 

    useEffect(() => {
      fetchEvents(); // Fetch events when component mounts
    }, [events]);

  

  const handleDateClick = async (info) => {
    setAddEvent(prev => !prev);
    setStartDate(info.dateStr);
  
    // {
    //   try {
    //     const newEvent = { title, start: info.dateStr, end: info.dateStr, category: "Personal" };
    //     await axios.post("/api/events", newEvent);
    //     setEvents([...events, newEvent]);
    //     toast.success("Event Added!");
    //   } catch (error) {
    //     console.log(error , "err")
    //     toast.error("Failed to add event");
    //   }
    // }
  };

  

  return (
    <div className="absolute min-h-screen overflow-hidden w-[97%]">
  <FullCalendar
  plugins={[dayGridPlugin, interactionPlugin]}
  initialView="dayGridMonth"
  events={events}
  dateClick={handleDateClick}
  eventContent={(arg) => {
    return (
      <div>
        <strong>{arg.event.title}</strong>
        <div className="flex  w-full justify-start gap-3 items-start" style={{ fontSize: "12px", color: "white" }}>
          <span>category:</span> {arg.event.extendedProps.category}
        </div>
      </div>
    );
  }}
  dayMaxEventRows={2}  // Show max 3 events, then "+more"
/>



    
     
     
    </div>
  );
};

export default CalendarComponent;
