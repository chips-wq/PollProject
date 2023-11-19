const express = require('express')
require("./db/db.js") //do the database
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const port = 8080

const User = require("./db/models/User")


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
    console.log("someone hit this");
    res.send("hello world12\n");
})

app.post("/register", (req, res) => {
    //TODO: do parsing of this
    const myUser = new User(req.body);
    myUser.save();

    console.log(myUser._id)

    res.status(200).send("test");
})

app.listen(port, '0.0.0.0', () => {
    console.log(`We are listening on ${port}`);
    console.log("reload")
})