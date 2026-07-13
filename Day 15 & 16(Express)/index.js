import express from "express";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = 3000;

// Global Middleware
app.use((req, res, next) => {
    console.log(`${req.method} request received at ${req.url}`);
    next();
});

// Built-in Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("🏠 Welcome to Express Middleware & Router Demo");
});

// Mount Router
app.use("/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});