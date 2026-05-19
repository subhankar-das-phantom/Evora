import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../modules/users/model/user.model.js";
import { Event } from "../modules/events/model/event.model.js";
import { Booking } from "../modules/bookings/model/booking.model.js";
import { ROLES } from "../common/constants/roles.js";
import { EVENT_STATUS } from "../common/constants/eventStatus.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("MONGODB_URI is not defined in your environment variables.");
  process.exit(1);
}

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected!");

    // Clear existing data
    console.log("Clearing collections...");
    await Promise.all([
      User.deleteMany({}),
      Event.deleteMany({}),
      Booking.deleteMany({})
    ]);

    // Passwords
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash("Password123!", salt);

    console.log("Creating users...");
    // 1. Super Admin
    const superAdmin = await User.create({
      name: "EVORA Root",
      email: "superadmin@evora.app",
      password: passwordHash,
      role: ROLES.SUPER_ADMIN,
      isActive: true,
      firstLoginRequired: false
    });

    // 2. Regular Admin
    const regularAdmin = await User.create({
      name: "Jane Admin",
      email: "admin@evora.app",
      password: passwordHash,
      role: ROLES.ADMIN,
      isActive: true,
      firstLoginRequired: false,
      createdBy: superAdmin._id
    });

    // We distribute user creation dates to test trend logic
    const now = new Date();
    const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
    const fortyDaysAgo = new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000);

    const testUsers = [];
    // Users in last 30 days (Current month)
    for (let i = 1; i <= 10; i++) {
      const u = await User.create({
        name: `User Current ${i}`,
        email: `current${i}@evora.app`,
        password: passwordHash,
        role: ROLES.USER,
        createdAt: tenDaysAgo,
        updatedAt: tenDaysAgo
      });
      testUsers.push(u);
    }
    // Users 31-60 days ago (Previous month)
    for (let i = 1; i <= 5; i++) {
      const u = await User.create({
        name: `User Past ${i}`,
        email: `past${i}@evora.app`,
        password: passwordHash,
        role: ROLES.USER,
        createdAt: fortyDaysAgo,
        updatedAt: fortyDaysAgo
      });
      testUsers.push(u);
    }

    console.log("Creating events...");
    const categories = ["TECHNOLOGY", "BUSINESS", "DESIGN", "NETWORKING"];
    const venues = ["Auditorium A", "Conference Hall 4", "Grand Ballroom", "Online"];
    const testEvents = [];

    // Current month events
    for (let i = 1; i <= 6; i++) {
      const title = `Tech Summit Edition ${i}`;
      const startDate = new Date(now.getTime() + i * 2 * 24 * 60 * 60 * 1000);
      const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);
      
      const event = await Event.create({
        title,
        slug: `${slugify(title)}-${Date.now()}-${i}`,
        description: "Explore the bleeding edge of software engineering, artificial intelligence, and scalable cloud structures in this premium tech summit event.",
        category: categories[i % categories.length],
        venue: venues[i % venues.length],
        startDate,
        endDate,
        maxSeats: 50 + (i * 10),
        bookedSeats: 0,
        status: EVENT_STATUS.PUBLISHED,
        createdBy: regularAdmin._id,
        createdAt: tenDaysAgo,
        updatedAt: tenDaysAgo
      });
      testEvents.push(event);
    }

    // Previous month events
    for (let i = 1; i <= 3; i++) {
      const title = `Legacy Webinar ${i}`;
      const startDate = new Date(now.getTime() - i * 15 * 24 * 60 * 60 * 1000);
      const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
      
      const event = await Event.create({
        title,
        slug: `${slugify(title)}-${Date.now()}-${i}-past`,
        description: "A past webinar looking at standard design and project management structures within medium enterprise organizations.",
        category: categories[i % categories.length],
        venue: venues[i % venues.length],
        startDate,
        endDate,
        maxSeats: 100,
        bookedSeats: 0,
        status: EVENT_STATUS.PUBLISHED,
        createdBy: regularAdmin._id,
        createdAt: fortyDaysAgo,
        updatedAt: fortyDaysAgo
      });
      testEvents.push(event);
    }

    console.log("Creating bookings...");
    // Current bookings (booked in last 30 days)
    for (let i = 0; i < 8; i++) {
      const user = testUsers[i];
      const event = testEvents[i % 6]; // Current event
      
      await Booking.create({
        userId: user._id,
        eventId: event._id,
        qrCode: "data:image/png;base64,mockQrCodeDataCurrent",
        bookingStatus: "BOOKED",
        checkedIn: i % 3 === 0,
        createdAt: tenDaysAgo,
        updatedAt: tenDaysAgo
      });
      
      // Update booked seats
      await Event.findByIdAndUpdate(event._id, { $inc: { bookedSeats: 1 } });
    }

    // Previous bookings (booked 31-60 days ago)
    for (let i = 0; i < 4; i++) {
      const user = testUsers[i + 10]; // Past user
      const event = testEvents[6 + (i % 3)]; // Past event
      
      await Booking.create({
        userId: user._id,
        eventId: event._id,
        qrCode: "data:image/png;base64,mockQrCodeDataPast",
        bookingStatus: "BOOKED",
        checkedIn: true,
        createdAt: fortyDaysAgo,
        updatedAt: fortyDaysAgo
      });
      
      // Update booked seats
      await Event.findByIdAndUpdate(event._id, { $inc: { bookedSeats: 1 } });
    }

    console.log("\nDatabase seeded successfully!");
    console.log("-----------------------------------------");
    console.log("Super Admin Login:");
    console.log("  Email:    superadmin@evora.app");
    console.log("  Password: Password123!");
    console.log("-----------------------------------------");
    console.log("Regular Admin Login:");
    console.log("  Email:    admin@evora.app");
    console.log("  Password: Password123!");
    console.log("-----------------------------------------");

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  }
}

seed();
