export function authUser (agent, callback) {
    agent
        .post('api/users')
        .set('Accept', 'application/json')
        .send({ user: { username: 'test', password: 'pass' } })
        .end((err, res) => {
            if (err) { return callback(err) }

            callback(null, {
                user: res.body.user,
                token: res.body.token
            })
        })
}
