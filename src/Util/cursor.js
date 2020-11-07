
const readline = require('readline');


const moveCursorRelAndClear = function(x, y) {
	readline.moveCursor(process.stdout, x, y);
	readline.clearScreenDown(process.stdout);
};


const print = function(message) {
	process.stdout.write(message.toString());
};

const printStart = function(linksi, errorStatus, prevIndex) {

	moveCursorRelAndClear(0, prevIndex);

	print(`Started download for part ${linksi.part} from link\n`);
	print(`${linksi.link}\n`);
	print('With expected md5 checksum of\n');
	print(`${linksi.md5}\n`);
	errorStatus ? print('This download is managed by the errorHandler\n') : print('This download is not managed by the errorHandler\n');

};

const printDoneGood = function(linksi, md5c, md5, res, doneObj, failObj, prevIndex) {

	moveCursorRelAndClear(0, prevIndex);

	print(`Downloaded number ${linksi.part} successfully with\n`);
	print(`Status code ${res.status} from the link\n`);
	print(`${linksi.link}\n`);
	md5c ? print(`md5sum of part: ${md5}\n`) : print('MD5 Sums disabled\n');
	print(`Total downloaded: ${Math.floor(doneObj.deel / doneObj.geheel * 100)}% (${doneObj.deel}/${doneObj.geheel})\n`);
	print(`Incorrectly downloaded: ${Math.floor(failObj.deel / failObj.geheel * 100)}% (${failObj.deel}/${failObj.geheel})\n`);

};

const printDoneCorrupt = function(linksi, md5, res, prevIndex) {

	moveCursorRelAndClear(0, prevIndex);

	print(`Downloaded number ${linksi.part} with\n`);
	print(`Status code ${res.status} from the link\n`);
	print(`${linksi.link}\n`);
	print('But the md5sum does not match the expected md5sum\n');
	print('The downloader will redownload it at the end\n');
	print(`Expected: ${linksi.md5.toLowerCase()}\n`);
	print(`Got: ${md5.toLowerCase()}\n`);

};

const printOneLineError = function(message, prevIndex) {

	moveCursorRelAndClear(0, prevIndex);

	print(`${message}\n`);

};

const printMergeStatus = function(index, part, files) {

	moveCursorRelAndClear(0, -2);

	print(`Appended part ${part}\n`);
	print(`Done: ${index + 1 === files ? 100 : Math.floor(index / files * 100)}% (${index + 1}/${files})\n`);

};

module.exports = {
	printOneLineError: printOneLineError,
	printMergeStatus: printMergeStatus,
	printDoneCorrupt: printDoneCorrupt,
	printDoneGood: printDoneGood,
	printStart: printStart,
	print: print,
};
