const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    question: { type: String, require: true },
    answers: { type: [String], require: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    votes: {
        type: [
            {
                voterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                voteIndex: { type: Number, require: true },
            }
        ],
        default: []
    }
});

const Poll = new mongoose.model('Poll', pollSchema);

module.exports = Poll;