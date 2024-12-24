const express = require('express');
const app = express();
const routes = require('./routes/apiroutes');
const database = require('./db/connection');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

database();

app.get('/user-form', (request, response) =>{
    response.render('Form');
});

app.get('/portfolio-form', (request, response) =>{
    response.render('updateForm');
});

app.get('/user-login', (request, response) =>{
    response.render('Login');
});

app.get('/user-signup', (request, response) =>{
    response.render('signup');
});

app.get('/user-forget-password', (request, response) =>{
    response.render('Forgetpassword');
});

app.get('/user-delete-account', (request, response) =>{
    response.render('delete_account');
});

app.get('/delete-account', (request, response) =>{
    response.render('delete_form');
});

app.use((req, res) => {
    res.status(404).send('Page not found');
  });
app.listen(7998, ()=>{
    console.log('http://127.0.0.1:7998');
});