'use strict';
/**
 * This is a 3rd party testing library for servers and DBs.
 */
const supergoose = require('@code-fellows/supergoose');
/** 
 * Requiring in main express server file.
 */
const server = require('../lib/server');
/**
 * Spin up test server via supergoose.
 */
const req = supergoose(server.server);
describe('Test suite for API server with in memory storage', () => {
  describe('Testing /categories routes', () => {
    it('A .post() route should send a 500 server error with invalid input', async () => {
      let obj = {
        foo: "bar",
      };
      let res = await req.post('/categories').send(obj);
      expect(res.status).toEqual(500);
    });
    it('A .post() route should send a 201 status if the input is valid', async () => {
      let obj =   {
        name: "test",
        display_name: "test",
        description: "test"
      };
      let res = await req.post('/categories').send(obj);
      expect(res.status).toEqual(201);
    });
    it('A get() to categories will return the object that as been requested.', async () => {
      let res = await req.get('/categories').send();
      expect(res.body[0].name).toEqual("test");
    });
    it('A .post() is successfully adding an ID to each new record', async() => {
      let obj =   {
        name: "test",
        display_name: "test",
        description: "test"
      };
      let res = await req.post('/categories').send(obj);
      expect(res.body.id).toBeDefined();
    });
  });
  describe('Testing /products routes', () => {
    it('A .post() route should send a 500 server error with invalid input', async () => {
      let obj = {
        foo: "bar",
      };
      let res = await req.post('/products').send(obj);
      expect(res.status).toEqual(500);
    });
    it('A .post() route should send a 201 status if the input is valid', async () => {
      let obj =   {
        name: "test",
        category: "test",
        display_name: "test",
        description: "test"
      };
      let res = await req.post('/products').send(obj);
      expect(res.status).toEqual(201);
    });
    it('A get() to products will return the object that as been requested.', async () => {
      let res = await req.get('/products').send();
      expect(res.body[0].name).toEqual("test");
    });
    it('A .post() is successfully adding an ID to each new record', async() => {
      let obj =   {
        name: "test",
        category: "test",
        display_name: "test",
        description: "test"
      };
      let res = await req.post('/products').send(obj);
      expect(res.body.id).toBeDefined();
    });
  });
});
