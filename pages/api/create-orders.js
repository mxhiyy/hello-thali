import connectDB from '../../lib/config/db';
import Cors from 'cors';
import { json, urlencoded } from 'express';
import initMiddleware from '../../lib/middleware/initMiddleware';
import { isAuthenticated } from '../../lib/middleware/auth';
import { createOrder, getOrders } from '../../lib/controllers/orderController';

const cors = initMiddleware(
    Cors({
        methods: ["POST", "GET"],
        orgin: "*",
    })
);

const jsonParser = initMiddleware(json());
const urlencodedParser = initMiddleware(urlencoded({ extended: false }));

export default async function handler(req, res) {
    try{
        await cors (req, res, () => {});
        await jsonParser(req, res, () => {});
        await urlencodedParser(req, res, () => {});

        await connectDB();

        await new Promise((resolve, reject) => {
            isAuthenticated(req, res, (err) => {
                if (err) return reject(err);
                resolve();
            });
        }); 

        if(req.method === 'POST'){
            await createOrder(req, res);
        } else if(req.method === 'GET'){
            await getOrders(req, res);
        } else{
            res.setHeader("Allow", ["POST", "GET"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }catch(error){
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}