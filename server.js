const express = require('express');
const markdown = require('markdown').markdown;

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res, next) => {
    res.render('index.ejs');
});

app.post('/output', (req, res, next) => {
    const html_content = markdown.toHTML(req.body.inputTextarea);
    res.send(html_content);
});

app.listen(3000, () => {
    console.log('express server is opened on port 3000.');
});