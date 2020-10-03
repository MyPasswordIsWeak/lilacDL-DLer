
const { readFileSync, unlinkSync } = require('fs');
const download = require('./download.js');
const md5sum = require('./md5sum.js');
const { EventEmitter } = require('events');
const cursor = require('./cursor.js');

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
	let prevIndex = 0;
    let finished = 0;

    const tLength = links.length;

    return new Promise(function(resolve,reject) {
        for(let i = 0; i < tLength; ++i) {
		
			let linksi = links[i];
        
            manager.once(i, function() {

			cursor.printStart(linksi, errorhandlerStatus, prevIndex);
			prevIndex = -5;
			
            download(linksi.link, `${basePath}/${fileTitle}.${linksi.part}`)
                .then(async res => {
                    if(res.status != '200') {

                        unlinkSync(`${basePath}/${fileTitle}.${linksi.part}`);
                        console.log(`Got error ${res.status} on ${linksi.link} with number ${linksi.part}`);
                        console.log('-----------------------------------------------------------');
                    
                        errors.push(linksi);

                        ++finished;
                        if(finished == tLength)
                            resolve(errors);

                    } else {
        
                        let md5 = '';
        
                        if(flags.md5cPart)
                            md5 = await md5sum(`${basePath}/${fileTitle}.${linksi.part}`);
                        else
                            md5 = linksi.md5;
        
                        if(md5.toLowerCase() !== linksi.md5.toLowerCase()) {
                            
							cursor.printDoneCorrupt(linksi, md5, res, prevIndex);
							prevIndex = -7;

                            errors.push(linksi);
        
                        } else {
        
							cursor.printDoneGood(linksi, flags.md5cPart, md5, res, 
								{ deel: finished + 1, geheel: tLength },
								{ deel: errors.length, geheel: tLength }, prevIndex);
							prevIndex = -6;
                        
                        }

                        ++finished;
                        if(finished == tLength)
                            resolve(errors);
        
					}
					manager.giveReady();
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