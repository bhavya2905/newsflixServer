import cors from "cors";
import express  from "express";
import * as dotenv from "dotenv";
import connectDB from "./monogoDb/connect.js";
import userRoutes from "./routes/UserRouter.js";
import articlesRoutes from "./routes/articlesRouter.js";
import bodyParser from 'body-parser';

import { fetchYoutubeData }  from "./youtube.js"
const PORT =process.env.PORT || 5000;

dotenv.config(); //initializing all env variables (wtevr written in dotenv)

const app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({limit: '50mb'}));



const start_server = async ()=>{
try {
    connectDB(process.env.MONGODB_URL);
    app.use('/api/user', userRoutes);
    app.use('/api/admin',articlesRoutes);
    app.get("/api/youtube/:id", async (req, res) => {
        const {id}= req.params;
        res.status(200);
        const data = await fetchYoutubeData(id);
        res.send(data);
      });
    app.listen( PORT, ()=>{
    console.log('server started')
})

} catch (error) {
    console.log(error);
}
}
start_server();