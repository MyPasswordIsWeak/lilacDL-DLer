
module.exports = (FILE) => {
	return new Promise((resolve, reject) => {
		const crypto = require('crypto');
		const streamer = require('fs').createReadStream;
		
		const hash = crypto.createHash('md5');
		const stream = streamer(FILE);
		
		stream.on('data', (chunk) => hash.update(chunk));
		stream.on('end', () => resolve(hash.digest('hex')));
		stream.on('error', (err) => reject(err));
	});
}
