// Dependencies
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal)
        .format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// Thought model using Thought Schema
const Thought = model('Thought', thoughtSchema);
// Total count of Reactions
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});
// Export
module.exports = Thought;