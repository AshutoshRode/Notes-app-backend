mysql -u root -p 

Host: sql12.freesqldatabase.com
Database name: sql12788691
Database user: sql12788691
Port number: 3306

-- Create the database
CREATE DATABASE notesapp;
USE notesapp;

-- Create `user` table
CREATE TABLE `user` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(50),
    `lastName` VARCHAR(50),
    `phone` VARCHAR(20),
    `email` VARCHAR(100) UNIQUE,
    `password` VARCHAR(100),
    `status` INT(1) DEFAULT 0  -- 0: non-verified, 1: active, 2: suspended
);

-- Create `notes` table
CREATE TABLE `notes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(225),
    `contents` VARCHAR(1024),
    `userId` INT,
    FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
