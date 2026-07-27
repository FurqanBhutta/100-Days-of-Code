import mongoose from "mongoose";
import {ItemSchema} from "./Item.js";

const ListSchema = new mongoose.Schema({
    title: String,
    items: [ItemSchema]
})

export const List = mongoose.model('List',ListSchema);