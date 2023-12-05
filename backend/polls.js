const router = require('express').Router()
const User = require("./db/models/User");
const Poll = require("./db/models/Poll");
const { INTERNAL_SERVER_ERR, DUPLICATE_ERR, VALIDATION_ERR, AUTH_ERR } = require('./constants');
const isNumeric = require("./util");

const verifyJwtToken = require("./db/login/util").verifyJwtToken;

router.get("/polls", async (req, res) => {
    try {
        const polls = await Poll.find();
        res.status(200).send(polls);
    } catch (e) {
        res.status(INTERNAL_SERVER_ERR).send("Internal Server Error");
    }
});


router.post("/polls", verifyJwtToken, async (req, res) => {
    const poll = new Poll(req.body);
    poll.ownerId = req.userId;
    try {
        await poll.save();
        res.status(200).send(poll);
    } catch (e) {
        res.status(INTERNAL_SERVER_ERR).send("Internal Server Error");
    }
});

router.delete("/polls", verifyJwtToken, async (req, res) => {
    const poll = await Poll.findById(req.body.pollId).exec();
    if (poll === null) {
        res.status(VALIDATION_ERR).send("Poll not found");
        return;
    }
    if (poll.ownerId.valueOf() !== req.userId) {
        res.status(AUTH_ERR).send("You can't delete this one");
        return;
    }
    const query = { _id: poll._id };
    await Poll.findOneAndDelete(query).exec();
    res.status(200).send("Success");

});

router.patch("/polls/vote/:id", verifyJwtToken, async (req, res) => {
    const poll = await Poll.findById(req.params.id).exec();
    //check if this user has voted
    const voted = poll.votes.filter(vote => {
        return vote.voterId.valueOf() === req.userId
    }
    );
    if (voted.length > 0) {
        res.status(DUPLICATE_ERR).send({ errorCode: DUPLICATE_ERR, errors: ['Ai votat deja!'] });
        return;
    }
    if (!isNumeric(req.body.voteIndex) || req.body.voteIndex >= poll.answers.length) {
        res.status(VALIDATION_ERR).send({ errorCode: VALIDATION_ERR, errors: ['Nu exista acest raspuns !'] });
        return;
    }
    poll.votes.push({ voterId: req.userId, voteIndex: req.body.voteIndex });
    poll.save();
    res.status(200).send(poll);
});

module.exports = router