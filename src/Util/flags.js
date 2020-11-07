
// Flag parser
const parseFlags = function(args) {

	const flags = {

		// Flags for download
		md5cPart: true,
		md5cFinal: true,
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
		url: undefined,
	};

	for(let i = 0; i < args.length; ++i) {

		// Normal flags

		if(args[i] === '--no-part-md5-check' || args[i] === '-npc') {flags.md5cPart = false;}

		else if(args[i] === '--no-final-md5-check' || args[i] === '-nfc') {flags.md5cFinal = false;}

		else if(args[i] === '--no-file-join' || args[i] === '-nfj') {flags.joinFiles = false;}

		else if(args[i] === '--ignore-duplicates' || args[i] === '-id') {flags.ignoreDupes = true;}

		// Regexed flags

		else if(/^--connections=\d+$/.test(args[i])) {
			const num = parseInt(args[i].replace('--connections=', ''));
			if(num > 0) flags.maxSimul = num;
		}

		else if(/^--select=\d+$/.test(args[i])) {
			const num = parseInt(args[i].replace('--select=', ''));
			if(num >= 0) flags.selectedNum = num;
		}

		else if(/^--repo=.+$/.test(args[i])) {flags.repo = args[i].replace('--repo=', '');}

		// Damn long regex
		else if(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/.test(args[i])) {flags.url = args[i];}

		// Just assume its a path
		else {flags.path = args[i];}

	}

	return flags;

};

module.exports = parseFlags;
