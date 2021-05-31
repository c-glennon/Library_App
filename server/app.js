const axios = require('axios');
const express = require('express');
const db = require('./firebase');
require('dotenv').config();

const app = express()
const port = 8000

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const k = process.env.NODE_ENV_GOOGLE_BOOKS_KEY;
console.log(k);
let u = 'https://www.googleapis.com/books/v1/volumes?';
u += 'key=' + k;

app.get('/book', async (req, res) => {
    if(typeof req.query.title !== "undefined"){
        let i = u.indexOf('&q=');
        if ( i > -1){
            u = u.slice(0, i);
            console.log(u);
        }
        u += '&q=' + encodeURIComponent(req.query.title);
        console.log(req.query);
    
        axios.get(u)
              .then((r) => {
                if(r.data.items !== [] && r.data.items !== 'undefined'){
                const a = [];
                if(r.data.items.length > 6){
                for(let i=0; i < 6; i++){
                  if(typeof r.data.items[i] !== 'undefined'){
                    const d = db.collection("tmp").doc().id;
                    if(typeof r.data.items[i].volumeInfo.authors !== 'undefined'){
                      if(typeof r.data.items[i].volumeInfo.title !== 'undefined'){
                        a.push({author: r.data.items[i].volumeInfo.authors[0],
                           title: r.data.items[i].volumeInfo.title, id: d});
                      }
                      else
                        a.push({author: r.data.items[i].volumeInfo.authors[0],
                          title: 'undefined', id: d});
                    }
                    else{
                      if(typeof r.data.items[i].volumeInfo.title !== 'undefined'){
                        a.push({author: 'Not found',
                          title: r.data.items[i].volumeInfo.title, id: d})
                      }
                    }
                  }
                } 
              }
              else {
                r.data.items.forEach(e => {
                    const d = db.collection("tmp").doc().id;
                    if(typeof e.volumeInfo.authors !== 'undefined'){
                      if(typeof e.volumeInfo.title !== 'undefined'){
                        a.push({author: e.volumeInfo.authors[0],
                           title: e.volumeInfo.title, id: d});
                      }
                      else
                        a.push({author: e.volumeInfo.authors[0],
                          title: 'undefined', id: d});
                    }
                    else{
                      if(typeof e.volumeInfo.title !== 'undefined'){
                        a.push({author: 'Not found',
                          title: e.volumeInfo.title, id: d})
                      }
                    }
                });
              }
                res.send(a);
                }
                else 
                    res.send([]);
            })
    }
    else
        res.send("must include book title")
})

app.get('/library', async (req, res) => {
  const citiesRef = db.collection('books');
  const snapshot = await citiesRef.get();
  const a = [];
  snapshot.forEach(doc => {
    a.push(doc.data());
});
  //console.log(a);
  res.send(a);
})

app.post('/library', async (req, res) => {
  //console.log(req.body)

  const r = await db.collection('books').doc(req.body.id).set({
    author: req.body.author,
    title: req.body.title,
    id: req.body.id,
  });;
  console.log('Added document with ID' + r.id);
  res.send("posted"); 
})

app.delete('/library', async (req, res) => {
  console.log(req.body.id);
  r = await db.collection('books').doc(req.body.id).delete();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})