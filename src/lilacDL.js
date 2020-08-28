
/*
 *
 * .lilacDL™ downloader
 * Script made by MyPasswordIsWeak
 * Usage: 
 * node . ./file.lilacDL
 * 
 */

const { readFileSync, mkdirSync, existsSync,appendFileSync, unlinkSync, openSync, closeSync, rmdirSync } = require('fs');
const { tempPath, donwloadsPath, line } = require('./Util/constants.js');
const downloadChain = require('./Util/downloadChain.js');
const ErrorHandler = require('./Util/errors.js');
const { downloadsPath } = require('./Util/constants.js');

module.exports = function(args, flags, cont) {

    // Get current time
    const tStart = Date.now();

    if(!flags.path && !cont)
        return console.log('No file selected bruh');

    // Read file and split on newlines
    lilacDL = flags.path ? 
        readFileSync(flags.path, 'UTF-8').split('\n') : cont.split('\n');

    // Make variables
    let links = new Array();
    let Uploader = '';
    let Size = '';
    let Files = '';
    let Title = '';
    let fileTitle = '';
    let md5Comp = '';

    // Parse things
    for(let i = 0; i < lilacDL.length; ++i) {

        // Current line
        const line = lilacDL[i];

        // Ignore lines that start with # (comments)
        if(line.startsWith('#'))
            continue;

        // See if author, assigning variable is ugly, i dont care
        if(/^Uploader: /i.test(line))
            Uploader = [ ...line ].splice(10).join('').replace('\r','');

        if(/MD5: /i.test(line))
            md5Comp = [ ...line ].splice(5).join('').replace('\r','');
            
        // See if size, assigning variable is ugly, i dont care
        if(/^Size: /i.test(line))
            Size = [ ...line ].splice(6).join('').replace('\r','');

        // See if tit;e, assigning variable is ugly, i dont care
        if(/Title: /i.test(line))
            Title = [ ...line ].splice(7).join('').replace('\r','');

        // We found dem files
        if(/^\d+/.test(line)) {

            const number = line.match(/^\d+/)[0];
            const lineSplit = line.replace(/(^\d+: |\r)/g,'').split(' * ');
            const link = lineSplit[0];
            const md5 = lineSplit[1];

            links.push({ link: link, part: number, md5: md5 });

        }

    }

    Files = links.length;
    fileTitle = Title.replace(/ /g, '_');

    console.log('Downloading ...');
    console.log(line);
    console.log(`Title: ${Title}`);
    console.log(`Uploader: ${Uploader}`);
    console.log(`Size: ${Size}`);
    console.log(`Files: ${Files}`);
    console.log(line);
    

    fileTitle = fileTitle.replace('\r','');
    const basePath = `${tempPath}/${fileTitle}/`;

    if(!existsSync(basePath)) 
        mkdirSync(basePath);

    // Download part
    downloadChain(links,basePath,fileTitle,flags,false)
        .then(errors => {
            
            // Create error handler class
            const errorHandler = new ErrorHandler(errors,basePath,fileTitle,flags);
        
            // Combine it when the once fires
            errorHandler.once('done', function() { 
                
                console.log('Done downloading!');

                if(flags.joinFiles) {

                    console.log('Attaching files...');
                    console.log(line);
                    
                    const fileLocation = `${downloadsPath}/${fileTitle}`;
                    const file = openSync(fileLocation,'w');
                    closeSync(file);

                    for(let i = 0; i < Files; ++i) {
                        
                        appendFileSync(fileLocation, readFileSync(`${basePath}${fileTitle}.${links[i].part}`,'binary'), 'binary');
                        
                        console.log(`Appended part ${links[i].part}`);
                        console.log(`Done ${i+1} out of ${Files}`);
                        console.log(line);
                    }
                    
                    let md5sumAppended = '';

                    if(flags.md5cFinal)
                        md5sumAppended = md5sum(readFileSync(fileLocation,'binary'));
                    else
                        md5sumAppended = md5Comp;

                    if(md5sumAppended.toLowerCase() === md5Comp.toLowerCase()) {

                        // Cleanup
                        for(let i = 0; i < Files; ++i)
                            unlinkSync(`${basePath}${fileTitle}.${links[i].part}`);
                        rmdirSync(basePath);

                        console.log(`Completed downloading ${fileTitle}!`);
                    } else {
                        console.log('An error has occured merging the files, please do it manually');
                        console.log('Checksums do not match');
                        unlinkSync(fileLocation);
                    }
                }

                //End time
                console.log(`Took ${Math.round((Date.now() - tStart) / 1000)}s to complete the download`);

            })
        
            // Start errorHandler
            errorHandler.start();
        
        });
}