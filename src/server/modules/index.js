import glob from 'glob'
import Router from 'koa-router'

exports = module.exports = function initModules (app) {
    let instance = new Router({ prefix: '/api' });

    glob(`${__dirname}/*`, { ignore: '**/index.js' }, (err, matches) => {
        if (err) { throw err }

        matches.forEach((mod) => {
             const router = require(`${mod}/router`);
             const routes = router.default;
             const baseUrl = router.baseUrl;

             routes.forEach((config) => {
                 const {
                     method = '',
                     route = '',
                     handlers = []
                 } = config;

                 const lastHandler = handlers.pop();
                 let currentRouter = require('koa-router')();

                 currentRouter[method.toLowerCase()](`${baseUrl}${route}`,
                     ...handlers,
                     async function(ctx) {
                         return await lastHandler(ctx);
                     }
                 );

                 instance.use(currentRouter.routes());
             })
         })
    });

    app
        .use(instance.routes())
        .use(instance.allowedMethods());
};
