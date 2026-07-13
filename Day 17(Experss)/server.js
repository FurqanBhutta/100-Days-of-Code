import fs from "fs";

const readFile = (fileName) => {
    fs.readFile(fileName, (err, data) => {
        console.log("Error: " + err)
        console.log("Data: " + data.toString());
    })
}

console.log("Writing");

fs.writeFile("furqan.txt", "I am a Developer\n", () => {
    console.log("Done!");
})

console.log("ending");

readFile("furqan.txt");

fs.appendFile("furqan.txt", "I love Bikes\n", (e, d) => {
    console.log(d);
})

readFile("furqan.txt");

