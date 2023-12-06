const express = require('express')
require("./db/db.js") // initializa the database
require('dotenv').config() // get environment variables
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const app = express()
const cors = require('cors')

const port = 8080

const User = require("./db/models/User")

const pollRouter = require("./polls.js");


const errorCodes = require("./constants.js");
const { verifyJwtToken } = require('./db/login/util.js');

app.use(cors({ credentials: true, origin: ["http://127.0.0.1:5173", "http://localhost:5173"] }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser());
app.use("/", pollRouter);

app.get("/", (req, res) => {
    console.log("someone hit this");
    res.send("hello world12\n");
})


app.post("/login", async (req, res) => {
    const usr = await User.findOne({ email: req.body.email });
    if (usr !== null) {
        // TODO: encrypt passwords and test hashes please
        if (usr.password === req.body.password) {
            const token = jwt.sign({ _id: usr._id, }, process.env.SECRET_JWT)
            res.cookie('token', token, {
                httpOnly: true,
                // secure = only send cookie over https
                secure: true,
                maxAge: 7200000,
                // sameSite = only send cookie if the request is coming from the same origin
                sameSite: "none", // "strict" | "lax" | "none" (secure must be true)
            });
            res.status(200).send(usr);
            return;
        }
    }
    res.status(errorCodes.AUTH_ERR).send({ errorCode: errorCodes.AUTH_ERR, errors: ['Email-ul sau parola nu sunt corecte'] });
    return;
})

app.post("/register", async (req, res) => {
    // TODO: do parsing of this
    const myUser = new User(req.body);
    console.log("hi")
    if (req.body.password !== req.body.confirmPassword) {
        res.status(errorCodes.AUTH_ERR).send({ errorCode: errorCodes.AUTH_ERR, errors: ['Parolele difera'] });
        return;
    }
    try {
        const usr = await myUser.save();
        const token = jwt.sign({ _id: usr._id, }, process.env.SECRET_JWT)
        res.cookie('token', token, {
            httpOnly: true,
            // secure = only send cookie over https
            maxAge: 7200000,
            secure: true,
            // sameSite = only send cookie if the request is coming from the same origin
            sameSite: "none", // "strict" | "lax" | "none" (secure must be true)
        });
        res.status(200).send(usr);
    } catch (e) {
        if (e.code === 11000) { // mongodb 11000 is duplicate key error
            res.status(errorCodes.DUPLICATE_ERR).send({ errorCode: errorCodes.DUPLICATE_ERR, errors: ["Acest email a fost folosit deja!"] });
        }
        if (e.name === 'ValidationError') {
            const errors = Object.values(e.errors).map(err => err.properties.message);
            res.status(errorCodes.VALIDATION_ERR).send({ errorCode: errorCodes.VALIDATION_ERR, errors: errors });
        }
    }
})

app.post('/get-user', verifyJwtToken, async (req, res) => {
    const user = await User.findById(req.userId).exec();
    res.status(200).send(user);
});

app.post('/logout', (req, res) => {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true, secure: true, sameSite: 'none' });
    res.status(200).send({ message: "Succesfully logged out" });
})


app.listen(port, '0.0.0.0', () => {
    console.log(`We are listening on ${port}`);
})