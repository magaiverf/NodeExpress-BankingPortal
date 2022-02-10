const express = require('express');
const router = express.Router(); // ??

const { accounts, writeJSON } = require('../data');

router.get('/transfer', (req, res) => {
    res.render('transfer'); 
});

router.post('/transfer', (req, res) => {
    const data = req.body;
    const accountFromType = data.from;
    const accountToType = data.to;

    const amount = parseInt(data.amount); // como recebemos uma string do formulário, precisamos converter para int

    accounts[accountFromType].balance = accounts[accountFromType].balance - amount;
    accounts[accountToType].balance = accounts[accountToType].balance + amount;

    writeJSON();

    res.render('transfer', { message: 'Transfer Completed'});
});

router.get('/payment', (req, res) => {
    res.render('payment', { account: accounts.credit});
});

router.post('/payment', (req, res) => {
    const amount = parseInt(req.body.amount);

    accounts.credit.balance = accounts.credit.balance - amount;
    accounts.credit.available = accounts.credit.available + amount;

    writeJSON();

    res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

module.exports = router;