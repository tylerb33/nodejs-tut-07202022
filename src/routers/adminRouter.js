const express = require('express');
const adminRouter = express.Router();
const sessions = require('../data/sessions.json');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb');

adminRouter.route('/').get((req, res)=>{
    debug('up here');
    const url = 'mongodb+srv://dbUser:PASSWORD@globomanticstest.22e3mul.mongodb.net?retryWrites=true&w=majority';
    const client = new MongoClient(url);
    const dbName = 'Globomantics';

    (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to the mongo DB');
    
          const db = client.db(dbName);
    
          const response = await db.collection('sessions').insertMany(sessions);
          res.json(response);
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      })();
    });

module.exports = adminRouter;