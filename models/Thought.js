const mongoose = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280,
        min: 1
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dayjs(createdAtVal).format('MM/DD/YYYY hh:mmA')
    }
})

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        max: 280,
        min: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dayjs(createdAtVal).format('MM/DD/YYYY hh:mmA')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
})

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;