import supertest from 'supertest'
import expect from 'expect'
import app from '../server'

const request = supertest.agent(app.listen());
const context = {};

describe('Auth', () => {
    describe('POST /auth', () => {
        it('should throw 401 if credentials are incorrect', (done) => {
            request
                .post('/api/auth')
                .send({username: 'wrongusername', password: 'wrongpassword'})
                .set('Accept', 'application/json')
                .expect(401, done)
        });

        it('should auth user', (done) => {
            request
                .post('/api/auth')
                .set('Accept', 'application/json')
                .send({username: 'moorevinson@conferia.com', password: 'asd123!'})
                .expect(200, (err, res) => {
                    if (err) {
                        return done(err)
                    }

                    res.body.user.should.have.property('email');
                    res.body.user.email.should.equal('moorevinson@conferia.com');
                    expect(res.body.user.password).toNotExist();

                    context.user = res.body.user;
                    context.token = res.body.token;

                    done()
                })
        })
    })
});
