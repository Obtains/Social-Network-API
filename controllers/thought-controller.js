const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    getThoughtById(req, res) {
        Thought.findOne({})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thoughts Found!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, 
            body, 
            { new: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thoughts Found!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true });
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thoughts Found!'});
                    return;
                }
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete(
            { _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thoughts Found!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thoughts Found!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thoughts Found!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;