import { sendOTP } from "@/lib/controllers/authController";
import connectDB from "@/lib/config/db";
import Cors from "cors";
import { json, urlencoded } from "express";
import initMiddleware from "@/lib/middleware/initMiddleware";

//Intiliaze the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["POST", "GET", "HEAD"],
    origin: "*", //Allow all origin
  })
);

//Intialize the JSON and URL conded middlware
const jsonParser = initMiddleware(json());
const urlencodedParser = initMiddleware(urlencoded({ extended: false }));


export default async function handler(req, res) {
  //run the middlware
  try{
    await cors(req, res, () => {});
    await jsonParser(req, res, () => {});
    await urlencodedParser(req, res, () => {});

    await connectDB(); //Ensure the database is connected
  
    if (req.method === "POST") {
      await sendOTP(req, res);
    } 

    else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch(error){
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal Server Error"})
  }
}
