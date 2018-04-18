var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
// Require all models
var db = require("./models");
var PORT = process.env.PORT || 3000;
// Initialize Express
var app = express();
// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

require("./routes/api-routes.js")(app);
// require("./routes/html-routes.js")(app);

var databaseUri = "mongodb://localhost/mongoHW"

// Connect to MongoDB
// mongoose.connect("mongodb://localhost/mongoHW");
console.log(process.env.MONGODB_URI)
if(process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseUri);
}

mongoose.connection.on("error", function(err){
  console.log("Mongoose Error: ", err);
});

mongoose.connection.once("open", function(){
  console.log("Mongoose connection successful");
});
// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });

