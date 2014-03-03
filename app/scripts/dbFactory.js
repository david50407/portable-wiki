'use strict';
// return the function's  return value
angular.module('styleApp')
.factory('DB', function($http) {

    var base = {};
    var content = "";
    var info = {};
    var _index = [];
    var _searchContent = ["No Match"];

    base.htmlGet = function(wikiname, cb) {
        $http({method: "GET", url: "html/"+wikiname})
              .success(function(data, status){ cb(data);}) 
              .error(function(data, status, headers, config) {
                  cb(data, status);
              });
    } 
    
    base.wikiGet = function(wikiname, cb) {
        $http({method: "GET", url: "wiki/"+wikiname})
              .success(function(data){ cb(data);});     
    } 

    base.update = function(wikiname, _data, cb) {    
        $http({ method: "GET", 
                url: "wiki/"+wikiname,
                params: {update: 'y', data: _data}
              })
             .success(function(data, status){ cb(data, status);}) 
             .error(function(data, status, headers, config) {
                  cb(data, status);
              });
    }
 
    base.updateList = function(cb) {
        $http({ method: "GET", 
                url: "list/"
              })
             .success(function(data, status){ _index = data; cb(data, status);}) 
             .error(function(data, status, headers, config) {
                  cb(data, status);
              });
    }
    
    base.list = function(cb) {
        if( _index.length == 0 ) {
            $http({ method: "GET", 
                url: "list/"
              })
             .success(function(data, status){ _index = data; cb(data, status);})
             .error(function(data, status, headers, config) {
                  cb(data, status);
              });
        } else {
            cb(_index);
        }
    }

    base.create = function(_data, title, cb) {
        $http({ method: "GET", 
                url: "wiki/"+title,
                params: {create: 'y', data: _data}
              })
             .success(function(data, status){ cb(data, status);})
             .error(function(data, status, headers, config) {
                  cb(data, status);
              });
    }

    base.del = function(name ,cb) {
        
        $http({ method: "GET", 
                url: "wiki/"+name,
                params: {delete: 'y', confirm: 'yes'}
              })
             .success(function(data, status){ cb(data, status);})
             .error(function(data, status, headers, config) {
                  cb(data, status);
              });
    }

    base.preview = function(content, cb) {
    
        $http({ method: "GET", 
                url: "html/",
                params: {preview: content}
              })
             .success(function(html, status){ cb(html, status);})
             .error(function(data, status, headers, config) {
                  cb(data, status);
              });
    }

    base.change = function (cb){
        $http({ method: "GET", 
                url: "diff"
              })
             .success(function(html, status){cb(html, status);})      
             .error(function(data, status, headers, config) {
                  cb(data, status);
              });
    }

    base.find = function (expression, cb) {
        $http({ method: "GET", 
                url: "find",
                params : {expr: expression}
              })
             .success(function(data, status){
                 _searchContent = [];
                 _searchContent = data.data;
                 cb(data, status)
             ;})      
             .error(function(data, status, headers, config) {
                  _searchContent = ["No Match"];
                  cb(data, status);
              }); 
    }  
    
    var factoryFunction = {
        wikiGet   : base.wikiGet,
        htmlGet   : base.htmlGet,
        updateWiki : base.update,
        getList: base.list,
        updateList: base.updateList,
        edit   : base.put,
        del    : base.del,
        create : base.create,
        preview: base.preview,
        change : base.change,
        search : base.find,
        searchContent : _searchContent
    };
    return factoryFunction;
});
