
const { cachePath, reposPath, line } = require('./Util/constants.js');
const { readFileSync, writeFileSync } = require('fs');
const { post } = require('./add-repo.js');
const check = require('./Util/check.js');
const fetch = require('node-fetch');

module.exports = async function() {

	const repos = JSON.parse(readFileSync(reposPath));

	for(const repo in repos) {

		let currRepo = repos[repo];
		check('lr', currRepo);

		// Only update online repo's
		if(currRepo.adress !== 'local') {

			// Get the repo
			let frepo = await fetch(currRepo.adress);
			frepo = await repo.json();

			console.log(`GOT:${frepo.name}`);

			// Update local repo file
			currRepo = post(frepo, { ignoreDupes: true, url: currRepo.adress }, true);

			// Update the cache
			const jsonData = new Array();
			for(let i = 0; i < currRepo.repo.length; ++i) {

				const currEntry = currRepo.repo[i];
				check('re', currEntry);

				jsonData.push(currEntry);

			}

			// Write new cache
			writeFileSync(`${cachePath}/${currRepo.name}.json`, JSON.stringify(jsonData, null, 2), 'utf8');

			console.log(`Added repo ${currRepo.name} to the cache`);

		}

	}

	console.log(line);
	console.log('Done updating repo\'s!');

};