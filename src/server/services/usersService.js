import User from '../models/User'

export default {
    find: async function (filter) {
        return await User.find(filter);
    },
    save: async function (user) {
        let saved = await new User(user).save();
        return saved;
    },
    update: async function (user) {
        await User.findByIdAndUpdate(user.id, word);
    },
    delete: async function (id) {
        await User.findByIdAndRemove(id);
    }
}


