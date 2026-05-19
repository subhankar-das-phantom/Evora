import mongoose from "mongoose";
import dotenv from "dotenv";
import { Event } from "../modules/events/model/event.model.js";

dotenv.config();

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const filter = {
    status: "PUBLISHED",
    endDate: { $gte: new Date() }
  };
  
  const events = await Event.find(filter);
  console.log("Query filters:", JSON.stringify(filter));
  console.log("Current server time:", new Date());
  console.log("Active public events found:", events.length);
  console.log("Events:", events.map(e => ({ title: e.title, status: e.status, endDate: e.endDate })));

  await mongoose.disconnect();
}

check();
