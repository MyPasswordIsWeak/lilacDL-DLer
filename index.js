
// Imports
const flagParser = require('./src/Util/flags.js');
const check = require('./src/Util/check.js');
const index = require('./src/index.js');

// Check for all required folders
check('fs');

// Always usefull variables
const args = process.argv.slice(2);
const action = args.shift();
const flags = flagParser(args);


// Check which action the user wants
switch(action) {

    // Adds a repo
    case 'add':

        index.add(args, flags);
        break;

    // Downloads a local lilacDL file
    case 'download':
        
        index.download(args, flags);
        break;

    // Updates the cache and repo's
    case 'update':
        
        index.update(args, flags);
        break;

    case 'fetch':

        index.fetch(args, flags);
        break;

    default:

        console.log(`Action '${action}' is not a valid action.`);
        break;

}