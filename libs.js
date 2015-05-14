// ilib from jedlsoft.com is used for converting strings to sortkeys based
// on cldr unicode data
ilib = Npm.require('ilib');
Locale = Npm.require('ilib/lib/Locale.js');
Collator = Npm.require('ilib/lib/Collator.js');

// bin2hex from phpjs.org is used for converting binary sortkey strings to hex for
// proper mongodb sorting of variable length strings
bin2hex = function (s) {
  var i, l, o = '', n;

  s += '';

  for (i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i)
        .toString(16);
    o += n.length < 2 ? '0' + n : n;
  }

  return o;
};

deepExtend = function(obj, path, value) {
  if (typeof path === "string")
    path = path.split(".");

  if (path.length > 1) {
    var e = path.shift();
    assign(obj[e] =
            Object.prototype.toString.call(obj[e]) === "[object Object]"
                ? obj[e]
                : {},
        path,
        value);
  } else
    obj[path[0]] = value;
};

deepGet = function(obj, path) {
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');
  path = path.split('.');
  while (path.length) {
    var e = path.shift();
    if (e in obj) {
      obj = obj[e];
    } else {
      return;
    }
  }
  return obj;
};
