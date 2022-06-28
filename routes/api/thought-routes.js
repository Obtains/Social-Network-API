const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtByID,
    updateThought,
    createThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts);
router.route('/:userId').post(createThought);
router.route('/:id')
.get(getThoughtByID)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;