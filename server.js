import express from "express";
import photosRoute from "./routes/photos.js";
import tagsRoute from "./routes/tags.js";
import cors from "cors";

const app = express();
const PORT = 8080;
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
    console.log(`Server running on http://localhost:${PORT} 🚀`);
})