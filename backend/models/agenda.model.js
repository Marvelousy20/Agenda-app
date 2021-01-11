const mongoose = require('mongoose') ;

const Schema = mongoose.Schema;

const AgendaSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    }
}, {
    timestamps: true,
})

const Agenda = mongoose.model('Agenda', AgendaSchema) 

module.exports = Agenda ;