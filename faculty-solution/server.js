   
   /********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: __Simarpreet singh____________________ Student ID: ____100469238__________ Date: ____10/18/2024__________
*
* Published URL: ___________________________________________________________
*
********************************************************************************/
require('pg');
const Sequelize = require('sequelize');
const express = require('express');
const legoData = require('./modules/legoSets');
const path = require('path');
const app = express();

const HTTP_PORT = process.env.PORT || 8088;

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.get('/lego/sets', async (req, res) => {
    try {
        const theme = req.query.theme;
        let sets;
        
        if (theme) {
            sets = await legoData.getSetsByTheme(theme);
        } else {
            sets = await legoData.getAllSets();
        }
        
        res.send(sets);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

app.get('/lego/sets/:set_num', async (req, res) => {
    try {
        const setNum = req.params.set_num;
        let set = await legoData.getSetByNum(setNum);

        res.send(set);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});

legoData.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`Server listening on: ${HTTP_PORT}`);
    });
}).catch(err => {
    console.error(`Failed to initialize legoData: ${err}`);
});
