import mongoose from 'mongoose'
import User from '../server/models/User'

export function cleanDb() {
    for (const collection in mongoose.connection.collections) {
        if (mongoose.connection.collections.hasOwnProperty(collection)) {
            mongoose.connection.collections[collection].remove()
        }
    }
}

export function insertUser(callback) {
    const user = new User({
        "name": "John Doe",
        "email": "moorevinson@conferia.com",
        "address": "433 Sullivan Street, Twilight, Maine, 4931",
        "password": "secretpassword"
    });

    user.save(function (err) {
        if (err) {
            callback(err);
        }
        else {
            callback();
        }
    });
}
