import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors"
import { List } from "./Models/List.js";
import { Item } from "./Models/Item.js"
import { configDotenv } from "dotenv";

const app = express();
configDotenv();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main().catch(err => console.log(err)).then(() => {
    console.log("Database connected successfully!")
});
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

const item1 = new Item({
    name: "Dummy todo"
})
const defaultItems = [item1];

const getItems = async (arr) => {
    try {

    } catch (err) {
        console.log(err)
    }
}

app.get('/lists', async(req,res)=>{
    const lists = await List.find({})
    res.json(lists)
})

app.get("/:customListName", async (req, res) => {
    const cl = req.params.customListName;
    const customListName = `${cl.charAt(0).toUpperCase()}${cl.slice(1).toLowerCase()}`
    try {
        const foundList = await List.findOne({ title: customListName })
        if (!foundList) {
            const myList = new List({
                title: customListName,
                items: defaultItems
            })
            await myList.save();
            res.redirect('/' + customListName);
        } else {
            // console.log(foundList);
            res.json({ title: foundList.title, items: foundList.items })
        }
    } catch (err) {
        console.log(err);
    }
})

app.post("/:customListName", async (req, res) => {
    const item = req.body.item;
    const listName = req.params.customListName;
    console.log(listName);
    const myItem = new Item({
        name: item
    })
    await List.updateOne({ title: listName }, { $push: { items: myItem } });
    res.json({ status: true })
    // res.redirect("/" + listName);
})

app.post("/deleteItem/:listName/:itemId", async (req, res) => {
    const itemId = req.params.itemId;
    const listName = req.params.listName;
    try {
        await List.updateOne({ title: listName }, { $pull: { items: { _id: itemId } } })
        console.log(itemId + " is deleted!");
    } catch (err) {
        console.log(err);
    }
    res.redirect("/" + listName);
})

app.post("/delete/:customListName/", async (req, res) => {
    const listName = req.params.customListName;
    try {
        await List.deleteOne({title: listName});
        console.log(listName + " is deleted!");
    } catch (err) {
        console.log(err);
    }
    res.redirect("/Home");
})



app.listen(process.env.PORT, () => {
    console.log("Port is listening at 3000")
})