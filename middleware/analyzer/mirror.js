"use strict";

// TODO: match contenttype

var fs = require("fs");
var mkdirp = require("mkdirp");
var getDirName = require("path").dirname;
var mime = require("mime");

mime.define({
    'text/xml': ['xml'],
    'application/javascript': ['js'],
    'application/x-javascript': ['js'],
    'text/javascript': ['js']
});

var dynamicWrite = function(path, body, cb){
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err)
    fs.writeFile(path, body, cb);
  });
};

module.exports= function mirrorMiddlewareBuilder(opts){
  // no opts at this time...
  
  
  if(!opts || !opts.base || !opts.dir) throw new Error("You have to define a root url and an dir to save!");
  return function mirrorMiddleware(po, cb){
    var result = po.getResult();
    var url = po.getURL();
    
    
    if(result.statusCode == 200 && url.indexOf(opts.base) === 0 && result.body) {
      var path = opts.dir + "/" + url.substring(opts.base.length, url.length);
      
      if(path.substr(-1)==="/") path += "index";
      
      if(opts.mimeCheck && result.headers && result.headers["content-type"]) {
        var ext = mime.extension(result.headers["content-type"]);
        
        if(!ext) console.error("undefined Content-Type: "+result.headers["content-type"]);
        if(opts.forceMime || mime.extension(mime.lookup(url)) !== ext) path += "."+ext;
      }
      
      dynamicWrite(path, result.body, cb);
    } else {
      cb();
    }
  };
};