
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Event from "@/models/Events";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const { userId } = await auth(req);
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const events = await Event.find({ userId });
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Error fetching events" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { userId } = await auth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title,start, category ,description } = body;
    console.log("Received Event Data:", { title, start, category, description });

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { error: "Missing required fields (title,description ,category)" },
        { status: 400 }
      );
    }

    // Create proper date objects and extract date string
    const startDate = new Date(start);
   
    const dateString = startDate.toISOString().split('T')[0];

    console.log("Saving event to DB:", { userId, title, start, category, description });

    const newEvent = await Event.create({
      userId,
      title,
      description,
      startTime: startDate,  
      date: dateString,
      category
    });
    
    console.log("Saved event:", newEvent);

    return NextResponse.json(
      { 
        success: true, 
        event: {
          id: newEvent._id,
          title: newEvent.title,
          start: newEvent.startTime,
          end: newEvent.endTime,
          date: newEvent.date,
          description,
          category
        }
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("Detailed error adding event:", {
      message: error.message,
      validationErrors: error.errors
    });
    return NextResponse.json(
      { 
        error: "Failed to add event",
        details: error.message,
        ...(error.errors && { validationErrors: error.errors })
      }, 
      { status: 500 }
    );
  }
}