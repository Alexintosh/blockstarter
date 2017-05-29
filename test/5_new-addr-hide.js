// Generated by LiveScript 1.5.0
(function(){
  var expect, main, ref$, encrypt, decrypt, p, slice$ = [].slice;
  expect = require('expect');
  main = require('../main/main.js');
  ref$ = main.encryptPrivateKey, encrypt = ref$.encrypt, decrypt = ref$.decrypt;
  p = require('prelude-ls');
  describe('NewAddrHide', function(){
    it('key_is_not_defined', function(done){
      var email, newAddr, i$, ref$, len$, coin;
      this.timeout(10000);
      email = "testmail@gmail.com";
      newAddr = main.newAddrHide;
      for (i$ = 0, len$ = (ref$ = ['eth', 'btc', 'ltc']).length; i$ < len$; ++i$) {
        coin = ref$[i$];
        newAddr(coin, email, fn$);
      }
      return done();
      function fn$(err, result){
        expect(err).toBe("Key is not defined");
      }
    });
    it('need_at_least_2', function(done){
      var email, newAddr, key, config;
      this.timeout(10000);
      email = "testmail@gmail.com";
      newAddr = main.newAddrHide;
      key = "8e3dc782fc8375c43f59403a337db4ba";
      config = {
        repos: [],
        key: "aasdfsadfasfdsafsf23Pp8j9232"
      };
      return encrypt(JSON.stringify(config), key, function(err, encryptedConfig){
        expect(err).toBe(null);
        newAddr.setup(encryptedConfig, function(err){
          var i$, ref$, len$, coin;
          expect(err).toBe(null);
          for (i$ = 0, len$ = (ref$ = ['eth', 'btc', 'ltc']).length; i$ < len$; ++i$) {
            coin = ref$[i$];
            newAddr(coin, email, fn$);
          }
          done();
          function fn$(err, result){
            expect(err).toBe("You need at least 2 repos");
          }
        });
      });
    });
    return it('process', function(done){
      var email, newAddr, key, infos, config;
      this.timeout(10000);
      email = "testmail@gmail.com";
      newAddr = main.newAddrHide;
      key = "8e3dc782fc8375c43f59403a337db4ba";
      infos = [];
      config = {
        repos: ['blockstarter-235.firebase.com', 'blockstarter-233.firebase.com', 'blockstarter-400.firebase.com'],
        key: "aasdfsadfasfdsafsf23Pp8j9232"
      };
      return encrypt(JSON.stringify(config), key, function(err, encryptedConfig){
        expect(err).toBe(null);
        newAddr.setup(encryptedConfig, function(err){
          var coins, testCoins;
          expect(err).toBe(null);
          coins = ['eth', 'btc', 'ltc'];
          testCoins = function(arg$, cb){
            var coin, tail;
            coin = arg$[0], tail = slice$.call(arg$, 1);
            if (coin == null) {
              return cb(null);
            }
            return newAddr(coin, email, function(err, address){
              var key;
              expect(err).toBe(null);
              expect(address).toBeA('string');
              expect(address.length > 10).toBe(true);
              key = config.key + coin + JSON.stringify(email);
              testCoins(tail, cb);
            });
          };
          testCoins(coins, done);
        });
      });
    });
  });
}).call(this);
