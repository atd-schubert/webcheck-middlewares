"use strict";

module.exports= function reportForeignResourcesMiddlewareBuilder(opts){
  // no opts at this time...
  opts = opts || {};
  
  return function reportForeignResourcesMiddleware(ro, cb){
    var resources = ro.getResources();
    var url = ro.getURL();
    var result = [];
    var i;
    
    var domain = url.split("/");
    domain = domain[0] + domain[1] + domain[2];
    if(opts.filter){
      for(i=0;i<resources.length; i++) {
        if(!opts.filter.test(resources[i]) && result.indexOf(resources[i]) === -1) result.push(resources[i]);
      }
    } else {
      for(i=0;i<resources.length; i++) {
        if(!resources[i].indexOf(domain) == 0 && result.indexOf(resources[i]) === -1) result.push(resources[i]);
      }
    }
    ro.addReport("info", "foreignResources", result);
    
    cb();
    
  };
};