'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

const superagent = require('superagent');

require('ejs');
app.use(express.static('./public/'));


let url = `https://www.googleapis.com/books/v1/volumes?q=+intitle:hatchet`;





superagent.get(url)
    .then(results => {
        let resultsArray = results.body.items[0];
        // const finalArray = resultsArray.map(book => {
            let book = new Newbook(resultsArray.volumeInfo);
        // })
        console.log('superagent results', book);
    })
    .catch(() => {
        console.log('promise error');
    });


//tells the server(express) to use the ejs template view engine
app.set('view engine', 'ejs')

//putting the ejs file into view on the front end
app.get('/', (req, res) => {
    res.render('./pages/index.ejs');
})

app.get('/searches/new', (req, res) => {
    res.render('./pages/searches/show.ejs');
})



// card 3, step 2, need to complete
function Newbook(obj) {
    this.booktitle = obj.title || 'Chuck Norris Says No';
    this.authorname = obj.authors[0] || 'Chuck Norris Says No';
    this.bookdescription = obj.description || 'Chuck Norris Says No';
    this.image = obj.imageLinks.thumbnail || 'https://www.freeiconspng.com/uploads/book-icon--icon-search-engine-6.png';
}




app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
})