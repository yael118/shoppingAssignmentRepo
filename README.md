# 🛒 Three-Tier Shopping System

A comprehensive shopping system built with three main components:

[📄 View Full Architecture Diagram](HelperFiles/architecture.html) 

- **Client-side:** React + Redux Toolkit  
- **Main API:** .NET 8 (managing categories and products)  
- **Orders API:** Node.js (order management)

---

## 📑 Table of Contents
1. [System Architecture](#-system-architecture)
2. [Prerequisites](#-prerequisites)
3. [Installation and Setup](#-installation-and-setup)
    - [1. Clone the Repository](#-1-clone-the-repository)
    - [2. Create Local Database](#-2-create-local-database-from-sql-file)
    - [3. Update Connection String](#-3-update-connection-string)
    - [4. Create .NET Core 8 Project](#-4-create-a-new-net-core-8-project)
    - [5. Run .NET Core API](#-5-run-the-net-core-api)
    - [6. Start Node.js API](#-6-start-the-nodejs-api)
    - [7. Start React App](#-7-start-the-react-app)
    - [8. Verify Everything is Running](#-8-verify-everything-is-running)

---

## 🏗 System Architecture

- **Frontend (React)**  
  - Technologies: React + Redux Toolkit  
  - Screens: Product list, Order summary  

- **Products API (.NET 8)**  
  - Technologies: .NET 8 + EF Core  
  - Database: SQL Server  
  - Role: Managing categories and products  

- **Orders API (Node.js)**  
  - Technologies: Node.js + Express  
  - Database: MongoDB  
  - Role: Order management and customer data  

---

## ✅ Prerequisites
- [Node.js 18+](https://nodejs.org/)
- [.NET 8 SDK](https://dotnet.microsoft.com/)
- SQL Server or LocalDB
- MongoDB

---

## ⚙ Installation and Setup

### ✅ 1. Clone the Repository
```bash
git clone https://github.com/yael118/shoppingAssignmentRepo.git
```

---

### ✅ 2. Create Local Database from SQL File
- Navigate to the `HelperFiles` folder.
- Open **SQL Server Management Studio (SSMS)**.
- Create a new database (e.g., `SHOPPINGDB`).
- Run the provided SQL script to populate the database.

---

### ✅ 3. Update Connection String
Edit `appsettings.json` in `netGroceryStore`:
```json
"DefaultConnection": "Server=localhost\\<YOUR_INSTANCE>;Database=SHOPPINGDB;Trusted_Connection=true;MultipleActiveResultSets=true;TrustServerCertificate=True"
```

---

### ✅ 4. Create a New .NET Core 8 Project
```bash
dotnet new webapi -n netGroceryStoreApp
```
Replace files with content from `netGroceryStore` and update `appsettings.json`.

Restore and build:
```bash
cd netGroceryStoreApp
dotnet restore
dotnet build
```

---

### ✅ 5. Run the .NET Core API
```bash
dotnet run --urls "https://localhost:7001"
```

---

### ✅ 6. Start the Node.js API
```bash
cd ../nodeGroceryStore
npm install
node server.js
```

---

### ✅ 7. Start the React App
```bash
cd ../react-grocery-store
npm install
npm start
```

---

### ✅ 8. Verify Everything is Running
Open:
```
https://localhost:3000
```
You should see the grocery shopping interface.

---
