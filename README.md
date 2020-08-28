# lilacDL-DLer
This node script dl's stuff thats in the .lilacDL format and can also use repo's now

# LilacDL format
The lilacDL format looks like this:
```
# You can commment by begining a line with a #
# Meta
Uploader: Person who uploaded the file, usually yourself
Size: How big the file is
Title: What the file is called.extension
MD5: The md5sum of the file

# Links
extension: link * md5sum
extension: link * md5sum
extension: link * md5sum
```

# LilacREPO format
The lilacREPO looks like this:
```json
{
    "name":"Some repo name",
    "author":"The one who made this",
    "desc":"A description of the repo",
    "repo": [
        {
            "name":"Name of an item",
            "desc":"Description of item",
            "url":"Direct link to the lilacDL of that item",
            "size":"Size of the item"
        }
    ]
}
```

# Usage
node . download ./path/to/lilacDL.lilacDL  
node . add https://example.com/repo.lilacREPO  
node . add ./example.lilacREPO  
node . fetch name  
node . update  

# Subcommands

| command | description |
| ----- | ----- |
| download | Downloads a local .lilacDL file |
| fetch | Downloads a .lilacDL file from a repo |
| add | Adds an online or local repo |
| update | Updates the repo cache |

# Flags

| flag | subcommand | description |
| ----- | ----- | ----- |
| --no-part-md5-check OR -npc | download AND fetch | Doesn't check the md5sums of individueal files, not a recommended flag |
| --final-md5-check OR -fc | download AND fetch | Check the md5sum of the final joined file, dont do this on files bigger than ~500mb |
| --no-file-join OR -nfj | download AND fetch | Doesn't join the files at the end, use if you are using a different file than just splitted files |
| --connections=NUMBER | download AND fetch | Set the max amount of connections, default is 10 |
| --ignore-duplicates OR -id | add | Replaces a repo if duplicates are found |
| --select=NUMBER | fetch | Selects an item to download if multiple items are found |