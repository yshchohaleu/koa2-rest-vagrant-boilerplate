import app from '../app'
import supertest from 'supertest'
import mongoose from 'mongoose'

const request = supertest.agent(app.listen());

describe('Get user', function () {
    it('should get users', function (done) {
        var id = mongoose.Types.ObjectId();
        request
            .get('/api/users')
            .expect(200, done)
    })
});

