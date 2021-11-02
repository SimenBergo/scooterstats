const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");

const mongoose = require('mongoose');

//connecting to database using mongoose connect
mongoose
    .connect('mongodb+srv://overthere:elskerrambo@cluster0.eya5t.mongodb.net/scooter?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message);
    });

const db = mongoose.connection;

const route = require('./route');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/all', route);

db.on('error', console.error.bind(console, 'Mongodb connection error:'));

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err });
});
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(port, () => console.log(`Server is up and running on port ${port}`));