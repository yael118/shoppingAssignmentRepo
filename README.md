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
1. Clone the Project
bashgit clone https://github.com/yael118/shoppingAssignmentRepo.git
cd shopping-system
2. Local Installation
Client (React + Redux)
bashcd client
npm install
npm start
The client will be available at: http://localhost:3000
Products API (.NET 8)
bashcd products-api
dotnet restore
dotnet ef database update
dotnet run
The API will be available at: https://localhost:7001
Orders API (Node.js)
bashcd orders-api
npm install
npm run dev
The API will be available at: https://localhost:3001
