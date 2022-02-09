const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'views')); // informa onde está a pasta de view
app.set('view engine', 'ejs'); // seta qual é o view engine do projeto

app.use(express.static(path.join(__dirname, 'public'))); // informa qual é a pasta de arquivo estatico
app.use(express.urlencoded({extended: true})); // ?

// lê o arquivo e converte para um JS Object
const accountData = fs.readFileSync(path.join(__dirname, 'json/accounts.json'), { encoding: 'utf8'});
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, 'json/users.json'), { encoding: 'utf8'});
const users = JSON.parse(userData);

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

    let accountsJSON = JSON.stringify(accounts);

    // escreve em um arquivo o valor de accountsJSON
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');

    res.render('transfer', { message: 'Transfer Completed'});
});

app.get('/payment', (req, res) => {
    res.render('payment', { account: accounts.credit});
});

app.post('/payment', (req, res) => {
    const amount = parseInt(req.body.amount);

    accounts.credit.balance = accounts.credit.balance - amount;
    accounts.credit.available = accounts.credit.available + amount;

    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');

    res.render('payment', { message: "Payment Successful", account: accounts.credit });
});


app.listen(3000, () => {
    console.log('PS Prject Running on port 3000!');
});