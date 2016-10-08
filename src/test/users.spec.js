import app from '../server'
import supertest from 'supertest'
import mongoose from 'mongoose'

const request = supertest.agent(app.listen());

// describe('GET api/users', function () {
//     it('should get users', function (done) {
//         request
//             .get('/api/users')
//             .expect(200, done)
//     })
// });

