// Generated by LiveScript 1.5.0
(function(){
  var request, cheerio, big, iserror;
  request = require('request');
  cheerio = require('cheerio');
  big = require('big.js');
  iserror = require('../../iserror.js')('https://etherchain.org');
  module.exports = function(key, callback){
    return request("https://etherchain.org/account/" + key, function(err, response){
      var $, html, tr;
      if (iserror(err, "Failed to get balance of ETH address " + key)) {
        return callback(err);
      }
      $ = cheerio.load(response.body);
      html = $('#account>.table tr>td').eq(1).html();
      if (html == null) {
        return callback("Value Not Found");
      }
      tr = html.match("^[0-9.]+")[0];
      callback(null, big(tr));
    });
  };
}).call(this);
