const express = require("express");
const app = express();
const cors = require('cors');
var mongoose = require("mongoose");
require('dotenv').config();

const port = 3000;

const dbUrl = process.env.DB_URL


app.use(cors({origin: true, credentials: true}));
app.use(express.json());

const Book = mongoose.model('Book', {
  name: String,
  author: String,
  content: String,
})


app.get("/books", (req, res) => {
  Book.find({}, (err, books) => {
    if(err){
      console.log("get req err ",err);
    }else{ 
      // console.log(books);
      res.send(books);
    }
  })
});

app.post("/book", (req, res) => {
  Book.findOne({_id: req.body._id}, (err, book) => {
    if(err){
      console.log("get req err ",err);
    }else{
      // console.log(book._id.toString());
      res.send(book);
    }
  })
});
 
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true } , (err) => {
  if(err){
    console.log("db connection err:  ", err);
  }else{
    console.log("db connected");
  }
})

app.listen(port, () => {
  console.log(`Listning on port localhost:${port}`);
});
