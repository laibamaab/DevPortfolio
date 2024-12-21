const express = require('express');
const app = express();
const routes = require('./routes/apiroutes');
const database = require('./db/connection');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

database();
app.get('/', (request, response) =>{
    response.render('home');
});

app.get('/about', (request, response) =>{
    response.render('about');
});
app.get('/education', (request, response) =>{
    response.render('education');
});

app.get('/experience', (request, response) =>{
    response.render('education');
});

app.get('/skills', (request, response) =>{
    response.render('skills');
});

app.get('/resume', (request, response) =>{
    response.render('resume');
});

app.get('/projects', (request, response) =>{
    response.render('projects');
});

app.get('/form', (request, response) =>{
    response.render('Form');
});

app.get('/login', (request, response) =>{
    response.render('Login');
});

app.get('/signup', (request, response) =>{
    response.render('signup');
});

app.get('/forget-password', (request, response) =>{
    response.render('Forgetpassword');
});

app.get('/delete-account', (request, response) =>{
    response.render('delete_account');
});

app.listen(7998, ()=>{
    console.log('http://127.0.0.1:7998');
});