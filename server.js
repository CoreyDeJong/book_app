'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

require('ejs');
app.use(express.static('./public/'));

//tells the server(express) to use the ejs template view engine
app.set('view engine', 'ejs')

//putting the ejs file into view on the front end
app.get('/', (req, res) =>{
    res.render('./pages/index.ejs');
})

app.get('/searches/new', (req, res)=>{
    res.render('./pages/searches/show.ejs');
})








app.listen(PORT, () => {
console.log(`listening to ${PORT}`);
})