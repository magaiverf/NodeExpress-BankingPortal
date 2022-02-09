const fs = require('fs');
const path = require('path');
const { accounts, users, writeJSON } = require('./data');

const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'views')); // informa onde está a pasta de view
app.set('view engine', 'ejs'); // seta qual é o view engine do projeto

app.use(express.static(path.join(__dirname, 'public'))); // informa qual é a pasta de arquivo estatico
app.use(express.urlencoded({extended: true})); // ?

// cria uma rota get para o endereço '/'
app.get('/', (req, res) => {
    res.render('index', {title: 'Account Summary', accounts}); // como estamos usando uma engine ele renderiza a pagina Index e passa um objeto para ela.
});

app.get('/savings', (req, res) => {
    res.render('account', {account: accounts.savings});
});

app.get('/checking', (req, res) => {
    res.render('account', {account: accounts.checking});
});

app.get('/credit', (req, res) => {
    res.render('account', {account: accounts.credit});
});

app.get('/profile', (req, res) => {
    res.render('profile', {user: users[0]}); 
});

app.get('/transfer', (req, res) => {
    res.render('transfer'); 
});

app.post('/transfer', (req, res) => {
    const data = req.body;
    const accountFromType = data.from;
    const accountToType = data.to;

    const amount = parseInt(data.amount); // como recebemos uma string do formulário, precisamos converter para int

    accounts[accountFromType].balance = accounts[accountFromType].balance - amount;
    accounts[accountToType].balance = accounts[accountToType].balance + amount;

    writeJSON();

    res.render('transfer', { message: 'Transfer Completed'});
});

app.get('/payment', (req, res) => {
    res.render('payment', { account: accounts.credit});
});

app.post('/payment', (req, res) => {
    const amount = parseInt(req.body.amount);

    accounts.credit.balance = accounts.credit.balance - amount;
    accounts.credit.available = accounts.credit.available + amount;

    writeJSON();

    res.render('payment', { message: "Payment Successful", account: accounts.credit });
});


app.listen(3000, () => {
    console.log('PS Prject Running on port 3000!');
});