import hbs from 'hbs';
import express from "express";
import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express();

// Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

const port = 8080;

// Servir contenido estatico
app.use(express.static('public'))


app.get('/', (req,res) => {
    res.render('home',{
        nombre: 'Isaac',
        titulo: 'Curso de NODE'
    });
});

app.get('/generic', (req,res) => {
    res.render('generic',{
        nombre: 'Isaac',
        titulo: 'Curso de NODE'
    });
});

app.get('/elements', (req,res) => {
    res.render('elements',{
        nombre: 'Isaac',
        titulo: 'Curso de NODE'
    });
});


app.get('*', (req,res) => {
    res.sendFile( __dirname + '/public/404.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});