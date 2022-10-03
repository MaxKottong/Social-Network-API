const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(v)
            },
            message: e => `${e.value} is not a valid email address`
        }
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'thought'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
})

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = mongoose.model('user', userSchema);

module.exports = User;