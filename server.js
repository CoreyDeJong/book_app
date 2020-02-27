'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.static('./public/'));
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;
const pg = require('pg');
const superagent = require('superagent');
require('ejs');
const client = new pg.Client(process.env.DATABASE_URL);

//tells the server(express) to use the ejs template view engine


//putting the ejs file into view on the front end
app.get('/', (req, res) => {
    res.render('./pages/index.ejs');
});
// app.get('/books/:book_id', displayOneBook);
app.post('/searches', collectFormData);

const eachItem = [];
function collectFormData(request, response) {
    let formData = request.body.search;
    let nameOfBookOrAuthor = formData[0];
    let isAuthorOrTitle = formData[1];
    let url = `https://www.googleapis.com/books/v1/volumes?q=`;

    if (isAuthorOrTitle === 'title') {
        url += `+intitle:${nameOfBookOrAuthor}`;
    } else if (isAuthorOrTitle === 'author') {
        url += `+inauthor:${nameOfBookOrAuthor}`;
    }
    // let eachItem = [];//FEB26... have a promise error; trying to fix it. Books are showing up thru constructor function, but not afterwards
    superagent.get(url)
        .then(results => {
            let resultsArray = results.body.items;
            resultsArray.forEach(value => {
                // eachItem.push(new Newbook(value.volumeInfo));//FEB26... have a promise error; trying to fix it. Books are showing up thru constructor function, but not afterwards
                new Newbook(value.volumeInfo);
            });
            console.log("123456789", eachItem);
            response.render('./pages/searches/show.ejs', { Book: eachItem });
        })
        .catch((err) => {
            response.render('./pages/searches/error.ejs')
            console.log('promise error:', err);
        })
}

// function displayOneBook(req, res) {
//     let id = req.params.book_id;//ejs file, that links to the params url, needs: something like this: <li class="book-detail"><a href='/books/<% book.id %>'>more details</a></li>
//     let sql = 'SELECT * FROM books WHERE id=$1;';
//     let safeValues = [id];

//     client.query(sql, safeValues)
//     .then(results => {
//         // response.render()
//     })

//     }

// app.get('/searches/new', (req, res) => {
//     res.render('./pages/searches/show.ejs');
// })



// card 3, step 2, need to complete
function Newbook(obj) {
    // console.log("constructor obj.....", obj);
    this.booktitle = obj.title || 'Chuck Norris Says No';
    this.authorname = obj.authors[0] || 'Chuck Norris Says No';
    this.bookdescription = obj.description || 'Chuck Norris Says No';
    this.image = obj.imageLinks.thumbnail || 'https://www.freeiconspng.com/uploads/book-icon--icon-search-engine-6.png';
    console.log('*&*&*&*&', this);
    // eachItem.push(this);////FEB26... have a promise error; trying to fix it. Books are showing up thru constructor function, but not afterwards
}




app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
})