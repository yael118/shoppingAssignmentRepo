# Three-Tier Shopping System
#A comprehensive shopping system built with three main components:

##Client-side with React + Redux Toolkit
##Main API with .NET 8 for managing categories and products
##Orders API with Node.js for order management

###System Architecture
####Component 1: Client Side

Technologies: React + Redux Toolkit
Screens: First screen (product list) + Second screen (order summary)

####Component 2: Products API (.NET 8)

Technology: .NET 8
Database: SQL Server + Entity Framework
Role: Managing categories and products

####Component 3: Orders API (Node.js)

Technologies: Node.js Express
Database: MongoDB
Role: Order management and customer data storage

###System Requirements

Node.js 18+
.NET 8 SDK
SQL Server or LocalDB
MongoDB 

###Installation and Setup

# Grocery Store Multi-Project Setup Guide

This repository contains three main components:
- **.NET Core 8 API** (`netGroceryStore`)
- **Node.js API** (`nodeGroceryStore`)
- **React Frontend** (`react-grocery-store`)

Follow the steps below to set up and run the entire solution.

---

## ✅ 1. Clone the Repository
Clone the main repository to your local machine:
```bash
git clone https://github.com/yael118/shoppingAssignmentRepo.git
```

---

## ✅ 2. Create Local Database from SQL File
Navigate to the `HelperFiles` folder and locate the SQL script provided.  
Use **SQL Server Management Studio (SSMS)** to create the database:

- Open SSMS and connect to your local SQL Server instance.
- Create a new database (e.g., `SHOPPINGDB`).
- Run the SQL script from the `HelperFiles` folder to populate the database.

---

## ✅ 3. Update Connection String
Open the `appsettings.json` file inside the `netGroceryStore` folder and update the `DefaultConnection` string with your local SQL Server details:
```json
"DefaultConnection": "Server=localhost\\<YOUR_INSTANCE>;Database=SHOPPINGDB;Trusted_Connection=true;MultipleActiveResultSets=true;TrustServerCertificate=True"
```

---

## ✅ 4. Create a New .NET Core 8 Project
Create a new empty **.NET Core 8 Web API project**:
```bash
dotnet new webapi -n netGroceryStoreApp
```

Replace the generated files with the content from the `netGroceryStore` folder in this repository.  
Make sure `appsettings.json` is updated as described in the previous step.

Restore and build the project:
```bash
cd netGroceryStoreApp
dotnet restore
dotnet build
```

---

## ✅ 5. Run the .NET Core API
Run the project in **HTTPS mode** on **port 7001**:
```bash
dotnet run --urls "https://localhost:7001"
```

---

## ✅ 6. Start the Node.js API
Navigate to the `nodeGroceryStore` folder:
```bash
cd ../nodeGroceryStore
```

Install dependencies:
```bash
npm install
```

Start the server:
```bash
node server.js
```

The API should run on **port 3001**.

---

## ✅ 7. Start the React App
Navigate to the React project:
```bash
cd ../react-grocery-store
```

Install dependencies:
```bash
npm install
```

Start the app:
```bash
npm start
```

The React app should run on **port 3000**.

---

## ✅ 8. Verify Everything is Running
Open your browser and navigate to:
```
https://localhost:3000
```

You should see the grocery shopping interface.

---

