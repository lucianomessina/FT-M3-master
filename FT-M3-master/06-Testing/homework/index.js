const express = require('express');
const app = express();
const {sumArray} = require('../homework/utils');
const {pluck} = require('../homework/utils')
app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.post('/product', (req, res) => {
  result = req.body.a * req.body.b,
  res.send({
    result
  });
});

app.post('/sum', (req, res) => {
  res.send({
    result: req.body.a + req.body.b,
  });
});

app.post('/sumArray', (req, res) => {
  const {array, num} = req.body
  if(!array || !num){
    return res.sendStatus(400)
  }
  const result = sumArray(array, num)
 res.status(200).send({
   result
  });
});

app.post('/numString', (req, res) => {
  const {word} = req.body
  if(typeof word === num || word.length){
    return res.sendStatus(400)
  }
  const result = word.length
 res.send({
   result
  });
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
