var express = require("express"),
    mongoose = require("mongoose"),
    app = express();
    
app.set("view engine", "ejs");
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/decisions");


var decisionSchema = new mongoose.Schema({
    year: Number,
    session: String,
    doc: String, 
    para: String, 
    theme: [String],
    target: [String], 
    text: String
});

var Decision = mongoose.model("Decision", decisionSchema);


// var data = {
//     session: "CFS 44",
//     doc: "Final Report",
//     para: "11 d",
//     theme: ["SOFI"],
//     target: ["Governments"],
//     text: "Called on all stakeholders, including governments and the UN system, to accelerate efforts to address the root causes of such devastation and terrible suffering, with famine declared in South Sudan in 2017 and threatening in North-Eastern Nigeria, Somalia, and Yemen"
// }

// Decision.create(data, function(err, newlyCreated){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(newlyCreated)
//     }
// }); 


// Decision.remove({}, function(err) {
//     if (!err) {
//         console.log("Removed all data");
//     }
//     else {
//       console.log(err);
//     }
// });


app.get("/", function(req, res){
    Decision.find({}, function(err, foundDecisions){
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {decisions: foundDecisions})
        }
    })
});

app.get("*", function(req, res){
    res.redirect("/")
});

app.listen(process.env.PORT, function(){
    console.log("Server started on port " + process.env.PORT);
});