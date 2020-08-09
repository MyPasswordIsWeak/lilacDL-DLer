# lilacDL-DLer
This node script dl's stuff thats in the .lilacDL format

# LilacDL format
The lilacDL format looks like this:
```
# You can commment by begging a line with a #
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

--no-part-md5-check - Doesn't check the md5sums of individueal files, not a recommended flag

--no-final-md5-check - Doesn't check the md5sum of the final joined file, probably not necessairy if all part files are fine

--no-file-join - Doesn't join the files at the end, use if you are using a different file than just splitted files