import express from "express";

const router = express.Router();

// Router Middleware
router.use((req, res, next) => {
    console.log("Users Route Middleware Executed");
    next();
});

// GET All Users
router.get("/", (req, res) => {
    res.json({
        message: "List of Users",
        users: ["Ali", "Ahmed", "Sara", "Fatima"]
    });
});

// GET User by ID
router.get("/:id", (req, res) => {
    res.json({
        message: `User ID: ${req.params.id}`
    });
});

// POST User
router.post("/", (req, res) => {
    const user = req.body;

    res.status(201).json({
        message: "User Created Successfully",
        user
    });
});

export default router;