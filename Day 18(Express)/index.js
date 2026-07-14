import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

let students = [
    {
        id: 1,
        name: "Ali",
        age: 20
    },
    {
        id: 2,
        name: "Ahmed",
        age: 22
    }
];

app.get("/", (req, res) => {
    res.send("Welcome to Student Management API");
}).get("/students", (req, res) => {
    res.json(students);
}).get("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }
    res.json(student);
});

app.post("/students", (req, res) => {

    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({
            message: "Name and Age are required"
        });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        age
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student Added Successfully",
        student: newStudent
    });
});

app.put("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, age } = req.body;

    student.name = name || student.name;
    student.age = age || student.age;

    res.json({
        message: "Student Updated Successfully",
        student
    });

});

app.delete("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.json({
        message: "Student Deleted Successfully",
        deletedStudent
    });

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});