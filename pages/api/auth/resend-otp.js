import { resendOTP } from "@/lib/controllers/authController";
import connectDB from "@/lib/config/db";
import Cors from "cors";
import { json, urlencoded } from "express";
import initMiddleware from "@/lib/middleware/initMiddleware";
import fs from 'fs'


export const getServerSideProps = async () => {
  // ✅ Can use fs here (runs only on the server)
  console.log(fs)

  return {
    props: {}, // will be passed to the page component as props
  }
};

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
  await cors(req, res, () => {});
  await jsonParser(req, res, () => {});
  await urlencodedParser(req, res, () => {});

  await connectDB(); //Ensure the database is connected

  if(req.method === "POST") {
    await resendOTP(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  s;
}
