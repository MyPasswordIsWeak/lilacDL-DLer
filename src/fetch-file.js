
const { cachePath } = require('./Util/constants.js');
const { readdirSync, readFileSync } = require('fs');
const fetch = require('node-fetch');
const dl = require('./lilacDL.js');

module.exports = function(args, flags) {

	const item = args.join(' ').split('---')[0].trim();

	const fetchedItems = new Array();

	readdirSync(cachePath).forEach(fileName => {

		const file = `${cachePath}/${fileName}`;
		const json = JSON.parse(readFileSync(file));

		for(let i = 0; i < json.length; ++i) {
			json[i].repo = fileName.replace('.json', '');
			if(json[i].name === item)
				fetchedItems.push(json[i]);
		}

	});

	if(fetchedItems.length === 0) {return console.log(`No such item: ${item}`);}

	else if(fetchedItems.length === 1) {
		fetch(fetchedItems[0].url)
			.then(res => res.text())
			.then(text => dl({}, flags, text));
	}
	else if(fetchedItems.length > 1 && flags.selectedNum >= 0) {
		if(!fetchedItems[flags.selectedNum])
			return console.log(`No such number: ${flags.selectedNum}`);
		fetch(fetchedItems[flags.selectedNum].url)
			.then(res => res.text())
			.then(text => dl({}, flags, text));
	}
	else {

		console.log(`${fetchedItems.length} items were found, to select one item use`);
		console.log('the flag --select=NUM, choose num from the following list:');
		console.log('');

		for(let i = 0; i < fetchedItems.length; ++i)
			console.log(`${i}: ${fetchedItems[i].repo} --- ${fetchedItems[i].desc} --- ${fetchedItems[i].name}`);

		console.log('');
		console.log('Tip: to select a flag with the fetch option you need to put the flags behind a ---:');
		console.log('fetch some name --- --select=1');

	}

};