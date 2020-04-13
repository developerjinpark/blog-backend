require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const api = require('./api');

const mongoose = require('mongoose');
const session = require('koa-session');

const {
    PORT: port = 4000,
    MONGO_URI: mongoURI,
    COOKIE_SIGN_KEY: signKey
} = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).then(() => {
    console.log('connected to mongodb');
}).catch((e) => {
    console.error(e);
});

const app = new Koa();
const router = new Router();

// setting router and applying api route
router.use('/api', api.routes());

// applying bodyparser
app.use(bodyParser());

// applying sessiong / key
const sessionConfig = {
    maxAge: 86400000,   // a day
    // signed: true     // default
}

app.use(session(sessionConfig, app));
app.keys = [signKey];
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

app.listen(port, () => {
    console.log('listening to port', port);
});
