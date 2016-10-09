import usersService from '../../services/usersService'

export async function create (ctx) {
    let user = null;
    let token = null;
    try {
        user = await usersService.save(ctx.request.body);
        token = user.generateToken();
    } catch (err) {
        ctx.throw(422, err.message)
    }
    ctx.body = {
        user: user,
        token: token,
        status: 'success'
    };
}

export async function get (ctx, next) {
    try {
        let users = await usersService.find({});
        ctx.body = {
            users,
            status: 'success'
        };
    }
    catch (err) {   
        if (err === 404 || err.name === 'CastError') {
            ctx.throw(404);
        }
        ctx.throw(500);
    }
}

export async function getById (ctx, next) {
    try {
        let user = await usersService.findById(ctx.params.id);
        if (!user) {
            ctx.throw(404);
        }
        ctx.body = {
            user,
            status: 'success'
        };
    } catch (err) {
        if (err === 404 || err.name === 'CastError') {
            ctx.throw(404);
        }
        ctx.throw(500);
    }

    if (next) { return await next(); }
}

export async function update(ctx) {
    try {
        let id = ctx.params.id;
        let user = await usersService.update(id, ctx.request.body.user);
        ctx.body = {
            user,
            status: 'success'
        };
    }
    catch (err) {
        if (err === 404 || err.name === 'CastError') {
            ctx.throw(404);
        }
        ctx.throw(500);
    }
}


export async function remove (ctx) {
    try {
        await usersService.delete(ctx.params.id);
        ctx.body = { status: 'success' }
    }
    catch (err) {
        if (err === 404 || err.name === 'CastError') {
            ctx.throw(404);
        }
        ctx.throw(500);
    }
}
