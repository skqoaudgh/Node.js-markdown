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
    const resultDoc = md.render(req.body.inputTextarea);
    const resultHTML = resultDoc.trim();
    res.render('output.ejs', {outputDoc: resultDoc, outputHTML: formatXml(resultHTML)});
});

app.listen(3000, () => {
    console.log('express server is opened on port 3000.');
});

function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(/(\r\n|\n|\r)/gm, "");
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    let strs = xml.split('\r\n');
    strs.forEach(node => {
        var indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ )) {
            indent = 0;
        } else if (node.match( /^<\/\w/ )) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '    ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });
    return formatted;
}