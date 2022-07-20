const express = require('express');
const sessionRouter = express.Router();
const sessions = require('../data/sessions.json');
const debug = require('debug')('app');

sessionRouter.route('/').get((req, res)=>{
    debug('in sessions!')
    res.render('sessions', {
        sessions
    });
});

sessionRouter.route('/:id').get((req, res) => {
    const id = req.params.id;
    res.render('session', {
        session: sessions[id]
    });
});

module.exports = sessionRouter;