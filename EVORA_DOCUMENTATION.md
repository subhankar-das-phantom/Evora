# EVORA - Premium Event Management Platform
## Complete Project Documentation

| Resource | Link / URL |
| :--- | :--- |
| **Live Deployed Application** | [https://evora-drab.vercel.app/](https://evora-drab.vercel.app/) |
| **GitHub Repository** | [https://github.com/subhankar-das-phantom/Evora](https://github.com/subhankar-das-phantom/Evora) |

---


### CONTENT PAGE

| Topic | Section |
| :--- | :--- |
| [Introduction](#1-introduction) | 1 |
| [Project Background](#2-project-background) | 2 |
| [Project Category](#3-project-category) | 3 |
| [Tools and Platform](#4-tools-and-platform) | 4 |
| [System Analysis](#5-system-analysis) | 5 |
| [Feasibility Study](#6-feasibility-study) | 6 |
| [System Modelling & Methodology](#7-system-modelling--methodology) | 7 |
| [UML & System Diagrams](#8-uml--system-diagrams) | 8 |
| [Data Dictionary](#9-data-dictionary) | 9 |
| [Testing](#10-testing) | 10 |
| [Security Mechanisms](#11-security-mechanisms) | 11 |
| [Limitations of the Project](#12-limitations-of-the-project) | 12 |
| [Future Enhancements & Applications](#13-future-enhancements--applications) | 13 |
| [Bibliography & References](#14-bibliography--references) | 14 |

---


## 1. Introduction
EVORA is a sleek, premium, and highly-curated event management platform designed to discover, book, and scale exclusive gatherings. Built using a modern MERN stack (MongoDB, Express, React, Node.js), Evora bridges the gap between event organizers and attendees by discarding cluttered legacy designs in favor of an elegant, frictionless ecosystem. This system is developed as a comprehensive web application where users can easily view events, book tickets, and manage their reservations from any internet-connected device.

The system allows users to explore events based on different categories, dates, and locations. Evora handles secure ticket booking, provides dynamic analytics, real-time ticket ledger tracking, role-based access controls (RBAC), and a secure first-time password reset system for new administrative accounts. It also offers administrative dashboards tailored for event organizers to manage their events, track financial performance, and oversee attendee lists efficiently.

## 2. Project Background
The necessity for a streamlined, modern event management system arose from the clutter and complexity of existing legacy platforms. Most traditional systems offer a disjointed user experience characterized by complex navigation, slow page loads, and outdated design aesthetics. 

Evora was conceptualized and developed out of the necessity to provide a frictionless, premium experience for both sides of the event lifecycle:
1. **Event Organizers:** Require robust, real-time management tools, analytics, and control over their listings without navigating a labyrinth of menus.
2. **Attendees:** Seek a simple, elegant, and secure booking process that works flawlessly on desktop and mobile browsers.

## 3. Project Category
This project falls under the category of a **Full-Stack Web Application (Database-Driven)**. 
Because the application is heavily reliant on real-time data processing, concurrent bookings, and dynamic user interfaces, it employs a **NoSQL database approach** utilizing MongoDB. The system architecture is built on a standard Client-Server RESTful model, ensuring decoupled frontend and backend modules that scale independently.

## 4. Tools and Platform
### 4.1 Software Requirements
**Client-Side (Frontend):**
* **Framework:** React 18
* **Build Tool:** Vite
* **Routing:** React Router DOM v6
* **Styling & UI:** TailwindCSS, Vanilla CSS, Lucide React (Icons)
* **Animations:** Framer Motion, GSAP
* **State Management:** Zustand, SWR

**Server-Side (Backend):**
* **Environment:** Node.js
* **Framework:** Express.js
* **Security:** JWT (JSON Web Tokens), bcryptjs, Helmet, Rate Limiter
* **Validation:** Zod schemas

**Database:**
* **Database Engine:** MongoDB Atlas (Cloud NoSQL database)
* **ODM (Object Data Modeling):** Mongoose

### 4.2 Hardware Requirements (Deployment & Client)
Since EVORA is a cloud-hosted web application, the hardware requirements are divided between the servers running the application and the clients accessing it.

**Server Hardware (Minimum Cloud Specifications):**
* **Processor (CPU):** 2 vCPUs (e.g., AWS t3.small or equivalent)
* **Memory (RAM):** 2 GB to 4 GB RAM for smooth Node.js runtime execution.
* **Storage:** 20 GB SSD for OS and application logs (Database is hosted separately on MongoDB Atlas).
* **Network:** High-bandwidth internet connection (100Mbps+).

**Client Hardware (User Access):**
* **Device:** Any modern Desktop, Laptop, Tablet, or Smartphone.
* **Processor:** 1.0 GHz processor or higher.
* **Memory:** 1 GB RAM (minimum).
* **Browser:** Any modern web browser (Google Chrome, Mozilla Firefox, Safari, Edge) with JavaScript enabled.
* **Network:** Standard 3G/4G/5G or Broadband internet connection.

---

## 5. System Analysis

### 5.1 Problem Definition
The drawbacks of manual event tracking or using legacy event management systems lead to the development of Evora. Common drawbacks include:
* **Poor User Interface:** Complicated user interfaces resulting in high user drop-off rates during the ticket booking phase.
* **Data Inconsistency:** Lack of real-time ticket ledger tracking, frequently leading to overbooking or inaccurate capacity readings.
* **Management Clutter:** Complex and unorganized administrative dashboards that make it difficult to find critical financial data.
* **Security Flaws:** Inefficient role-based access controls for multi-tier management (Super Admin vs. Regular Admin).

### 5.2 Identification of Need
* **User Need:** Users require a fast, reliable, and aesthetically pleasing platform to search for and book events with minimal friction.
* **Admin Need:** Event organizers need a centralized dashboard to track ticket sales, view real-time analytics, and manage attendees without technical overhead.
* **System Need:** A highly secure backend system with proper authentication, payload authorization, and strict data validation to prevent injection attacks and unauthorized data manipulation.

### 5.3 Objective of the Project
The core objective of this project is to manage the intricate details of Users, Events, Bookings, and Administrative Roles efficiently. The objectives include:
* Creating a robust User Registration and Authentication gateway.
* Implementing strict Role-based Access Control (Super Admin, Admin, User).
* Delivering a full suite of Event Creation and Management tools.
* Building a reliable Online Ticket Booking and Ledger Tracking engine.
* Generating a Dynamic Analytics Dashboard for financial and operational tracking.

---

## 6. Feasibility Study
A system's feasibility is considered from economic, technical, schedule, and organizational viewpoints.

* **Economic Feasibility:** The project relies heavily on open-source technologies (MERN stack, Vite, TailwindCSS) and free-tier cloud services (MongoDB Atlas, Vercel/Render) for initial deployment. This significantly reduces development, licensing, and deployment costs, making it highly economically viable.
* **Technical Feasibility:** The system utilizes modern, widely-adopted web technologies that are supported by massive communities. The use of Node.js and React guarantees high performance and scalability.
* **Schedule Feasibility:** The modular architecture (separating Backend APIs from Frontend UI) allows for iterative development. The project can be easily broken down into sprints, making completion within standard software lifecycles highly feasible.
* **Organizational Feasibility:** The system streamlines event operations, reducing manual workload and paperwork. It is organizationally sound as it adds immediate value to event organizers.

---

## 7. System Modelling & Methodology
The project follows an **Agile Methodology** utilizing iterative design, development, and testing phases. 

**Development Phases:**
1. **Requirement Analysis:** Understanding the needs of organizers and attendees.
2. **System Design:** Database schema design and API endpoint mapping.
3. **Implementation:** Writing the backend Node.js logic and frontend React components.
4. **Testing:** Unit testing, API testing (via Postman), and UI/UX validation.
5. **Deployment:** Pushing to production cloud servers.

---

## 8. UML & System Diagrams

### 8.1 Architectural Design

![Architectural Design](./diagrams/g1.png)

### 8.2 Use Case Diagram

![Use Case Diagram](./diagrams/g2.png)

### 8.3 Activity Diagram: Ticket Booking Flow

![Activity Diagram](./diagrams/g3.png)

### 8.4 Sequence Diagram: Authentication Flow

![Sequence Diagram](./diagrams/g4.png)

### 8.5 Entity Relationship Diagram (ERD)

![Entity Relationship Diagram](./diagrams/g5.png)

---

## 9. Data Dictionary

The data dictionary outlines the strict schema definitions enforced by Mongoose in the backend application.

**9.1 User Schema**

| Field Name | Data Type | Constraint | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Unique identifier auto-generated by MongoDB. |
| `name` | String | Required | Full name of the user. |
| `email` | String | Required, Unique | Email address used for authentication. |
| `password` | String | Required | Bcrypt hashed password. |
| `role` | String | Enum | Can be `user`, `admin`, or `super_admin`. |
| `isFirstLogin`| Boolean | Default: `true` | Used to force a password reset for newly created admins. |


**9.2 Event Schema**

| Field Name | Data Type | Constraint | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Unique identifier auto-generated by MongoDB. |
| `title` | String | Required | The public title of the event. |
| `description` | String | Required | Detailed description of the event. |
| `date` | Date | Required | The date and time the event takes place. |
| `location` | String | Required | Venue or virtual link for the event. |
| `totalCapacity`| Number | Required | Maximum number of tickets available. |
| `ticketsSold` | Number | Default: `0` | Running tally of successful bookings. |
| `price` | Number | Required | Cost per ticket. |
| `organizer` | ObjectId | Ref: User | Foreign key mapping to the Admin who created it. |


**9.3 Booking Schema**

| Field Name | Data Type | Constraint | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Unique identifier auto-generated by MongoDB. |
| `user` | ObjectId | Ref: User | Foreign key to the User making the booking. |
| `event` | ObjectId | Ref: Event | Foreign key to the Booked Event. |
| `ticketsCount`| Number | Required | Number of tickets requested in this transaction. |
| `totalAmount` | Number | Required | Computed as (ticketsCount * Event.price). |
| `bookingDate` | Date | Default: `now()` | Timestamp of the transaction. |
| `status` | String | Enum | e.g., `confirmed`, `cancelled`. |


---

## 10. Testing

### 10.1 Testing Methodologies
Evora underwent rigorous testing across multiple stages to ensure data integrity and user experience:

* **Black Box Testing (Functional):** Testers interact with the React frontend interfaces to ensure buttons, forms, and navigations produce expected outcomes without inspecting the underlying code.
* **White Box Testing (Structural):** Developers test specific functions, API endpoints, and database queries (e.g., verifying that a booking request correctly increments the `ticketsSold` counter).
* **Integration Testing:** Ensuring the React frontend Axios interceptors correctly pass JWT tokens to the Express REST API, and the API successfully processes and returns the right JSON payload.
* **Validation Testing:** Utilizing Zod schemas to ensure invalid data (e.g., negative ticket counts, malformed emails) is rejected at both the client-side form level and backend route level.

### 10.2 Validation Controls
The application employs multiple layers of validation:
* **Required Field Validation:** Ensures essential fields (Title, Date, Password) are not blank.
* **Type Validation:** Ensures numeric fields receive numbers and date fields receive valid ISO date strings.
* **Business Logic Validation:** Ensures users cannot book more tickets than `totalCapacity - ticketsSold`.

---

## 11. Security Mechanisms

Evora implements several critical security mechanisms to protect user data and ensure system integrity:

1. **Authentication & Authorization:** Uses **JSON Web Tokens (JWT)** for stateless, secure authentication. Strict Role-Based Access Control (RBAC) middleware ensures that standard users cannot hit admin endpoints.
2. **Password Cryptography:** Employs **bcryptjs** to salt and hash user passwords before storing them in the database, ensuring that passwords remain secure even in the event of a database breach.
3. **Data Sanitization & Validation:** **Zod** is used to strictly validate all incoming data payloads on both the client and server sides, neutralizing NoSQL injection vulnerabilities.
4. **Rate Limiting:** Protects the API from brute-force and DDoS attacks by limiting the number of requests from a single IP address (e.g., maximum of 200 requests per 15-minute window).
5. **HTTP Headers (Helmet):** Helmet.js is utilized to set secure HTTP headers, mitigating common web vulnerabilities such as Cross-Site Scripting (XSS) and Clickjacking.
6. **First-Time Login Protocol:** As a safeguard, newly created admin accounts are flagged by the system and forced to reset their temporary passwords before gaining access to operational dashboards.

---

## 12. Limitations of the Project
While robust, the current iteration of the system has some limitations:
* **Internet Dependency:** The application requires continuous internet connectivity and cannot function offline.
* **Payment Gateway Mocking:** Currently, the system registers bookings but does not process live monetary transactions. Integrating a live payment gateway (like Stripe) requires merchant approval and compliance with PCI DSS standards.
* **Real-time Notifications:** Real-time push notifications via WebSockets are not natively implemented in the base version.

---

## 13. Future Enhancements & Applications
The architecture of EVORA allows for seamless future expansions:
* **Live Payment Integration:** Integrating Stripe API or PayPal for processing live credit card transactions directly on the platform.
* **QR Code Check-in System:** Generating scannable QR codes for tickets, and developing an accompanying mobile scanner app for event door staff.
* **AI Chatbot Assistant:** Implementing a real-time chatbot to help users find events and answer common inquiries based on event descriptions.
* **Native Mobile Applications:** Utilizing React Native to deploy EVORA as a dedicated application on iOS (App Store) and Android (Google Play Store).
* **Automated Email & SMS:** Integrating SendGrid or Twilio to send automated booking confirmations and event reminders.

---

## 14. Bibliography & References
* **Live Deployed Application:** https://evora-drab.vercel.app/
* **GitHub Source Code Repository:** https://github.com/subhankar-das-phantom/Evora
* React Official Documentation: https://react.dev/
* Express.js Framework: https://expressjs.com/
* MongoDB & Mongoose ODM: https://mongoosejs.com/
* TailwindCSS Utility Framework: https://tailwindcss.com/
* Zod Schema Validation: https://zod.dev/
* Mermaid.js Diagram Documentation: https://mermaid.js.org/

