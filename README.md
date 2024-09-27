# ePayco Wallet Simulation - Full Stack Developer Test

This repository contains the solution for the **ePayco Full Stack Developer Test**. The objective is to build a complete virtual wallet system using two separate REST APIs and a client application, each with well-defined roles and responsibilities. The project is organized into three main components:

1. **Frontend Application**: Serving as the interface for user interactions.
2. **REST API Client Service**: Functions as an intermediary between the frontend and the backend database service, managing validation, request processing, and session handling.
3. **REST API Database Service**: Manages business logic and data persistence using MySQL, ensuring transactional integrity and data consistency.

## 📂 Project Structure

### 1. **Frontend Application (`frontend-react`)**
- **Framework**: React
- The frontend is a Single Page Application (SPA) that communicates with the Client Service API. It provides the following features:
  - **User Registration**: Allows new users to sign up by providing basic information.
  - **Wallet Top-Up**: Users can add funds to their virtual wallet.
  - **Payment Process**: Facilitates making payments and generates session tokens.
  - **Confirmation of Payment**: Users can validate transactions by entering the token received.
  - **Wallet Balance Inquiry**: Enables users to check their current wallet balance.
- **Tools and Libraries**:
  - `React Router`: Used for seamless navigation between different views.
  - `React v19`: Utilized for its advanced UI rendering capabilities.
  
- **Architecture Pattern**: **Domain-Driven Design (DDD) with Hexagonal Architecture**
  - Each domain (e.g., `Registration`, `Wallet Management`, and `Transactions`) is structured independently with a clear separation between core logic, application, and infrastructure layers.
  - This allows the frontend to be easily maintainable and extendable.

- **Design Principles**:
  - **Native Data Structures over DTOs**: Preference for using native data structures (e.g., JSON) over Data Transfer Objects (DTOs) to reduce complexity and enhance performance.
  - **Separation of Schemas from Implementations**: Domain models and validation schemas are separated from component implementations to enforce a single source of truth.
  - **Functional Programming Paradigm**: React is inherently suited for functional programming, and this approach is leveraged throughout the project for greater cohesion and predictability in state management.
  
- **Code Quality and Best Practices**:
  - **BEM Design**: Components are broken down into Blocks, Elements, and Modifiers, ensuring reusability and consistency.
  - **Custom Hooks and Functional Utilities**: State management and business logic are abstracted using custom hooks, enhancing readability and reducing code duplication.
  