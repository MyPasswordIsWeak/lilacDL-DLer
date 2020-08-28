
const { cachePath, reposPath, line } = require('./Util/constants.js');
const { readFileSync, writeFileSync } = require('fs');
const { post } = require('./add-repo.js');
const check = require('./Util/check.js');
const fetch = require('node-fetch');

module.exports = async function(args, flags) {

    repos = JSON.parse(readFileSync(reposPath));

    for(const repo in repos) {
        
        let currRepo = repos[repo];
        check('lr', currRepo);

        // Only update online repo's
        if(currRepo.adress !== 'local') {

            // Get the repo
            let repo = await fetch(currRepo.adress);
            repo = await repo.json();
            
            console.log(`GOT:${repo.name}`);

            // Update local repo file
            currRepo = post(repo, { ignoreDupes: true, url: currRepo.adress }, true);

            // Update the cache
            let jsonData = new Array();
            for(i = 0; i < currRepo.repo.length; ++i) {
                
                currEntry = currRepo.repo[i];
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

}