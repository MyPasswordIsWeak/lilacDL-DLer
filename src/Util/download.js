
const fs = require('fs');
const https = require('https');
const http = require('http');

let statusCodeReal = '';

// Thank you stackoverflow for this wonderfull function

async function download(url, filePath) {
	const proto = !url.charAt(4).localeCompare('s') ? https : http;

	const fileOpened = fs.openSync(filePath, 'w');
	fs.closeSync(fileOpened);

	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(filePath);
		let fileInfo = null;

		const request = proto.get(url, response => {

			statusCodeReal = response.statusCode;

			if (response.statusCode !== 200) {
				reject({ errors: new Error(`Failed to get (${response.statusCode})`), status: statusCodeReal });
				return;
			}

			fileInfo = {
				mime: response.headers['content-type'],
				size: parseInt(response.headers['content-length'], 10),
			};

			response.pipe(file);
		});

		// The destination stream is ended by the time it's called
		file.on('finish', () => resolve({ fileinfo: fileInfo, status: statusCodeReal }));

		request.on('error', err => {
			fs.unlink(filePath, () => reject({ errors: err, status: statusCodeReal }));
		});

		file.on('error', err => {
			fs.unlink(filePath, () => reject({ errors: err, status: statusCodeReal }));
		});

		request.end();
	});
}

module.exports = download;