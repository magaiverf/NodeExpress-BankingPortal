const fs = require('fs');
const path = require('path');

// lê o arquivo e converte para um JS Object
const accountData = fs.readFileSync(path.join(__dirname, 'json/accounts.json'), { encoding: 'utf8'});
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, 'json/users.json'), { encoding: 'utf8'});
const users = JSON.parse(userData);

const writeJSON = () => {
    let accountsJSON = JSON.stringify(accounts);

    // escreve em um arquivo o valor de accountsJSON
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
};

module.exports = {
    accounts,
    users,
    writeJSON
};