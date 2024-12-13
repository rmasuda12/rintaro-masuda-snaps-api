import express from "express";
import fs from "fs";


const route = express.Router();

route.get("/", (req, res)=> {
    try {
        const dataBuffer = fs.readFileSync("./data/tags.json");
        const tags = JSON.parse(dataBuffer);
        res.send(tags);
    } catch (error) {
        res.send("Error: could not retrive tags");
    }
})

export default route;