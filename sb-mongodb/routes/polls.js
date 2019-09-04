const express = require('express');
const router = express.Router();

const pollsController = require('../controllers/polls');

router.get('', pollsController.getPolls);
router.get('/:_id', pollsController.getPoll);
router.post('', pollsController.createPoll);
router.put('/:_id', pollsController.updatePoll);
router.delete('/:_id', pollsController.deletePoll);

module.exports = router;
