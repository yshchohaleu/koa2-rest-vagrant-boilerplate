import usersService from '../../services/usersService'

export async function create (ctx) {
    try {
        await usersService.save(ctx.request.body);
    } catch (err) {
        ctx.throw(422, err.message)
    }
    ctx.body = { status: 'success' };
}

export async function get (ctx) {
    try {
        let users = await usersService.find({});
        ctx.body = { users }
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
        ctx.body = { user };
    } catch (err) {
        if (err === 404 || err.name === 'CastError') {
            ctx.throw(404);
        }
        ctx.throw(500);
    }

    if (next) { return next() }
}

export async function update(ctx) {
    try {
        await usersService.update(ctx.request.body);
    }
    catch (err) {
        // todo: error handling
    }
}


export async function remove (ctx) {
    try {
        await usersService.delete(ctx.params.id);
    }
    catch (err) {
        // todo: error handling
    }
}
