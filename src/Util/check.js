
const { requiredFolders, requiredFiles } = require('./constants.js');
const { existsSync, mkdirSync, writeFileSync } = require('fs');

// Checks if every value is present

module.exports = function(mode, obj) {

    // Checks happen in switch
    switch(mode) {

        // Online repo
        case 'or':

            if(typeof obj.name != 'string')
                throw 'Invalid repo, name property missing or invalid.';

            if(typeof obj.author != 'string')
                throw 'Invalid repo, author property missing or invalid.';

            if(typeof obj.desc != 'string')
                throw 'Invalid repo, desc property missing or invalid.';
            
            if(typeof obj.repo != 'object')
                throw 'Invalid repo, desc property missing or invalid.';

            // If everything is good break
            break;


        // Local repo
        case 'lr':
            if(typeof obj.name != 'string')
            throw 'Invalid repo, name property missing or invalid.';

            if(typeof obj.author != 'string')
                throw 'Invalid repo, author property missing or invalid.';

            if(typeof obj.desc != 'string')
                throw 'Invalid repo, desc property missing or invalid.';

            // If everything is good break
            break;


        // Repo Entry
        case 're':

            if(typeof obj.name != 'string')
                throw 'Invalid repo entry, name property missing or invalid.';

            if(typeof obj.desc != 'string')
                throw 'Invalid repo entry, desc property missing or invalid.';

            if(typeof obj.name != 'string')
                throw 'Invalid repo entry, url property missing or invalid.';

            if(typeof obj.name != 'string')
                throw 'Invalid repo entry, size property missing or invalid.';
    
            // If everything is good break
            break;

        // Folder structure, checks if all folders are present and creates them if not
        case 'fs':

            for(let i = 0; i < requiredFolders.length; ++i) {
                if(!existsSync(requiredFolders[i]))
                    mkdirSync(requiredFolders[i]);
            }
            
            for(let i = 0; i < requiredFiles.length; ++i) {
            	if(!existsSync(requiredFiles[i].path))
            		writeFileSync(requiredFiles[i].path, requiredFiles[i].cont, 'utf-8');
            }

            break;

        }

}
