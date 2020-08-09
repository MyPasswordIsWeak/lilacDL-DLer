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
