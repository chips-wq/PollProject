const router = require('express').Router()
const User = require("./db/models/User");
const Poll = require("./db/models/Poll");
const { INTERNAL_SERVER_ERR } = require('./constants');

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
    poll.owner = req.userId;
    try {
        await poll.save();
        res.status(200).send(poll);
    } catch (e) {
        res.status(INTERNAL_SERVER_ERR).send("Internal Server Error");
    }
});

module.exports = router