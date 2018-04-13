var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models/index.js");

module.exports = function (app) {
    // Scrape and store in MongoDB, create collections
    app.get('/scrape', function (req, res) {
        axios.get("https://bleacherreport.com/").then(function (response) {
            var $ = cheerio.load(response.data);
            // console.log(response.data);

            $("a.articleTitle").each(function (i, element) {
                var result = {};
                result.title = $(this).children("h3").text();
                result.link = $(this).attr("href");
                // console.log(result);
                
                db.Article.create(result)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        console.log("line 21" + dbArticle);
                    })
                    .catch(function (err) {
                        // If an error occurred, send it to the client
                       return res.json(err);
                    });
            });
            res.send("scrape complete");
        });
    });

    // route to get all articles
    app.get("/articles", function (req, res) {
        db.Article.find({})
        .then(function (dbArticle) {
            console.log("line 36" + dbArticle);
                res.json(dbArticle);
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
              });
    });


    app.post("/articles/saved/:id", function (req,res){
        db.Article.findOneAndUpdate({ _id : req.params.id}, {
            saved: true
        }, {new: true}).then(function (save){
            console.log(save);
            res.json(save);
        })
    })

    // delete from saved
    app.post("/articles/deleteSaved/:id", function (req,res){
        db.Article.findOneAndUpdate({ _id : req.params.id}, {
            saved: false
        }, {new: true}).then(function (response){
            console.log(response);
            res.json(response);
        })
    })

    // add note
    app.post("/articles/:id", function(req, res) {
            db.Note.create(req.body)
              .then(function(dbNote) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
              })
              .then(function(dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
              })
              .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
              });
          });

  // Route for saving/updating an Article's associated Note
  app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  

//Couldnt get modal to work to capture the notes but here is the logic for notes
// app.post("/articles/:id", function(req, res) {
//     db.Note.create(req.body)
//       .then(function(dbNote) {
//         return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//       })
//       .then(function(dbArticle) {
//         res.json(dbArticle);
//       })
//       .catch(function(err) {
//         res.json(err);
//       });
//   });


};