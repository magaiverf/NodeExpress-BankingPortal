const fs = require('fs');
const path = require('path');
const { accounts, users, writeJSON } = require('./data');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'views')); // informa onde está a pasta de view
app.set('view engine', 'ejs'); // seta qual é o view engine do projeto

app.use(express.static(path.join(__dirname, 'public'))); // informa qual é a pasta de arquivo estatico
app.use(express.urlencoded({extended: true})); // ?

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

// cria uma rota get para o endereço '/'
app.get('/', (req, res) => {
    res.render('index', {title: 'Account Summary', accounts}); // como estamos usando uma engine ele renderiza a pagina Index e passa um objeto para ela.
});

app.get('/profile', (req, res) => {
    res.render('profile', {user: users[0]}); 
});

app.listen(3000, () => {
    console.log('PS Prject Running on port 3000!');
});