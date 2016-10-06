import passport from 'koa-passport'
import passportLocal from 'passport-local'
import User from '../models/User'

const LocalStrategy = passportLocal.Strategy;

const serialize = (user, done) => {
    done(null, user._id);
};

const deserialize = async (id, done) => {
    try {
        let user = await User.findById(id);
        done(null, user);
    }
    catch (err) {
        done(err);
    }
    await User.findById(id, done);
};

const AuthLocalUser = async (email, password, done) => {
    let user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false)
    }
    try {
        const isMatch = await user.validatePassword(password);
        if (!isMatch) {
            return done(null, false)
        }
        done(null, user)
    } catch (err) {
        done(err)
    }
};

passport.serializeUser(serialize);
passport.deserializeUser(deserialize);
passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, AuthLocalUser));

export default passport;
