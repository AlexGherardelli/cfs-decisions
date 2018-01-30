var mongoose = require("mongoose");

var decisionSchema = new mongoose.Schema({
    year: Number,
    session: String,
    doc: String, 
    para: String, 
    theme: [String],
    target: [String], 
    text: String
});

decisionSchema.index({"text": "text", "theme": "text" })

module.exports = mongoose.model("Decision", decisionSchema);