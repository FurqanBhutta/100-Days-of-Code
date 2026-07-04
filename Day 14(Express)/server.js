import express from "express";

const app = express();
const PORT = 3000;

// Home Route
app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

// About Route
app.get("/about", (req, res) => {
    res.send("<h1>About Page</h1><p>Welcome to my Express application.</p>");
});

// Contact Route
app.get("/contact", (req, res) => {
    res.send("<h1>Contact Page</h1>");
});

// Dynamic Route
app.get("/user/:name", (req, res) => {
    const username = req.params.name;

    res.send(`<h1>Welcome ${username} 👋</h1>`);
});

// Query Parameters
app.get("/search", (req, res) => {
    const keyword = req.query.keyword;

    if (!keyword) {
        return res.send("Please provide a keyword.");
    }

    res.send(`Searching for: <strong>${keyword}</strong>`);
});

// 404 Route
app.use((req, res) => {
    res.status(404).send("<h1>404 | Page Not Found</h1>");
});

// Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
