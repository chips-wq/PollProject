const express = require('express')
const app = express()

const port = 8080

app.get("/", (req, res) => {
    res.send("hello world12\n");
})

app.listen(port, () => {
    console.log(`We are listening on ${port}`);
})