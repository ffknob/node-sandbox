const Poll = require('../models/poll');

exports.getPolls = (req, res, next) => {
	Poll
	.findAll()
	.then(polls => {
		res.status(200).json(polls);
	})
	.catch(err => { throw err; });
};

exports.getPoll = (req, res, next) => {
	const _id = req.params._id;

	Poll
	.findById(_id)
	.then(poll => {
		res.status(200).json(poll);
	})
	.catch(err => { throw err; });

};

exports.createPoll = (req, res, next) => {
	const title = req.body.title;
	const question = req.body.question;
	const options = req.body.options;

	const poll = new Poll(null, title, question, options);
	
	poll
	.save()
	.then(result => {
		res.status(200).send(`Object created with id ${result.insertedId}`);
		//res.redirect('/polls');
	})
	.catch(err => { throw err; });
};


exports.updatePoll = (req, res, next) => {
	const _id = req.params._id;
	const title = req.body.title;
	const question = req.body.question;
	const options = req.body.options;

	const poll = new Poll(_id, title, question, options);
	
	poll
	.save()
	.then(result => {
		res.status(200).send(`Object with id ${_id} updated`);
	})
	.catch(err => { throw err; });
};

exports.deletePoll = (req, res, next) => {
};
