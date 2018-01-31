var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    Decision = require("./models/decision"),
    app = express();
    
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})); // config body parser
mongoose.connect("mongodb://localhost/decisions");


app.get("/", function(req, res){
    if(req.query.search){
        var searchString = req.query.search;
        Decision.find({$text: {$search: searchString}}, function(err, filteredDecisions){
        if(err){
            console.log(err)
        } else{
         res.render("result", {decisions: filteredDecisions})
            }
        })
    }else{
        Decision.find({year: 2017}).limit(10).exec(function(err, foundDecisions){
            if(err){
                console.log(err);
            }
            else{
                res.render("index", {decisions: foundDecisions})
            }
    });
    }

});



app.get("*", function(req, res){
    res.redirect("/")
});

app.listen(process.env.PORT, function(){
    console.log("Server started on port " + process.env.PORT);
});