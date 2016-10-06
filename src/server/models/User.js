'use strict';

import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import jwt from 'jsonwebtoken'

import config from '../config'

const SALT_WORK_FACTOR = 10;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    _id: ObjectId,
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate: validate({
            validator: 'isEmail',
            message: 'is not valid'
        })
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
    toJSON: {
        transform: function (doc, ret, options) {
            delete ret.password;
        }
    }
});

userSchema.pre('save', async function preSave(next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        var salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        var hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    }
    catch (err) {
        next(err);
    }
});

userSchema.methods.validatePassword = async function validatePassword (password) {
    const user = this;
    return await bcrypt.compare(password, user.password)
};

userSchema.methods.generateToken = function generateToken () {
    const user = this;
    return jwt.sign({ id: user._id }, config.token)
};

export default mongoose.model('User', userSchema)

