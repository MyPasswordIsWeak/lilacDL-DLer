
const parseFlags = function(args) {

    let flags = {
        md5cPart: true,
        md5cFinal: true,
        joinFiles: true
    }

    for(let i = 0; i < args.length; ++i) {

        if(args[i] === '--no-part-md5-check')
            flags.md5cPart = false;

        if(args[i] === '--no-final-md5-check')
            flags.md5cFinal = false;
            
        if(args[i] === '--no-file-join')
            flags.joinFiles = false;

    }

    return flags;

}

module.exports = parseFlags;