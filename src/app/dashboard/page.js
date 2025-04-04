"use client";
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/nextjs";
import CalendarComponent from "@/components/Calender/index.js";
import { ToastContainer ,toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import useEventStore from "@/store/eventStore";
import useThemeStore from "@/store/themeStore";
import { IoSettingsOutline } from "react-icons/io5";

export default function Dashboard() {
  const [addEvent , setAddEvent] = useState(false);
  const [customSetting ,setCustomSetting] = useState(false);
  const { bgColor, setBgColor } = useThemeStore();

  console.log(bgColor , "bgcolor")


  const {startDate ,setStartDate} = useEventStore();
  const {addEvents} = useEventStore();
  const [event , setEvent] = useState({
    title : "",
    endDate: "",
    startDate : "",
    category : "",
    date : "",
    description : ""
  });

  useEffect(() => {
    if (addEvent || customSetting) {
      document.body.style.overflow = "hidden"; // Hide scrollbar
    } else {
      document.body.style.overflow = ""; // Restore scrollbar
    }
  
    return () => {
      document.body.style.overflow = ""; // Cleanup when unmounting
    };
  }, [addEvent , customSetting]);


   const handleChange = (e) => {
      const { name, value } = e.target;
      setEvent((prevEvent) => {
        const updatedEvent = { ...prevEvent, [name]: value };
        console.log("Updated Event State:", updatedEvent); // Debugging
        return updatedEvent;
      });
    };
    
  
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Event:", event); // Debugging
  
    
        if (!event.title || !event.category) {
          toast.error("Please fill in all fields");
          return;
        }
    
        try {
          const newEvent = {
            title: event.title,
            start: startDate,
            category: event.category,
            description: event.description,
          };
        
          console.log("Sending event to API:", newEvent); 
    
          await addEvents(newEvent); // Add event using Zustand
          toast.success("Event Added!");
    
          // Reset form after submission
          setEvent({
            title: "",
            startDate: "",
            endDate: "",
            category: "",
            description: "", // Reset description as well
          });
          setStartDate(""); // Reset startDate
          setAddEvent(false); // Hide form after submission
        } catch (error) {
          console.log(error, "err");
          toast.error("Failed to add event");
        }
      };

 
  
  return (
    <div>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="p-6 relative">
          <div className="flex justify-between">
          <h1 className={`text-${bgColor}  text-2xl font-bold`} style={{ backgroundColor: "white", color: bgColor }}>
  Time Table Planner
</h1>
            <UserButton />
          </div>
          <CalendarComponent event={event} setAddEvent={setAddEvent} />
        </div>
      </SignedIn>
     
        
        
      <ToastContainer closeButton={false} style={{height : "10px"}} hideProgressBar />   
      {addEvent && (
  <>
    {/* Blurred Background Overlay */}
    <div onClick={() => setAddEvent(!addEvent)}  className="absolute inset-0 bg-black/50 z-20"></div>
    {/* Sidebar Modal */}
    <div  className="absolute rounded-l-xl transform duration-200 top-0 right-0 z-40 py-4 bg-gray-500 h-[172vh] text-center w-80">
      <h2 className="text-lg text-white mb-4">Add Event</h2>

      <form onSubmit={handleSubmit} className="px-4 flex flex-col gap-6 space-y-5">
        <input 
          type="text" 
          name="title"  
          className="px-2 py-2 bg-white border-2 placeholder:text-gray-800 border-blue-600 rounded-xl outline-none"  
          value={event.title} 
          onChange={handleChange} 
          placeholder="Enter Title" 
        />

        <input 
          type="text"  
          className="px-2 py-2 bg-white border-2 placeholder:text-gray-800 border-blue-600 rounded-xl outline-none" 
          name="category" 
          value={event.category} 
          onChange={handleChange} 
          placeholder="Enter Category" 
        />

        <input 
          type="text"  
          className="px-2 py-2 bg-white border-2 placeholder:text-gray-800 border-blue-600 rounded-xl outline-none" 
          name="description" 
          value={event.description} 
          onChange={handleChange} 
          placeholder="Enter Description" 
        />

        <div className="w-full ml-2 flex justify-start items-start cursor-pointer">
          <button 
            type="submit" 
            className="px-8 py-2 rounded-full bg-white text-gray-800 border-l-9 border-2 border-blue-600 cursor-pointer hover:border-l-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </>
)}
{customSetting && (
  <>
    {/* Blurred Background Overlay */}
    <div onClick={() => setCustomSetting(!customSetting)}  className="absolute inset-0 bg-black/50 z-20"></div>
    {/* Sidebar Modal */}
    <div  className="absolute rounded-l-xl transform duration-200 top-0 right-0 z-40 py-4 bg-gray-100 h-[172vh] text-center w-80">
      <h2 className="text-lg text-gray-900 mb-4">Change Background</h2>

      <div className="p-3  flex justify-between items-center">
        <div onClick={() => setBgColor("red")} className="bg-red-600 cursor-pointer h-10 w-20 rounded-md"></div>
        <div onClick={() => setBgColor("blue")} className="bg-blue-600 cursor-pointer h-10 w-20 rounded-md"></div>
        <div onClick={() => setBgColor("purple")} className="bg-purple-600 cursor-pointer h-10 w-20 rounded-md"></div>
       
      </div>

     
    </div>
  </>
)}

    <div onClick={() => setCustomSetting(!customSetting)} className="w-10 absolute top-30 right-1.5 h-10 flex justify-center items-center rounded-full text-white bg-blue-500">
    <IoSettingsOutline className="text-lg"/>

    </div>


{addEvent && (
  <>
    {/* Blurred Background Overlay */}
    <div onClick={() => setAddEvent(!addEvent)}  className="absolute inset-0 bg-black/50 z-20"></div>
    {/* Sidebar Modal */}
    <div  className="absolute rounded-l-xl transform duration-200 top-0 right-0 z-40 py-4 bg-gray-500 h-[172vh] text-center w-80">
      <h2 className="text-lg text-white mb-4">Add Event</h2>

      <form onSubmit={handleSubmit} className="px-4 flex flex-col gap-6 space-y-5">
        <input 
          type="text" 
          name="title"  
          className="px-2 py-2 bg-white border-2 placeholder:text-gray-800 border-blue-600 rounded-xl outline-none"  
          value={event.title} 
          onChange={handleChange} 
          placeholder="Enter Title" 
        />

        <input 
          type="text"  
          className="px-2 py-2 bg-white border-2 placeholder:text-gray-800 border-blue-600 rounded-xl outline-none" 
          name="category" 
          value={event.category} 
          onChange={handleChange} 
          placeholder="Enter Category" 
        />

        <input 
          type="text"  
          className="px-2 py-2 bg-white border-2 placeholder:text-gray-800 border-blue-600 rounded-xl outline-none" 
          name="description" 
          value={event.description} 
          onChange={handleChange} 
          placeholder="Enter Description" 
        />

        <div className="w-full ml-2 flex justify-start items-start cursor-pointer">
          <button 
            type="submit" 
            className="px-8 py-2 rounded-full bg-white text-gray-800 border-l-9 border-2 border-blue-600 cursor-pointer hover:border-l-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </>
)}
      
     
      
       </div>
  );
}
