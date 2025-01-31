# Todo App
## Overview
This Todo app features a **Spring Boot** backend, a **React + TypeScript** frontend, and **PostgreSQL** for data storage. The entire application is containerized with **Docker**.

## Running the Application

### Prerequisites
Ensure you have the following installed:
- [Docker](https://docs.docker.com/desktop/setup/install/windows-install/)
- [Java 21](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html)

### Step 1: Clone the Repository
```sh
git clone https://github.com/ArnoldLuich/Todo-App.git
cd Todo-App
```

### Step 2: Build the Backend Jar File
Navigate to the backend directory and build the jar file using Gradle:
```sh
cd todo-backend 
./gradlew bootJar
```

### Step 3: Start the Application with Docker
Run the following command in Todo-App directory
```sh
docker-compose up --build
```
This will:
- Start the PostgreSQL database container
- Start the Spring Boot backend
- Start the React frontend

### Step 4: Verify Everything is Running
Once the containers are up, check:
- Backend API: [http://localhost:8080/todos/filter](http://localhost:8080/todos/filter)
- Frontend App: [http://localhost:3000](http://localhost:3000)

---
## Tech Stack & Reasoning
### Backend: Spring Boot
- **Robust & Scalable**: Spring Boot provides a strong foundation for building REST APIs efficiently.
- **Built-in JPA Support**: Works seamlessly with PostgreSQL, reducing boilerplate code for database interactions.
- **Microservices Ready**: Ideal for future scalability if needed.

### Frontend: React + TypeScript
- **Component-Based Architecture**: Ensures modularity and reusability of UI elements.
- **Type Safety**: TypeScript helps prevent runtime errors by enforcing type checking at compile-time.
- **Performance**: React provides efficient UI updates using its virtual DOM.

### Database: PostgreSQL
- **Reliability & Performance**: PostgreSQL is a powerful relational database known for handling large-scale applications.
- **Open-Source & Extensible**: Offers flexibility and support for complex queries.

### Docker
- **Containerization**: Ensures consistent environments across developments and testing.




