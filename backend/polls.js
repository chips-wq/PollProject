const router = require('express').Router()
const User = require("./db/models/User");
const Poll = require("./db/models/Poll");
const { INTERNAL_SERVER_ERR, DUPLICATE_ERR, VALIDATION_ERR } = require('./constants');
const isNumeric = require("./util");

const verifyJwtToken = require("./db/login/util").verifyJwtToken;

router.get("/", async (req, res) => {
    try {
        const polls = await Poll.find();
        res.status(200).send(polls);
    } catch (e) {
        res.status(INTERNAL_SERVER_ERR).send("Internal Server Error");
    }
});


router.post("/", verifyJwtToken, async (req, res) => {
    // const owner = await User.findById(req.userId);
    const poll = new Poll(req.body);
    poll.ownerId = req.userId;
    try {
        await poll.save();
        res.status(200).send(poll);
    } catch (e) {
        res.status(INTERNAL_SERVER_ERR).send("Internal Server Error");
    }
});

router.post("/vote", verifyJwtToken, async (req, res) => {
    const poll = await Poll.findById(req.body.pollId).exec();
    //check if this user has voted
    const voted = poll.votes.filter(vote => {
        return vote.voterId.valueOf() === req.userId
    }
    );
    // if (voted.length > 0) {
    //     res.status(DUPLICATE_ERR).send({ errorCode: DUPLICATE_ERR, errors: ['Ai votat deja!'] });
    //     return;
    // }
    console.log(typeof req.body.voteIndex);
    if (!isNumeric(req.body.voteIndex) || req.body.voteIndex >= poll.answers.length) {
        res.status(VALIDATION_ERR).send({ errorCode: VALIDATION_ERR, errors: ['Nu exista acest raspuns !'] });
        return;
    }
    poll.votes.push({ voterId: req.userId, voteIndex: req.body.voteIndex });
    poll.save();
    res.status(200).send(poll);
});

module.exports = router