const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate('thoughts')
            .populate('friends')
            .then(users => res.json(users))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getUser({ params }, res) {
        User.findOne({ _id: params.userId })
            .populate('thoughts')
            .populate('friends')
            .then(userData => {
                !userData
                    ? res.status(404).json({ message: 'No user found with this id' })
                    : res.json(userData);
            })
        .catch(err => res.json(err));
    },

    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.json(err))
    },

    updateUser({ params, body }, res) {
        User.findByIdAndUpdate({ _id: params.userId }, { $set: body }, { new: true, runValidators: true })
            .then(userData => {
                !userData
                    ? res.status(404).json({ message: 'No user found with this id' })
                    : res.json(userData);
            })
            .catch(err => res.json(err))
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(deletedUser => {
                if (!deletedUser) {
                    return res.status(404).json({ message: 'No user found with this id' });
                }
                res.json(deletedUser);
            })
            .catch(err => res.status(400).json(err));
    },

    addFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true }
        )
            .then(userData => {
                !userData
                    ? res.status(404).json({ message: 'Failed to Add Friend: No user found with this id' })
                    : res.json(userData);
            })
            .catch(err => res.json(err));
    },

    deleteFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(userData => {
                !userData
                    ? res.status(404).json({ message: 'Failed to Add Friend: No user found with this id' })
                    : res.json(userData);
            })
            .catch(err => res.json(err));
    }
}

module.exports = userController;