import connectDB from "@/lib/config/db";
import Cors from "cors";
import { json, urlencoded } from "express";
import initMiddleware from "@/lib/middleware/initMiddleware";
// import { isAuthenticated } from "@/lib/middleware/auth";
import { fetchReview } from "@/lib/controllers/reviewController";

const cors = initMiddleware(
  Cors({
    methods: ["POST", "GET", "HEAD"],
    origin: "*", //Allow all origin
  })
);

const jsonParser = initMiddleware(json());
const urlencodedParser = initMiddleware(urlencoded({ extended: false }));

export default async function handler(req, res) {
  try {
    await cors(req, res, () => {});
    await jsonParser(req, res, () => {});
    await urlencodedParser(req, res, () => {});

    await connectDB();

    if (req.method === "GET") {
      await fetchReview(req, res);
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
