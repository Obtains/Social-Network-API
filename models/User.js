// Dependencies
const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/]
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// User model with User Schema
const User = model('User', userSchema);
// Total Counnt of Friends
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Export
module.exports = User;