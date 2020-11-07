
const downloadChain = require('./downloadChain');
const { EventEmitter } = require('events');


class ErrorHandler extends EventEmitter {

	constructor(errors, basePath, fileTitle, flags) {

		// For this.emit();
		super();

		// Other stuff
		this.basePath = basePath;
		this.fileTitle = fileTitle;
		this.flags = flags;
		this.errors = errors;

	}

	start() {

		// Check if there are not errors left
		if(this.errors.length === 0)
			return this.emit('done');

		console.log('-----------------------------------------------------------');
		console.log(`Starting to fix ${this.errors.length} errors`);
		console.log('Starting downloadChain ...');
		console.log('-----------------------------------------------------------');

		// links,basePath,fileTitle,flags,errorhandlerStatus
		downloadChain(this.errors, this.basePath, this.fileTitle, this.flags, true)
			.then(errors => {

				if(errors.length === 0)
					return this.emit('done');

				const newEvent = new ErrorHandler(errors, this.basePath, this.fileTitle, this.flags);

				newEvent.once('done', function() { this.emit('done'); });

				newEvent.start();

			});

	}


}

module.exports = ErrorHandler;