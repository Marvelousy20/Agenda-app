const router = require('express').Router() ;

const Agenda = require('../models/agenda.model');
const { findByIdAndDelete } = require('../models/agenda.model');

router.route('/').get((req, res) => {
    Agenda.find()
    .then(response => res.json(response))
    .catch(err => res.json(`Error: ${err}`))
})

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const location = req.body.location ;

    const newAgenda = new Agenda({
        title,
        description, 
        location,
    })

    newAgenda.save()
    .then(() => res.json('Agenda added'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Agenda.findById(req.params.id)
    .then(response => res.json(response))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/:id').delete((req, res) => {
    Agenda.findByIdAndDelete(req.params.id)
    .then(() => res.json('Agenda deleted'))
    .catch((err) => res.status(400).json(`Err ${err}`))
})

module.exports = router ;
