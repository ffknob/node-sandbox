const express = require('express');
const router = express.Router();

const pollsController = require('../controllers/polls');

router.get('', pollsController.getPolls);
router.get('/:id', pollsController.getPoll);
router.post('', pollsController.createPoll);
router.put('/:id', pollsController.updatePoll);
router.delete('/:id', pollsController.deletePoll);

module.exports = router;
