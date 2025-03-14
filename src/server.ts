import dotenv from "dotenv";
dotenv.config();


import mongoose from "mongoose";

mongoose
.connect(process.env.MONGO_URL as string, {})
.then((data) => {
    console.log("MongoDB connection succeed");
    const PORT = process.env.PORT ?? 3003;
})
.catch((err) => console.log ("ERROR on collection MongoDB", err))

// CLUSTER => DATABASE => COLLECTION => DOCUMENT

// console.log("PORT:", process.env.PORT);
// console.log("MONGO_URL:", process.env.MONGO_URL);
















//Architectural pattern: MVC, Dependency Injection, MVP

//Design pattern: Middleware, Decotar




// console.log("EXUCUTED!");

// import moment from "moment";

// const currentTime = moment().format("YYYY MM DD");
// console.log(currentTime);

// const person: string = "MArtin";
// const count: number = 100;