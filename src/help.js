
// Just a help command

function print(text) {
    console.log(text)
}

// I could probably improve this somehow
module.exports = function(args, flags) {

    print('[ Welcome to lilacdl ]');
    print('');
    print('This program downloads files in .lilacDL format');
    print('Or downloads files from a repostitory');
    print('');
    print('[ Commands ]');
    print('');
    print('help --- this help text');
    print('add --- adds a repostitory');
    print('update --- updates the repostitory cache');
    print('fetch --- downloads a file from a repostitory');
    print('download --- downloads a file from a local .lilacDL file');
    print('list --- lists all files available for fetching');
    print('');
    print('[ flags ]');
    print('');
    print('--no-part-md5-check or -npc --- doesn\'t check the part md5 checksums');
    print('--final-md5-check or -fc --- checks the final checksum of a file, don\'t use on large files');
    print('--no-file-join or -nfj --- doesn\'t join files after download');
    print('--connections=NUM --- decides how many connections the download should use');
    print('--ignore-duplicates or -id --- replaces a duplicate repostitory with the new one');
    print('--select=NUM --- selects a file in case of multiple with fetching');
    print('--repo=REPONAME --- lists all items in a specified repo');
    print('');
    print('[ example usage ]');
    print('');
    print('lilacdl fetch cursed code listner js --- --connections=3');
    print('lilacdl add ./repo.lilacrepo');
    print('lilacdl download ./file.lilacDL');
    print('lilacdl update');
    print('lilacdl list "--repo=school work"');
    print('lilacdl list search homeword --- "--repo=school work"');
    print('lilacdl list');

}
