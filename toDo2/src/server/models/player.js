const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({

        name: 
        {
                type : String
        },
        
        teams: 
        { 
                type: []
        },

        years: 
        { 
                type: []
        },
      
});

module.exports = mongoose.model('version1', playerSchema);


