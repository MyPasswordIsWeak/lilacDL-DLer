
// This file adds a url or local file to storage

// Form of a repo in storage
/*
 *  {
 *      "name":"<repo name>",
 *      "desc":"<repo description>",
 *      "adress":"<undefined if its a local repo and the url if its an online repo>"
 *  }
 * 
 **/

// Form of a repo file
/*
 *  {
 *      "name":"<repo name>",
 *      "desc":"<repo description>",
 *      "id":"<a unique id>"
 *      "repo": [
 *          {
 *              "name":"<name by which an item gets indexed>",
 *              "desc":"<description of item",
 *              "url":"<url to lilacDL>",
 *              "size":"<filesize>"
 *          }
 *      ]
 *  }
 * 
 **/

const { reposPath, cachePath, line } = require('./Util/constants.js');
const { readFileSync, writeFileSync } = require('fs');
const check = require('./Util/check.js');
const fetch = require('node-fetch');

exports.post = function(repo, flags, silent) {

    // Check the repo
    check('or', repo);

    if(!silent) console.log(`Adding repo ${repo.name} with description`);
    if(!silent) console.log(`${repo.desc}`);
    if(!silent) console.log(`And with ${repo.repo.length} files`);
    if(!silent) console.log(line);

    // Add the repo to the repos.json file
    const newRepo = {
        author: repo.author,
        adress: flags.url || 'local',
        name: repo.name,
        desc: repo.desc
    }

    check('lr', newRepo);
    let repos = JSON.parse(readFileSync(reposPath));
    
    if(repos[newRepo.name] && !flags.ignoreDupes) {
        
        if(!silent) console.log('Found repo with the same name, exiting...');
        if(!silent) console.log('Tip: run with the --ignore-duplicates flag to overwrite the repo');
        if(!silent) console.log(line);

        throw 'Duplicate repo';

    } else {
        
        repos[newRepo.name] = newRepo;

        writeFileSync(reposPath, JSON.stringify(repos, null, 2), 'utf-8');

        if(!silent) console.log(`Done adding repo!`);
        if(!silent) console.log(`Run 'update' to update the cache!`);
    
    }

    // For the update-repos function
    return repo;

}

const post = exports.post;

exports.run = function(args, flags) {
    
    // Make it prefer url's
    if(flags.url) {

        // Download the repo file
        fetch(flags.url)
        .then(res => res.json())
        .then(repo => {

            post(repo, flags);

        }).catch(err => {

            console.log('An error has occured trying to add this repo');
            if(err.status) console.log(`Status code ${err.status}`);
            console.log(`Error: ${err.errors || err}`);
            console.log(line);
            console.log(`Exiting app...`);

        });


    } else if(flags.path) {

        try {

            const repo = JSON.parse(readFileSync(flags.path));
            // Add to repos.json
            post(repo, flags);
            // Add to cache
            writeFileSync(`${cachePath}/${repo.name}.json`, JSON.stringify(repo.repo, null, 2), 'utf8');
    
        } catch(err) {
    
            console.log('An error has occured trying to add this repo');
            if(err.status) console.log(`Status code ${err.status}`);
            console.log(`Error: ${err.errors || err}`);
            console.log(line);
            console.log(`Exiting app...`);
        }

    } else {
        return console.log('No local or online repo selected!');
    }

}