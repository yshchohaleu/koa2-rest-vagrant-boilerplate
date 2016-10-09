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
        done(null, false);
        return;
    }
    try {
        let isMatch = user.validatePassword(password);
        if (!isMatch) {
            return done(null, false);
        }
        else {
            done(null, user);
        }
    } catch (err) {
        done(err, false);
    }
};

passport.serializeUser(serialize);
passport.deserializeUser(deserialize);
passport.use('local', new LocalStrategy(AuthLocalUser));

export default passport;
