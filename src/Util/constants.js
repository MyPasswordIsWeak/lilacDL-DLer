
// pkg + fs is evil
const path = require('path');
const dot = path.join(__dirname, '../../');

module.exports = {
	requiredFolders: [
		`${dot}/.data`,
		`${dot}/.data/cache`,
		`${dot}/.data/temp`,
	],
	requiredFiles: [
		{
			path: `${dot}/.data/repos.json`,
			cont: '{ }',
		},
	],
	reposPath: `${dot}/.data/repos.json`,
	tempPath: `${dot}/.data/temp`,
	// Here we want to download to the path the script is ran from, not the script dir
	downloadsPath: '.',
	cachePath: `${dot}/.data/cache`,
	line: '-----------------------------------------------------------',
};
