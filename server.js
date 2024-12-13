import express from "express";
import photosRoute from "./routes/photos.js";
import tagsRoute from "./routes/tags.js";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8000;
const BACKEND_URL = process.env.BACKEND_URL;
//middleware 
app.use(cors()); //address cors error
app.use(express.json()); //add body to req

//routes
app.use("/photos", photosRoute);

app.use("/tags", tagsRoute);

app.get("/", (req, res) => {
    res.send("Welcome to taro's server");
})



app.listen(PORT, ()=>{
    console.log(`Server running on ${BACKEND_URL}${PORT} 🚀`);
})