var bin2hex = function (s) {
  //  discuss at: http://phpjs.org/functions/bin2hex/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Onno Marsman
  // bugfixed by: Linuxworld
  // improved by: ntoniazzi (http://phpjs.org/functions/bin2hex:361#comment_177616)
  //   example 1: bin2hex('Kev');
  //   returns 1: '4b6576'
  //   example 2: bin2hex(String.fromCharCode(0x00));
  //   returns 2: '00'

  var i, l, o = '',
      n;

  s += '';

  for (i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i)
        .toString(16);
    o += n.length < 2 ? '0' + n : n;
  }

  return o;
};


if (Meteor.isServer) {

  Mongo.Collection.prototype.collate = function(options) {
    var self = this;
    var keys;
    var locales;
    var store;

    check(options, {
      keys: [String],
      locales: [String],
      store: Match.Optional(String),
      precision: Match.Optional(Match.Integer)
    });

    keys = options.keys;
    locales = options.locales;
    store = options.store || 'collators';
    precision = options.precision || 5;

    var availableLocales = [/* ilib.Locale.getAvailableLocales() */];

    _.each(locales, function(locale) {
      if (!_.contains(availableLocales, locale)) {
        throw new Meteor.Error('locale-not-available',
            'Requested locale '
            + locale
            + ' is either incorrect or not available');
      }
    });

    if (precision <= 0) {
      throw new Meteor.Error('precision-incorrect',
          'Precision must be greater than zero');
    }

    self.before.insert(function(userId, doc) {
      if (doc[store]) {
        throw new Meteor.Error('store-not-available',
            'The document cannot contain a key named ' + store);
      }

      doc[store] = {};
      
      _.each(keys, function(key) {
        if (!doc[key]) {
          console.warn('The document does not contain a collatible key named '
              + key
              + '. Your sorts on this key may be skewed.');
        } else {
          doc[store][key] = {};

          _.each(locales, function(locale) {
            var collator = new ilib.Collator({locale: locale});
            doc.collators[key][locale] = bin2hex(collator.sortKey(doc[key].substr(0, precision)));
          });
        }

      });
      
    });

  };
}
