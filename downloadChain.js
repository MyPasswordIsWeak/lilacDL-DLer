
const dl = function(Files,links,basePath,fileTitle,flags,md5sum,download) {

    let finished = 0;

    return new Promise(function(resolve,reject) {
        for(let i = 0; i < Files; ++i) {
    
            let linksi = links[i];
        
            console.log(`Started download for part ${linksi.part} from link`);
            console.log(`${linksi.link}`);
            console.log(`With expected md5 checksum of`);
            console.log(`${linksi.md5}`);
            console.log('-----------------------------------------------------------');
        
            download(linksi.link, `${basePath}${fileTitle}.${linksi.part}`)
                .then(res => {
                    if(res.status != '200') {

                        unlinkSync(`${basePath}${fileTitle}.${linksi.part}`);
                        console.log(`Got error ${res.status} on ${linksi.link} with number ${linksi.part}`);
                        console.log('-----------------------------------------------------------');
                    
                        ++finished;
                        if(finished == Files)
                            resolve();

                    } else {
        
                        let md5 = '';
        
                        if(flags.md5cPart)
                            md5 = md5sum(readFileSync(`${basePath}${fileTitle}.${linksi.part}`,'binary'));
                        else
                            md5 = linksi.md5;
        
                        if(md5.toLowerCase() !== linksi.md5.toLowerCase()) {
                            
                            console.log(`Downloaded number ${linksi.part} successfully with`);
                            console.log(`Status code ${res.status} from the link`);
                            console.log(`${linksi.link}`);
                            console.log(`But the md5sum does not match the expected md5sum`);
                            console.log(`Please redownload it from the link above`);
                            console.log(`Expected: ${linksi.md5.toLowerCase()}`);
                            console.log(`Got: ${md5.toLowerCase()}`);
                            console.log('-----------------------------------------------------------');
        
                        } else {
        
                            console.log(`Downloaded number ${linksi.part} successfully with`);
                            console.log(`Status code ${res.status} from the link`);
                            console.log(`${linksi.link}`);
                            if(flags.md5cPart) console.log(`MD5: ${md5}`);
                            console.log('-----------------------------------------------------------');
                        
                        }

                        ++finished;
                        if(finished == Files)
                            resolve();
        
                    }
                });
            }
    })
}

module.exports = dl;