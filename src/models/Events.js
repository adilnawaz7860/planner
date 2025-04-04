import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    description: { type: String },
    category: { type: String }, // Ensure this is correctly defined
  },
  { timestamps: true }
);

// Force Mongoose to use the updated schema
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
export default Event;
