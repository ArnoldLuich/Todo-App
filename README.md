# Todo App
## Overview
This project consists of a **Spring Boot** backend and a **React + TypeScript** frontend, using **PostgreSQL** as the database. The entire application is containerized using **Docker** for easy deployment and scalability.

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
- **Containerization**: Ensures consistent environments across development, testing, and production.
- **Easy Deployment**: Simplifies dependency management and eliminates "works on my machine" issues.

## Running the Application

### Prerequisites
Ensure you have the following installed:
- [Docker](https://docs.docker.com/desktop/setup/install/windows-install/)

### Step 1: Clone the Repository
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### Step 2: Set Up Environment Variables
Create a `.env` file in the project root with the following:
```env
# PostgreSQL
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=mydatabase
DB_HOST=db
DB_PORT=5432
```

### Step 3: Start the Application with Docker
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

