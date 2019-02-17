const Clarifai = require('clarifai');

if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

const app = new Clarifai.App({
  apiKey: process.env.API_KEY
 });

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}
 

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    const { counts } = req.body.boxes.length;
    db('users').where('id', '=', id)
    .increment('entries', counts)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}
