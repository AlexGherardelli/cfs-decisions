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
         res.render("index", {decisions: filteredDecisions})
            }
        })
    }else{
        Decision.find({}, function(err, foundDecisions){
            if(err){
                console.log(err);
            }
            else{
                res.render("index", {decisions: foundDecisions})
            }
    });
    }

});

// app.post("/", function(req, res){
//     var searchString = req.body.search;
//     console.log("Search string: ", searchString);
// });

// app.get("/search", function(req, res){
//     Decision.find({$text: {$search: searchString}}, function(err, foundDecisions){
//         if(err){
//             console.log(err)
//         } else{
//             res.render("hello", {decisions: foundDecisions})
//         }
//     })

// })

app.get("*", function(req, res){
    res.redirect("/")
});

app.listen(process.env.PORT, function(){
    console.log("Server started on port " + process.env.PORT);
});