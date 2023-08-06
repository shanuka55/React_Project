// // import { config } from "dotenv";
// // // dotenv Configuration
// // config();

// require('dotenv').config();

// import express from "express";
// import db from "mongoose";
// import { json, urlencoded } from "body-parser";
// import cors from "cors";
// // require("dotenv").config()

// // Create the express app
// // const app = require(); // ---> JS Way
// const app = express();

// // Allow CORS for any Origin
// app.use(cors());

// // You can define Specific Origins and Allow CORS only for these Origins.
// // const allowedOrigins = ["http://localhost:3001"];
// // app.use(cors({
// //     origin: (origin, callback) => {
// //         if(allowedOrigins.indexOf(origin) !== -1 || !origin){
// //             callback(null, true);
// //         }else{
// //             callback(new Error("Not Allowed by CORS"));
// //         }
// //     }
// // }));

// app.use(json());

// app.use(urlencoded({ extended: true }));

// // Mount the routes at /resources URL Path
// // ena hama request ekkma default mapping eka set krla e requests tika index.ts ekata forward krnw.
// // index.ts eken balala adala controllers waalata requests forward krnw.
// // app.use("/", routes);

// // backend eken error ekk awoth apita awshya widihata status code eka saha message ekk ywanna puluwn.
// // me method eka use krla.
// app.use((error, req, res) => {
//     res.status(500).json({ message: error.message });
//   });

// // Typescript error eka walakwa ganna agata (!) meka danna ona
// db.connect(process.env.MONGODB_URL)
// // Success method = then
// .then(() => {
//     console.log("Database is Connected");

//     app.listen(process.env.PORT, () => {
//         console.log(`Server started on port ${process.env.PORT}`);
//     });
    
// // Error method = catch
// }).catch(() => {
//     console.log("Error in connecting to database");
// });

//------------------------------------------------------------------------------

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const db = require("mongoose");
// const json = require("body-parser").json();
// const urlencoded = require("body-parser").urlencoded({ extended: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("../routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/",router);

// Connect to the database
db.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database is Connected");

    // Start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log("Error in connecting to database");
  });


  