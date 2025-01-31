# Todo App
## Overview
This Todo app features a **Spring Boot** backend, a **React + TypeScript** frontend, and **PostgreSQL** for data storage. The entire application is containerized with **Docker**.

## Running the Application

### Prerequisites
Ensure you have the following installed:
- [Docker](https://docs.docker.com/desktop/setup/install/windows-install/)

### Step 1: Clone the Repository
```sh
git clone https://github.com/ArnoldLuich/Todo-App.git
cd Todo-App
```

### Step 2: Start the Application with Docker
Run the following command in Todo-App directory
```sh
docker-compose up --build
```
- It might take some time to start!

This will:
- Start the PostgreSQL database container
- Start the Spring Boot backend
- Start the React frontend

### Step 3: Verify Everything is Running
Once the containers are up, check:
- Backend API: [http://localhost:8080/todos/filter](http://localhost:8080/todos/filter)
- Frontend App: [http://localhost:3000](http://localhost:3000)

---
## Tech Stack & Reasoning
### Backend: Spring Boot
- **Robust & Scalable**: Spring Boot provides a strong foundation for building REST APIs efficiently.
- **Built-in JPA Support**: Simplifies database interactions with PostgreSQL, reducing boilerplate code.

### Frontend: React + TypeScript
- **Component-Based Architecture**: Promotes modularity, reusability, and maintainability of UI elements.
- **Type Safety**: TypeScript reduces potential runtime errors by enforcing strict type checking at compile-time.
- **Optimized Performance**: React’s virtual DOM ensures efficient rendering and state updates.

### Database: PostgreSQL
- **Reliability & Performance**: PostgreSQL is a powerful relational database known for handling large-scale applications.
- **Open-Source & Extensible**: Offers flexibility and support for complex queries.

### Docker
- **Containerization**: Ensures consistent environments across developments and testing.

---

## Features Implemented
### Frontend Functionality
✅ **Create To-Dos** – Users can add tasks with a description, creation date, and due date.

✅ **Update To-Dos** – Users can modify the description, due date, and status (done/not done).

✅ **Delete To-Dos** – Users can remove tasks.

✅ **Filtering in UI** – Users can filter todos based on: Done / Not Done **|** Due Date **|** Text Search (Matches any part of a todo description)

### API Functionality
✅ **CRUD Operations** – Fully implemented to support the frontend.

✅ **Filtering** – Users can filter tasks via API using:



