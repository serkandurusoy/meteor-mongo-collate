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
