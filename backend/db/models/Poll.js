const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    question: { type: String, require: true },
    answers: { type: [String], require: true },
    _ownerId: { type: Schema.Types.ObjectId, require: true },
    _votersIds: [Schema.Types.ObjectId]
});

const Poll = new mongoose.model('Poll', pollSchema);

module.exports = Poll;