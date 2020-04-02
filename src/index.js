const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const api = require('./api');

const app = new Koa();
const router = new Router();

// setting router and applying api route
router.use('/api', api.routes());

// applying bodyparser
app.use(bodyParser);

// router.get('/', (ctx) => {
//     ctx.body = 'Home';
// });

// router.get('/about/:name?', (ctx) => {
//     const { name } = ctx.params;
//     ctx.body = name ? `About ${name}` : 'About';
// });

// router.get('/posts', (ctx) => {
//     const { id } = ctx.query;
//     ctx.body = id ? `ID #${id} of post` : 'ID isn\'t existed';
// });

// applying route to instance of app
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('listening to port 4000');
});
