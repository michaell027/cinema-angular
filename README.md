# Cinema App - Setup Guide

Thank you for choosing our Cinema App! Follow these simple steps to get started.

## Prerequisites

- Make sure you have Node.js installed on your machine.
- You'll need MySQL for the database. You can download it from [here](https://dev.mysql.com/downloads/installer/).
- You'll also need the Angular CLI. You can install it by running `npm install -g @angular/cli` in your terminal.

## Step 1: Download Backend

Visit the backend repository at https://github.com/michaell027/cinema_backend and download the backend code.

```bash
git clone https://github.com/michaell027/cinema_backend.git
```

## Step 2: Initialize the Database

Navigate to the downloaded backend folder and locate the initialize_database.sql file. Execute this SQL script in your MySQL database to set up the necessary tables.

## Step 3: Run the Backend

Ensure your MySQL server is running. Then, start the backend server.

```bash
npm install
npm start
```

## Step 4: Run the Angular Project

Once the backend is up and running, open a new terminal window, navigate to the Angular project folder, and run the following commands.

```bash
npm install
ng serve
```

Your Cinema App is now ready to use! Open your browser and visit http://localhost:4200 to explore the application.

Enjoy the movie experience! 🎬
