# lilacDL-DLer
This node script dl's stuff thats in the .lilacDL format

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

# Usage
node . ./path/to/lilacDL/file.lilacDL

# Flags

--no-part-md5-check OR -npc | Doesn't check the md5sums of individueal files, not a recommended flag

--final-md5-check OR -fc | Check the md5sum of the final joined file, dont do this on files bigger than ~500mb

--no-file-join OR -nfj | Doesn't join the files at the end, use if you are using a different file than just splitted files
