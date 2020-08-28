
// This file is a shortcut to all action files
module.exports = {
    download: require('./lilacDL.js'),
    update: require('./update-repos.js'),
    add: require('./add-repo.js').run,
    fetch: require('./fetch-file')
}