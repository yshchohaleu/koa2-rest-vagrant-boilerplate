export function getToken (ctx) {
    let header = ctx.request.header.authorization;
    if (!header) {
        return null
    }
    let parts = header.split(' ');
    if (parts.length !== 2) {
        return null
    }
    let scheme = parts[0];
    let token = parts[1];

    if (/^Bearer$/i.test(scheme)) {
        return token;
    }
    return null;
}
