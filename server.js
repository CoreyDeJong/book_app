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
})
app.post('/searches', collectFormData);


function collectFormData(request, response) {
    console.log('request.body console log....', request.body);
    let formData = request.body.search;
    console.log('formData console .....', formData);
    let nameOfBookOrAuthor = formData[0];
    let isAuthorOrTitle = formData[1];

    let url = `https://www.googleapis.com/books/v1/volumes?q=`;

    if (isAuthorOrTitle === 'title') {
        url += `+intitle:${nameOfBookOrAuthor}`;
    } else if (isAuthorOrTitle === 'author') {
        url += `+inauthor:${nameOfBookOrAuthor}`;
    }


    const eachItem = [];
    superagent.get(url)
        .then(results => {
            let resultsArray = results.body.items;
            resultsArray.forEach(value => {
                eachItem.push(new Newbook(value.volumeInfo));
            })

            // const finalArray = resultsArray.map(book => {
            // let book = new Newbook(resultsArray.volumeInfo);
            // })


            console.log('superagent results', eachItem);
            response.render('./pages/searches/show.ejs', { Book: eachItem });

        })
        .catch(() => {
            response.render('./pages/searches/error.ejs');
            console.log('promise error');
        });
}


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
}




app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
})