import User from '../models/User'

export default {
    find: async function (filter) {
        return await User.find(filter);
    },
    findById: async function (id) {
        return await User.findById(id);
    },
    save: async function (user) {
        const saved = await new User(user).save();
        return saved;
    },
    update: async function (id, user) {
        const updated = await User.findByIdAndUpdate(id, user, {new: true});
        return updated;
    },
    delete: async function (id) {
        const deleted = await User.findByIdAndRemove(id);
    }
}


