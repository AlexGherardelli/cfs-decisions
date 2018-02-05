var mongoose = require("mongoose");

var decisionSchema = new mongoose.Schema({
    year: Number,
    session: String,
    doc: String, 
    para: String, 
    theme: [String],
    target: [String], 
    decision_text: String
});

decisionSchema.index({"decision_text": "text", "theme": "text" })

module.exports = mongoose.model("Decision", decisionSchema);