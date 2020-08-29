
// Flag parser
const parseFlags = function(args) {

    let flags = {

        // Flags for download
        md5cPart: true,
        md5cFinal: false,
        joinFiles: true,
        maxSimul: 10,

        // Flags for add
        ignoreDupes: false,

        // Flags for fetch
        selectedNum: undefined,

        // Flags for list
        repo: undefined,

        // General flags
        path: undefined,
        url: undefined
    }

    for(let i = 0; i < args.length; ++i) {

        // Normal flags

        if(args[i] === '--no-part-md5-check' || args[i] === '-npc')
            flags.md5cPart = false;

        if(args[i] === '--final-md5-check' || args[i] === '-fc')
            flags.md5cFinal = true;
            
        if(args[i] === '--no-file-join' || args[i] === '-nfj')
            flags.joinFiles = false;
        
        if(args[i] === '--ignore-duplicates' || args[i] === '-id')
            flags.ignoreDupes = true;

        // Regexed flags

        if(/^(\.|[A-Z]:(\\|\/)).+\.lilac(dl|repo)$/i.test(args[i]))
            flags.path = args[i];

        if(/^--connections=\d+$/.test(args[i])) {
            const num = parseInt(args[i].replace('--connections=',''));
            if(num > 0) flags.maxSimul = num;   
        }

        if(/^--select=\d+$/.test(args[i])) {
            const num = parseInt(args[i].replace('--select=',''));
            if(num >= 0) flags.selectedNum = num;   
        }

        if(/^--repo=.+$/.test(args[i]))
            flags.repo = args[i].replace('--repo=', '');

        // Damn long regex
        if(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(args[i]))
            flags.url = args[i];

    }

    return flags;

}

module.exports = parseFlags;