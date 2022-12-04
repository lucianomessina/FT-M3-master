const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.
const {sumArray} = require('../utils')
const {pluck} = require('../utils')
const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toBe('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('hola');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /product', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('function sumArray', ()=>{
    const arr = [1,2,3,4]
    it('Si encuentra la suma retorna true',()=>{
      expect(sumArray(arr, 5)).toBe(true)
    })
    it('Si no encuentra la suma retorna false',()=>{
      expect(sumArray(arr, 80)).toBe(false)
    })

    it('Si no le paso un array como primer parametro arroja un error',()=>{
      expect(()=> sumArray(1, 80)).toThrow(TypeError)
    })

    it('No deberia sumar dos veces el mismo numero',()=>{
      expect(sumArray(arr, 2)).toBe(false)
    })

  })

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.post('/sumArray').send({array: [2,5,7,10,11,15,20], num: 13}).expect(200));
    it('Debe devolver true si la suma de dos numeros dentro del array es igual a num', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));

      it('Responde con 400 si no le envio los datos correctos', () => agent.post('/sumArray').expect(400));

  });

  describe('POST a/numString',()=>{
    it('responds with 200', () => agent.post('/numString').send({word:'hola' }).expect(200));
    it('responds with 400 if the string is a number', () => agent.post('/numString').send({word: 1 }).expect(400));
    it('responds with 400 if the string is empty', () => agent.post('/numString').send({word: "" }).expect(400));

  it('Si le mando "hola" que devuelva 4',()=>{
    agent.post('/numString')
    .send({word:'hola'})
    .then(res=>{
      expect(res.body.result).toBe(4)
    })
  })
});


describe('function plauk',()=>{
  const array = [{nombre: "fede", apellido: "panella"},{nombre: "luciano", apellido: "messina"}]

it('Retorna un array de solo nombres',()=>{
  expect(pluck(array,'nombre').toEqual(['fede','luciano']))
})

})

})