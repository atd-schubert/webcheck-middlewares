## Description
This is a collection of middlewares for [the webcheck module](https://www.npmjs.org/package/webcheck).

## Included Middlewares
### mirror
You can mirror a root url to a directory.

Options:
* base: the base url to mirror. Like "http://example.com/" or "http://example.com/sub/path/"
* dir: path on local maschine to save the data. Like "/home/user/mirror-of-example/"
* checkMime: check for mimetypes by content-type header and save file with right file-extention.
* forceMime: always add file-extention, even if it has the correct one. Only works with checkMime setted to true!