import logger from 'koa-logger'
import helmet from 'koa-helmet'
import bodyParser from 'koa-bodyparser'

import errorMiddleware from './error'

export default function middleware(app) {
    app.use(logger());
    app.use(helmet());
    app.use(bodyParser());
    app.use(errorMiddleware());
}