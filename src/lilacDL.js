
/*
 *
 * .lilacDL™ downloader
 * Script made by MyPasswordIsWeak
 * Usage:
 * node . download ./file.lilacDL
 *
 */

const { readFileSync, mkdirSync, existsSync, createWriteStream, unlinkSync, openSync, closeSync, rmdirSync, renameSync } = require('fs');
const { tempPath, downloadsPath, line } = require('./Util/constants.js');
const cursor = require('./Util/cursor.js');
const downloadChain = require('./Util/downloadChain.js');
const ErrorHandler = require('./Util/errors.js');
const md5sum = require('./Util/md5sum.js');


module.exports = function(args, flags, cont) {

	// Get current time
	const tStart = Date.now();

	if(!flags.path && !cont)
		return console.log('No file selected bruh');

	// Read file and split on newlines
	const lilacDL = flags.path ?
		readFileSync(flags.path, 'UTF-8').split('\n') : cont.split('\n');

	// Make variables
	const links = new Array();
	let Uploader = '';
	let Size = '';
	let Files = '';
	let Title = '';
	let fileTitle = '';
	let md5Comp = '';

	// Parse things
	for(let i = 0; i < lilacDL.length; ++i) {

		// Current line
		const iline = lilacDL[i];

		// Ignore lines that start with # (comments)
		if(iline.startsWith('#'))
			continue;

		// See if author, assigning variable is ugly, i dont care
		if(/^Uploader: /i.test(iline))
			Uploader = [ ...iline ].splice(10).join('').replace('\r', '');

		if(/MD5: /i.test(iline))
			md5Comp = [ ...iline ].splice(5).join('').replace('\r', '');

		// See if size, assigning variable is ugly, i dont care
		if(/^Size: /i.test(line))
			Size = [ ...line ].splice(6).join('').replace('\r', '');

		// See if tit;e, assigning variable is ugly, i dont care
		if(/Title: /i.test(iline))
			Title = [ ...iline ].splice(7).join('').replace('\r', '');

		// We found dem files
		if(/^\d+/.test(iline)) {

			const number = iline.match(/^\d+/)[0];
			const lineSplit = iline.replace(/(^\d+: |\r)/g, '').split(' * ');
			const link = encodeURI(lineSplit[0]);
			const md5 = lineSplit[1];

			links.push({ link: link, part: number, md5: md5 });

		}

	}

	Files = links.length;
	fileTitle = Title.replace(/ /g, '_');

	console.log('Downloading ...');
	console.log(line);
	console.log(`Title: ${Title}`);
	console.log(`Uploader: ${Uploader}`);
	console.log(`Size: ${Size}`);
	console.log(`Files: ${Files}`);
	console.log(line);


	fileTitle = fileTitle.replace('\r', '');
	const basePath = `${tempPath}/${fileTitle}`;

	if(!existsSync(basePath))
		mkdirSync(basePath);

	// Download part
	downloadChain(links, basePath, fileTitle, flags, false)
		.then(errors => {

			// Create error handler class
			const errorHandler = new ErrorHandler(errors, basePath, fileTitle, flags);

			// Combine it when the once fires
			errorHandler.once('done', async () => {

				console.log(line);
				console.log('Done downloading!');

				if(flags.joinFiles) {

					console.log('Attaching files...');
					console.log(line);

					const fileLocation = `${downloadsPath}/${fileTitle}`;
					// Ensure file exists
					const file = openSync(fileLocation, 'w');
					closeSync(file);

					// Open file stream
					const fileStream = createWriteStream(fileLocation, { encoding: 'binary' });

					for(let i = 0; i < Files; ++i) {

						fileStream.write(readFileSync(`${basePath}/${fileTitle}.${links[i].part}`, 'binary'));
						cursor.printMergeStatus(links[i], Files);

					}

					let md5sumAppended = '';

					if(flags.md5cFinal)
						md5sumAppended = await md5sum(fileLocation);
					else
						md5sumAppended = md5Comp;

					console.log(line);
					if(md5sumAppended.toLowerCase() === md5Comp.toLowerCase()) {

						// Cleanup
						for(let i = 0; i < Files; ++i)
							unlinkSync(`${basePath}/${fileTitle}.${links[i].part}`);
						rmdirSync(basePath);

						console.log(`Completed downloading ${fileTitle}!`);
					}
					else {
						console.log('An error has occured merging the files, please do it manually');
						console.log('Checksums do not match');
						unlinkSync(fileLocation);
					}
				}
				else {
					// Move temp directory to directory script is ran from
					renameSync(basePath, `${downloadsPath}/${fileTitle}`);
				}

				// End time
				console.log(`Took ${Math.round((Date.now() - tStart) / 1000)}s to complete the download`);

			});

			// Start errorHandler
			errorHandler.start();

		});
};