
// pkg + fs is evil
const path = require('path');
const dot = path.resolve(__dirname, '../../');

module.exports = {
    requiredFolders: [
        `${dot}/data`,
        `${dot}/data/.storage`,
        `${dot}/data/.storage/.cache`,
        `${dot}/data/downloads`,
        `${dot}/data/temp`
    ],
    requiredFiles: [
    	{ 
    		path: `${dot}/data/.storage/repos.json`,
    		cont: '{ }'
    	}
    ],
    reposPath: `${dot}/data/.storage/repos.json`,
    tempPath: `${dot}/data/temp`,
    downloadsPath: `${dot}/data/downloads`,
    cachePath: `${dot}/data/.storage/.cache`,
    line: '-----------------------------------------------------------'
}
