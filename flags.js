
const parseFlags = function(args) {

    let flags = {
        md5cPart: true,
        md5cFinal: false,
        joinFiles: true,
        path: undefined,
        maxSimul: 10
    }

    for(let i = 0; i < args.length; ++i) {

        if(args[i] === '--no-part-md5-check' || args[i] === '-npc')
            flags.md5cPart = false;

        if(args[i] === '--final-md5-check' || args[i] === '-fc')
            flags.md5cFinal = true;
            
        if(args[i] === '--no-file-join' || args[i] === '-nfj')
            flags.joinFiles = false;
        
        if(/^(\.|[A-Z]:(\\|\/)).+\.lilacdl$/i.test(args[i]))
            flags.path = args[i];

        if(/^--connections=\d+$/.test(args[i])) {
            const num = parseInt(args[i].replace('--connections=',''));
            if(num > 0) flags.maxSimul = num;   
        }


    }

    return flags;

}

module.exports = parseFlags;