
const parseFlags = function(args) {

    let flags = {
        md5cPart: true,
        md5cFinal: false,
        joinFiles: true,
        dumpErr: false,
        debug: false,
        path: undefined,
        maxSimul: 10
    }

    for(let i = 0; i < args.length; ++i) {

        if(args[i] === '--no-part-md5-check' || args[i] === '-npc') {
            flags.md5cPart = false;
            console.log('--no-part-md5 flag selected');
	}

        if(args[i] === '--final-md5-check' || args[i] === '-fc') {
            flags.md5cFinal = true;
            console.log('--final-md5-check flag selected');
        }
            
        if(args[i] === '--no-file-join' || args[i] === '-nfj') {
            flags.joinFiles = false;
            console.log('--no-file-join flag selected');
        }
            
        if(args[i] === '--dump-errors' || args[i] === '-de') {
            flags.dumpErr = true;
            console.log('--dump-errors flag selected');  
        }
        
        if(args[i] === '--debug' || args[i] === '-d') {
            flags.debug = true;
            console.log('--debug flag selected');  
        }
        
        if(/^(\.|[A-Z]:(\\|\/)).+\.lilacdl$/i.test(args[i]))
            flags.path = args[i];

        if(/^--connections=\d+$/.test(args[i]) || /^-c=\d+/.test(args[i])) {
            const num = parseInt(args[i].replace('--connections=','').replace('-c'));
            if(num > 0) flags.maxSimul = num;   
            console.log('--connections flag selected');
        }

    }

    return flags;

}

module.exports = parseFlags;
