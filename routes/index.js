const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = require("bluebird");
// mongoose.connect("mongodb://localhost:27017/comics") - Checking to see if this is needed here;

const comicSchema = new Schema ({
  title: String,
  type: [{
    genre: String,
    publisher: String
  }],
  issue: [Number],
  author: String

});



const comics = mongoose.model('comics', comicSchema);

router.get('/', function(req, res){
  comics.find({}).then(function(allComics){
    // console.log(allComics);
    res.render("index", {allComics: allComics})
  })

})

router.post('/', function(req, res){
  let comic = new comics({
    title: req.body.title,
    issue: req.body.issue,
    author: req.body.author
  });
  comic.type.push({genre: req.body.genre, publisher: req.body.publisher});
  console.log(comic.toObject());
  comic.save().then(function(newComic){
    res.redirect("/")
  });
});

router.post("/:comicId/delete", function(req, res) {
    comics.deleteOne({_id: req.params.comicId}).then(function(comic){
      res.redirect("/");
    })

});

router.get("/:comicId/edit", function(req, res){
  comics.findOne({_id: req.params.comicId}).then(function(allComics){
    res.render("edit", {allComics: allComics})
  })
});

router.post("/edit", function(req, res){
  comics.updateOne({
    _id: req.body.button
    },

    { title: req.body.title,
      issue: req.body.issue,
      author: req.body.author,
      'type.0': {genre: req.body.genre, publisher: req.body.publisher}
    }).then(function(comic){
    res.redirect("/");
  })
});
module.exports = router;