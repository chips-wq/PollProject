const express = require('express')
const User = require("./db.js")
const app = express()
const cors = require('cors')

const port = 8080


app.use(cors())

app.get("/", (req, res) => {
    console.log("someone hit this");
    res.send("hello world12\n");
})

app.post("/register", (req, res) => {
    const myUser = new User({ name: "alex", password: "secret" });
    myUser.save();
    res.status(200).send(myUser);
})

app.listen(port, '0.0.0.0', () => {
    console.log(`We are listening on ${port}`);
    console.log("reload")
})