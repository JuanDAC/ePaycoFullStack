# 📋 Virtual Wallet System - Database Model

The design decisions for the virtual wallet system's database. The database structure adheres to best relational design practices, ensuring compliance with the **Third Normal Form (3NF)**, which eliminates redundancies and maintains data integrity.

## 🏢 **General Overview**

The virtual wallet system's database is designed to manage users, clients, wallets, transactions, and verification sessions securely and efficiently. The use of unique binary identifiers (`UUIDs` stored as `BINARY(16)`) ensures efficient management of primary keys and consistent table relationships.

### 🛠️ **Key Design Decisions**

Each design choice aligns with principles of integrity and normalization, ensuring the robustness and scalability of the database structure:

1. **Use of `BINARY(16)` for Primary Keys**:
   - All tables (`users`, `clients`, `wallets`, `transactions`, `transaction_details`, and `sessions`) utilize the `BINARY(16)` format for primary keys.

2. **Separation of Tables to Maintain 3NF**:
   - The database strictly adheres to **Third Normal Form (3NF)** by eliminating transitive dependencies, achieved by separating the `transactions` and `transaction_details` tables.

3. **Use of `ENUM` Data Types for Status and Type Fields**:
   - The `transactions` and `sessions` tables use `ENUM` types for columns such as `transaction_type` and `status`.

4. **Integrity Constraints**:
   - Constraints have been implemented to ensure data accuracy and integrity, including:
     - `check_balance_non_negative` in `wallets` to prevent negative balances.
     - `check_valid_tax` in `transactions` to ensure that the tax value (`tax`) does not exceed the total transaction amount (`amount`).

5. **Use of Foreign Keys to Establish Relationships**:
   - Every dependent table (`transactions`, `wallets`, `transaction_details`, and `sessions`) utilizes foreign keys to maintain referential integrity.

6. **Incorporation of Control Fields (`created_at`, `updated_at`, `deleted_at`)**:
   - All tables include the fields `created_at`, `updated_at`, and `deleted_at` to track the creation, update, and soft deletion of records.

---

## 🗂️ **Table Descriptions**

### 1. **`users` (Wallet Owners)**

- Stores information about the end-users who own wallets in the system.
- **Fields**:
  - `id`: Unique identifier (`BINARY(16)`).
  - `document`, `name`, `email`, `phone`: Basic identification and contact information.
  - `profile_picture`: URL for the user’s profile picture.
  - `created_at`, `updated_at`, `deleted_at`: Timestamp fields for record tracking.

### 2. **`clients` (Stores and Service Providers)**

- Represents companies or service providers that can interact with users' wallets to initiate or receive payments.
- **Fields**:
  - `id`: Unique identifier (`BINARY(16)`).
  - `tax_id`: Tax identification number for the company.
  - `business_name`, `contact_name`, `contact_email`, `contact_phone`: Contact information.
  - `business_address`: Physical address of the business.
  - `business_type`: Type of business (`RETAIL`, `SERVICE`, `DIGITAL`, `WHOLESALE`).
  - `logo_url`: URL for the company’s logo.
  - `created_at`, `updated_at`, `deleted_at`: Timestamp fields for record tracking.

### 3. **`wallets` (Wallets)**

- Manages the balance of each user.
- **Fields**:
  - `id`: Unique identifier (`BINARY(16)`).
  - `user_id`: Foreign key referencing the wallet owner (`BINARY(16)`).
  - `balance`: Wallet balance (`DECIMAL(18,2)`).
  - `created_at`, `updated_at`, `deleted_at`: Timestamp fields for record tracking.

### 4. **`transactions` (Transactions)**

- Logs the financial transactions executed by users.
- **Fields**:
  - `id`: Unique identifier (`BINARY(16)`).
  - `wallet_id`: Foreign key referencing the associated wallet (`BINARY(16)`).
  - `client_id`: Foreign key referencing the associated client (`BINARY(16)`).
  - `amount`, `tax`, `tax_base`: Financial values and tax information.
  - `transaction_type`: Type of transaction (`CREDIT`, `DEBIT`).
  - `session_id`: Verification session ID.
  - `status`: Transaction status (`PENDING`, `COMPLETED`, `FAILED`).
  - `created_at`, `updated_at`, `deleted_at`: Timestamp fields for record tracking.

### 5. **`transaction_details` (Transaction Details)**

- Contains detailed information for each transaction.
- **Fields**:
  - `id`: Unique identifier (`BINARY(16)`).
  - `transaction_id`: Foreign key referencing the transaction (`BINARY(16)`).
  - `name`, `description`: Detailed information about the service or product.
  - `currency`, `country`: Contextual information about the transaction.
  - `created_at`, `updated_at`, `deleted_at`: Timestamp fields for record tracking.

### 6. **`sessions` (Verification Sessions)**

- Manages the confirmation of transactions using security tokens.
- **Fields**:
  - `id`: Unique identifier (`BINARY(16)`).
  - `transaction_id`: Foreign key referencing the transaction (`BINARY(16)`).
  - `token`: 6-digit verification token (`VARCHAR(6)`).
  - `status`: Session status (`PENDING`, `CONFIRMED`, `FAILED`).
  - `created_at`, `updated_at`, `deleted_at`: Timestamp fields for record tracking.

---

## 🗃️ **Optimization and Validation**

1. **Indexes**:
   - Created indexes for frequently queried fields (`email`, `user_id`, `transaction_id`).

2. **Integrity Constraints**:
   - `check_balance_non_negative`: Prevents negative balances in `wallets`.
   - `check_valid_tax`: Ensures that `tax` does not exceed the `amount` value in `transactions`.

