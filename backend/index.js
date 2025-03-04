const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3000;
const authRoute = require('./routes/auth');
const journeeRoute = require('./routes/journee');


// connection to database
mongoose.connect('mongodb+srv://anismenaa1999:d4Fr5qz4sUr4YHio@cluster0.7uhselu.mongodb.net/nani_management?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("successfully connected to the database");
    })
    .catch((err) => {
        console.log(`failed to connect to the database: ${err}`);
    })

app.use(cors());
app.use(express.json());
app.use('/auth', authRoute)
app.use('/journee', journeeRoute)


app.listen(port, () => {
    console.log(`this management app is listening on port : ${port}`);
})