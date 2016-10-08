import Koa from 'koa';

import convert from 'koa-convert'
import serve from 'koa-static'
import session from "koa-session2"

import middleware from './middleware'
import passport from './auth/passport'
import config from './config'
import mongoose from 'mongoose'

const app = new Koa();
app.keys = config.session;

// deprecated promise fix
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.use(session());
middleware(app);

app.use(passport.initialize());
app.use(passport.session());

const modules = require('./modules');
modules(app);

app.use(convert(serve(__dirname + '/public')));
app.use(ctx => ctx.status = 404);

app.listen(config.port, () => {
    console.log(`Server started on ${config.port}`)
});

export default app;