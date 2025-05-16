# Leave Management Service

The Leave Management Service is a full-stack web application designed to streamline and automate the process of managing employee leave requests within an organization. It provides a user-friendly interface for employees to apply for leave and for administrators to review, approve, or decline requests.

---

## Project Structure

The project is organized into two main parts:

### 1. Spring Boot Backend (`/src`, `/pom.xml`, etc.)

- **Purpose:** Handles business logic, data persistence, and REST API endpoints.
- **Key folders/files:**
  - `src/main/java/com/fedex/leave_management/`
    - `Controller/` – REST controllers for handling API requests
    - `Entity/` – JPA entities (database models)
    - `Repository/` – Spring Data JPA repositories
    - `Service/` – Business logic and service classes
    - `Dto/` – Data Transfer Objects for API communication
  - `src/main/resources/application.properties` – Spring Boot configuration
  - `pom.xml` – Maven build configuration

### 2. React Frontend (`/frontend`)

- **Purpose:** Provides the user interface for employees and administrators.
- **Key folders/files:**
  - `frontend/src/`
    - `components/` – React components for employee and admin features
    - `home/` – Landing, login, and informational pages
    - `services/` – API service utilities
    - `App.js` – Main React app and routing
    - `index.js` – Entry point
  - `frontend/public/` – Static assets and HTML template
  - `frontend/package.json` – Frontend dependencies and scripts

---

## How to Run the Application

### Prerequisites

- Java 17+
- Maven
- Node.js and npm

### 1. Start the Spring Boot Backend

```sh
# In the project root directory
./mvnw spring-boot:run
```

- The backend will start on [http://localhost:8080](http://localhost:8080).

### 2. Start the React Frontend

```sh
# In a new terminal
cd frontend
npm install
npm start
```

- The frontend will start on [http://localhost:3000](http://localhost:3000).

---

## Folder Structure Overview

```
leave-management-service/
│
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/com/fedex/leave_management/
│   │   │   ├── Controller/
│   │   │   ├── Entity/
│   │   │   ├── Repository/
│   │   │   ├── Service/
│   │   │   └── Dto/
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── components/
│       ├── home/
│       ├── services/
│       ├── App.js
│       └── index.js
└── ...
```

---

## Usage

- Employees can log in, apply for leave, and view their leave history.
- Administrators can log in, view all leave requests, and approve or decline them.

---

## Notes

- Make sure your MySQL database is running and configured as per `application.properties`.
- CORS is enabled for local development between frontend (`localhost:3000`) and backend (`localhost:8080`).

---

## License

This project is for demonstration purposes.
