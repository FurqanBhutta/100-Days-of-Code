import express from "express";
import mongoose, { Schema } from "mongoose";
import { configDotenv } from "dotenv";

const app = express();
configDotenv();

app.listen(process.env.PORT, ()=>{
    console.log("Port is listening at 3000")
})

main().catch(err => console.log(err)).then(()=>{
    console.log("Database connected successfully!")
});
async function main(){
    await mongoose.connect(process.env.MONGO_URL);
}

const itemSchema = new Schema({
    name : String
})

const Item = mongoose.model("todo", itemSchema);

app.post("/", (req,res)=>{
    
})

app.get("/", (req,res)=>{
    res.send("Hello World!");
})

