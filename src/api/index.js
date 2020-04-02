const Router = require('koa-router');

const api = new Router();

api.get('/test', (ctx) => {
    ctx.body = 'Test was succeed';
});

module.exports = api;