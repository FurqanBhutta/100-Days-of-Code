import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    name: String
})

const Item = mongoose.model('Item', ItemSchema);

export {ItemSchema, Item}