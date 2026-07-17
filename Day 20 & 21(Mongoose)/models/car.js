import mongoose from "mongoose";

const carSchema = mongoose.Schema({
    name: String,
    color: String,
    price: Number
})

export const car = mongoose.model("cars", carSchema);