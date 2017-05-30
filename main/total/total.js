// Generated by LiveScript 1.5.0
(function(){
  var p, big, slice$ = [].slice;
  p = require('prelude-ls');
  big = require('big.js');
  module.exports = curry$(function(calc, rates){
    var zero, items, coins, start, stop, collect, calcTotal, sum, renderTotal, totals;
    zero = function(){
      return big(0);
    };
    items = calc();
    coins = Object.keys(items);
    start = function(){
      return p.each(function(it){
        return items[it].start();
      })(
      coins);
    };
    stop = function(){
      return p.each(function(it){
        return items[it].stop();
      })(
      coins);
    };
    collect = {
      start: start,
      stop: stop
    };
    calcTotal = function(arg$, cb){
      var head, tail, total;
      head = arg$[0], tail = slice$.call(arg$, 1);
      if (head == null) {
        return cb(null, []);
      }
      total = items[head].total();
      return rates[head](function(err, usd){
        var item;
        if (err != null) {
          return cb(err);
        }
        item = {
          name: head,
          amount: total,
          amountUsd: big(usd).times(total),
          rate: usd
        };
        calcTotal(tail, function(err, rest){
          if (err != null) {
            return cb(err);
          }
          cb(null, [item].concat(rest));
        });
      });
    };
    sum = function(first, second){
      return first.plus(second);
    };
    renderTotal = function(total){
      return {
        name: total.name,
        amount: total.amount.toString(),
        amountUsd: total.amountUsd.toString(),
        rate: total.rate
      };
    };
    totals = function(done){
      return calcTotal(coins, function(err, items){
        var totalUsd, result, this$ = this;
        if (err != null) {
          return done(err);
        }
        totalUsd = p.foldl(sum, zero())(
        p.map(function(it){
          return it.amountUsd;
        })(
        items));
        result = {
          totalUsd: totalUsd.toString(),
          details: p.map(renderTotal)(
          items)
        };
        done(null, result);
      });
    };
    return {
      collect: collect,
      totals: totals,
      items: items
    };
  });
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
}).call(this);
