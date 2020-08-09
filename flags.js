
const parseFlags = function(args) {

    let flags = {
        md5cPart: true,
        md5cFinal: true,
        joinFiles: true,
        path: undefined
    }

    for(let i = 0; i < args.length; ++i) {

        if(args[i] === '--no-part-md5-check' || args[i] === '-npc')
            flags.md5cPart = false;

        if(args[i] === '--final-md5-check' || args[i] === '-fc')
            flags.md5cFinal = true;
            
        if(args[i] === '--no-file-join' || args[i] === '-nfj')
            flags.joinFiles = false;
        
        if(/^(\.|[A-B]:(\\|\/))\.lilacdl$/i.test(args[i]))
            flags.path = args[i];

    }

    return flags;

}

module.exports = parseFlags;