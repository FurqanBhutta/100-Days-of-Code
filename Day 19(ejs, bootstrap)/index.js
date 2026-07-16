import express from 'express';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let title = "Blogs";
    let sectionTitle = "EJS";
    let content = "EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript.";
    res.render("index", {title: title, sectionTitle: sectionTitle, content: content});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
