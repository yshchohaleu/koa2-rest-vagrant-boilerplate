import supertest from 'supertest'
import expect from 'expect'
import should from 'should'

import app from '../server'
import {cleanDb} from './utils'

const request = supertest.agent(app.listen());
const context = {};

describe('Users', () => {
    before((done) => {
        cleanDb();
        done();
    });

    describe('POST /users', () => {
        it('should reject signup when data is incomplete', (done) => {
            request
                .post('/api/users')
                .set('Accept', 'application/json')
                .send({username: 'supercoolname'})
                .expect(422, done)
        });

        it('should sign up', (done) => {
            request
                .post('/api/users')
                .set('Accept', 'application/json')
                .send({name: 'John Doe', email: 'name@mydoamin.com', password: 'secretpassword'})
                .expect(200, (err, res) => {
                    if (err) {
                        return done(err)
                    }

                    res.body.user.should.have.property('email');
                    res.body.user.email.should.equal('name@mydoamin.com');
                    expect(res.body.user.password).toNotExist();

                    context.user = res.body.user;
                    context.token = res.body.token;

                    done()
                })
        })
    });

    describe('GET /users', () => {
        it('should not fetch users if the authorization header is missing', (done) => {
            request
                .get('/api/users')
                .set('Accept', 'application/json')
                .expect(401, done);
        });

        it('should not fetch users if the authorization header is missing the scheme', (done) => {
            request
                .get('/api/users')
                .set({
                    Accept: 'application/json',
                    Authorization: '1'
                })
                .expect(401, done)
        });

        it('should not fetch users if the authorization header has invalid scheme', (done) => {
            const {token} = context;
            request
                .get('/api/users')
                .set({
                    Accept: 'application/json',
                    Authorization: `Unknown ${token}`
                })
                .expect(401, done)
        });

        it('should not fetch users if token is invalid', (done) => {
            request
                .get('/api/users')
                .set({
                    Accept: 'application/json',
                    Authorization: 'Bearer 1'
                })
                .expect(401, done)
        });

        it('should fetch all users', (done) => {
            const {token} = context;
            request
                .get('/api/users')
                .set({
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                })
                .expect(200, (err, res) => {
                    if (err) {
                        done(err);
                        return;
                    }
                    res.body.should.have.property('users');
                    res.body.users.should.have.length(1);
                    done();
                })
        })
    });

    describe('GET /users/:id', () => {
        it('should not fetch user if token is invalid', (done) => {
            request
                .get('/api/users/1')
                .set({
                    Accept: 'application/json',
                    Authorization: 'Bearer 1'
                })
                .expect(401, done);
        });

        it('should throw 404 if user doesn\'t exist', (done) => {
            const {token} = context;
            request
                .get('/api/users/1')
                .set({
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                })
                .expect(404, done)
        });

        it('should fetch user', (done) => {
            const {
                user: {_id},
                token
            } = context;

            request
                .get(`/api/users/${_id}`)
                .set({
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                })
                .expect(200, (err, res) => {
                    if (err) {
                        return done(err)
                    }
                    res.body.should.have.property('user');
                    expect(res.body.user.password).toNotExist();

                    done();
                })
        })
    });

    describe('PUT /users/:id', () => {
        it('should not update user if token is invalid', (done) => {
            request
                .put('/api/users/1')
                .set({
                    Accept: 'application/json',
                    Authorization: 'Invalid token'
                })
                .expect(401, done)
        });

        it('should throw 404 if user doesn\'t exist', (done) => {
            const {token} = context;
            request
                .put('/api/users/1')
                .set({
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                })
                .expect(404, done)
        });

        it('should update user', (done) => {
            const {
                user: {_id},
                token
            } = context;

            request
                .put(`/api/users/${_id}`)
                .set({
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                })
                .send({user: {name: 'updatedcoolname'}})
                .expect(200, (err, res) => {
                    if (err) {
                        return done(err)
                    }

                    res.body.user.should.have.property('name');
                    res.body.user.name.should.equal('updatedcoolname');
                    expect(res.body.user.password).toNotExist();

                    done()
                })
        })
    });

    describe('DELETE /users/:id', () => {
        it('should not delete user if token is invalid', (done) => {
            request
                .delete('/api/users/1')
                .set({
                    Accept: 'application/json',
                    Authorization: 'Bearer 1'
                })
                .expect(401, done);
        });

        it('should throw 404 if user doesn\'t exist', (done) => {
            const {token} = context;
            request
                .delete('/api/users/1')
                .set({
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                })
                .expect(404, done)
        });

        it('should delete user', (done) => {
            const {
                user: {_id},
                token
            } = context;

            request
                .delete(`/api/users/${_id}`)
                .set({
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                })
                .expect(200, done)
        })
    })
});
