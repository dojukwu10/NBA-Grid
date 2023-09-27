// app.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const playerRouter = require('./routes/player_routes');

app.use(cors());
mongoose.connect('mongodb+srv://ojukwuderek:ugatp2003@all-nba-players.ppyocuh.mongodb.net/all-nba-players?retryWrites=true&w=majority', { useNewUrlParser: true });

app.use(express.json());
app.use('/player_routes', playerRouter); // Mount the player router under the /api path

app.listen(3000, () => console.log('Server is running on port 3000'));
