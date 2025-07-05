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
