const express = require('express');
const hljs = require('highlight.js');
var md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
            return hljs.highlight(lang, str).value;
            } catch (__) {}
        }
        return '';
    }
})
.enable('fence');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/', (req, res, next) => {
    res.render('index.ejs');
});

app.post('/output', (req, res, next) => {
    const result = md.render(req.body.inputTextarea);
    res.render('output.ejs', {output: result});
});

app.listen(3000, () => {
    console.log('express server is opened on port 3000.');
});