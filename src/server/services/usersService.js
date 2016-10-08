import User from '../models/User'

export default {
    find: async function (filter) {
        return await User.find(filter);
    },
    save: async function (user) {
        await new User(user).save();
    },
    update: async function (user) {
        await User.findByIdAndUpdate(user.id, word);
    },
    delete: async function (id) {
        await User.findByIdAndRemove(id);
    }
}


