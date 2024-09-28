CREATE DATABASE IF NOT EXISTS epayco_challenge;

USE epayco_challenge;

-- Table for wallet owners
CREATE TABLE IF NOT EXISTS `users` (
  `id` BINARY(16) PRIMARY KEY,
  `document` VARCHAR(20) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `phone` VARCHAR(20) NOT NULL,
  `profile_picture` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL
);

-- Table for clients (stores, service providers, etc.)
CREATE TABLE IF NOT EXISTS `clients` (
  `id` BINARY(16) PRIMARY KEY,
  `tax_id` VARCHAR(20) NOT NULL UNIQUE,
  `business_name` VARCHAR(255) NOT NULL,
  `contact_name` VARCHAR(255) NOT NULL,
  `contact_email` VARCHAR(255) NOT NULL,
  `contact_phone` VARCHAR(20) NOT NULL,
  `business_address` VARCHAR(255) NOT NULL,
  `business_type` ENUM('RETAIL', 'SERVICE', 'DIGITAL', 'WHOLESALE') NOT NULL,
  `logo_url` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL
);

-- Wallet table to store the balance of each user
CREATE TABLE IF NOT EXISTS `wallets` (
  `id` BINARY(16) PRIMARY KEY,
  `user_id` BINARY(16) NOT NULL,
  `balance` DECIMAL(18,2) DEFAULT 0.00,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  `FOREIGN` KEY (`user_id`) REFERENCES `users`(id)
);

-- Table for basic transactions (without details)
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` BINARY(16) PRIMARY KEY,
  `wallet_id` BINARY(16) NOT NULL,
  `client_id` BINARY(16) NOT NULL,
  `amount` DECIMAL(18,2) NOT NULL,
  `tax` DECIMAL(18,2) DEFAULT 0.00,
  `tax_base` DECIMAL(18,2) NOT NULL,
  `transaction_type` ENUM('CREDIT', 'DEBIT') NOT NULL,
  `session_id` BINARY(16) NOT NULL,
  `status` ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  FOREIGN KEY (`wallet_id`) REFERENCES `wallets`(id),
  FOREIGN KEY (`client_id`) REFERENCES `clients`(id)
);

-- Separate table for detailed transaction information
CREATE TABLE IF NOT EXISTS `transaction_details` (
  `id` BINARY(16) PRIMARY KEY,
  `transaction_id` BINARY(16) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `currency` VARCHAR(3) DEFAULT 'COP',
  `country` VARCHAR(2) DEFAULT 'CO',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(id)
);

-- Table for session tracking during purchases
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` BINARY(16) PRIMARY KEY,
  `transaction_id` BINARY(16) NOT NULL,
  `token` VARCHAR(6) NOT NULL,
  `status` ENUM('PENDING', 'CONFIRMED', 'FAILED') DEFAULT 'PENDING',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(id)
);

-- Optimize the Database with Indexing
CREATE INDEX idx_user_email ON `users`(email);
CREATE INDEX idx_wallet_user ON `wallets`(user_id);
CREATE INDEX idx_transaction_wallet_client ON `transactions`(wallet_id, client_id);
CREATE INDEX idx_transaction_details ON `transaction_details`(transaction_id);
CREATE INDEX idx_session_transaction ON `sessions`(transaction_id);

-- Ensure that the wallet balance cannot be negative
ALTER TABLE `wallets` ADD CONSTRAINT check_balance_non_negative CHECK (balance >= 0);

-- Ensure that a transaction's tax cannot exceed the transaction amount
ALTER TABLE `transactions` ADD CONSTRAINT check_valid_tax CHECK (tax <= amount);


