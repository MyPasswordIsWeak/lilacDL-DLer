
const { readFileSync, unlinkSync } = require('fs');
const download = require('./download.js');
const md5sum = require('./md5sum.js');
const { EventEmitter } = require('events');


class DownloadManager extends EventEmitter {

    constructor(flags) {
        super();
        this.count = flags.maxSimul;
    }

    init() {
        for(let i = 0; i < this.count; ++i) {
            this.emit(i);
        }
    }

    giveReady() {
        this.emit(this.count);
        ++this.count;
    }

}

const dl = function(links,basePath,fileTitle,flags,errorhandlerStatus) {

    let manager = new DownloadManager(flags);
    let errors = new Array();
    let finished = 0;

    const tLength = links.length;

    return new Promise(function(resolve,reject) {
        for(let i = 0; i < tLength; ++i) {
        
            let linksi = links[i];
        
            manager.once(i, function() {

            console.log(`Started download for part ${linksi.part} from link`);
            console.log(`${linksi.link}`);
            console.log(`With expected md5 checksum of`);
            console.log(`${linksi.md5}`);
            if(errorhandlerStatus) console.log(`This download is managed by the errorHandler`);
            console.log('-----------------------------------------------------------');
        
            download(linksi.link, `${basePath}${fileTitle}.${linksi.part}`)
                .then(res => {
                    manager.giveReady();
                    console.log(`${finished+1}/${tLength}`)
                    if(res.status != '200') {

                        unlinkSync(`${basePath}${fileTitle}.${linksi.part}`);
                        console.log(`Got error ${res.status} on ${linksi.link} with number ${linksi.part}`);
                        console.log('-----------------------------------------------------------');
                    
                        errors.push(linksi);

                        ++finished;
                        if(finished == tLength)
                            resolve(errors);

                    } else {
        
                        let md5 = '';
        
                        if(flags.md5cPart)
                            md5 = md5sum(readFileSync(`${basePath}${fileTitle}.${linksi.part}`,'binary'));
                        else
                            md5 = linksi.md5;
        
                        if(md5.toLowerCase() !== linksi.md5.toLowerCase()) {
                            
                            console.log(`Downloaded number ${linksi.part} with`);
                            console.log(`Status code ${res.status} from the link`);
                            console.log(`${linksi.link}`);
                            console.log(`But the md5sum does not match the expected md5sum`);
                            console.log(`The downloader will redownload it at the end`);
                            console.log(`Expected: ${linksi.md5.toLowerCase()}`);
                            console.log(`Got: ${md5.toLowerCase()}`);
                            console.log('-----------------------------------------------------------');

                            errors.push(linksi);
        
                        } else {
        
                            console.log(`Downloaded number ${linksi.part} successfully with`);
                            console.log(`Status code ${res.status} from the link`);
                            console.log(`${linksi.link}`);
                            if(flags.md5cPart) console.log(`MD5: ${md5}`);
                            console.log('-----------------------------------------------------------');
                        
                        }

                        ++finished;
                        if(finished == tLength)
                            resolve(errors);
        
                    }
                }).catch(e => { 
                    console.log(`An error has occured: ${e.message}`);
                    console.log('-----------------------------------------------------------');
                    errors.push(linksi);
                    ++finished;
                    if(finished == tLength)
                        resolve(errors);
                });
            }
        )}
        manager.init();
    })
}

module.exports = dl;