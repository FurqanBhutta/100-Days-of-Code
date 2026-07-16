import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {car} from "./models/car.js";

const app = express();
const port = 3000
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
const connection = await mongoose.connect("mongodb://localhost:27017/myDB");
let arr = [ {name: "hilux", color: "black"}, {name: "corola", color: "red"}];

app.get("/", async(req,res)=>{
    let myCars = await car.find({});
    // console.log(myCars);
    res.render("index", {cars: myCars})
})

app.post('/', (req,res)=>{
    let name = req.body.name;
    let color = req.body.color;
    let price = parseInt(req.body.price);
    let myCar = new car({name: name, color: color, price: price})
    myCar.save();
    res.redirect('/')
})

app.post('/delete', async(req,res)=>{
    let id = req.body.myID;
    await car.deleteOne({_id: id});
    res.redirect('/');
})

app.listen(port, ()=>{
    console.log(`App is listening at port ${port}`);
})

