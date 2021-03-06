import passport from 'koa-passport'

export function authUser (ctx, next) {
    return passport.authenticate('local', function(err, user, info, status) {
        if (user === false) {
            ctx.status = 401;
            ctx.body = { success: false };
        } else {
            const token = user.generateToken();
            const response = user.toJSON();

            ctx.body = {
                token,
                user: response
            };
        }
    })(ctx, next);
}
