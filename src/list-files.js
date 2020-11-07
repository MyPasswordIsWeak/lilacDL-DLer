
const { readdirSync, readFileSync, existsSync } = require('fs');
const { cachePath } = require('./Util/constants.js');

// {{filename}} --- {{filedesc}} --- {{reponame}} --- {{size}}

module.exports = function(args, flags) {

	const possibleSearch = args.shift();

	if(flags.repo) {

		if(!existsSync(`${cachePath}/${flags.repo}.json`))
			return console.log(`No such repo: ${flags.repo}`);

		const repo = JSON.parse(readFileSync(`${cachePath}/${flags.repo}.json`));

		for(let i = 0; i < repo.length; ++i)
			console.log(`${repo[i].name} --- ${repo[i].desc} --- ${flags.repo} --- ${repo[i].size}`);

	}
	else if(possibleSearch === 'search') {

		const search = args.join(' ').split('---')[0].trim().toLowerCase();

		if(flags.repo) {

			if(!existsSync(`${cachePath}/${flags.repo}.json`))
				return console.log(`No such repo: ${flags.repo}`);

			const repo = JSON.parse(readFileSync(`${cachePath}/${flags.repo}.json`));

			for(let i = 0; i < repo.length; ++i) {
				if(repo[i].name.toLowerCase().includes(search))
					console.log(`${repo[i].name} --- ${repo[i].desc} --- ${flags.repo} --- ${repo[i].size}`);
			}

		}
		else {

			readdirSync(`${cachePath}`).forEach(fileName => {
				const repo = JSON.parse(readFileSync(`${cachePath}/${fileName}`));

				for(let i = 0; i < repo.length; ++i) {
					if(repo[i].name.toLowerCase().includes(search))
						console.log(`${repo[i].name} --- ${repo[i].desc} --- ${fileName.replace('.json', '')} --- ${repo[i].size}`);
				}

			});
		}

	}
	else {

		readdirSync(`${cachePath}`).forEach(fileName => {
			const repo = JSON.parse(readFileSync(`${cachePath}/${fileName}`));

			for(let i = 0; i < repo.length; ++i)
				console.log(`${repo[i].name} --- ${repo[i].desc} --- ${fileName.replace('.json', '')} --- ${repo[i].size}`);

		});
	}
};
