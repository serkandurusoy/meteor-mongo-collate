if (typeof Mongo !== 'undefined') {

  Mongo.Collection.prototype.collate = function (options) {
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

    var availableLocales = Locale.getAvailableLocales();

    _.each(locales, function (locale) {
      if (!_.contains(availableLocales, locale)) {
        throw new Meteor.Error('locale-not-available',
            'Requested locale '
            + locale
            + ' is either incorrect or not available.'
            + ' It must be one of: '
            + availableLocales.toString() );
      }
    });

    if (precision <= 0) {
      throw new Meteor.Error('precision-incorrect',
          'Precision must be greater than zero');
    }

    self.before.insert(function (userId, doc) {
      if (doc[store]) {
        throw new Meteor.Error('store-not-available',
            'The document cannot contain a key named ' + store);
      }

      doc[store] = {};

      _.each(keys, function (key) {
        if (!doc[key]) {
          console.warn('The document does not contain a collatible key named '
              + key
              + ' therefore omitted from collation.'
              + '. Your sorts on this key may be skewed.');
        } else if (!(_.isString(doc[key]) || _.isNumber(doc[key]))) {
          console.warn('The '
              + key
              + ' is not string or number therefore omitted from collation.'
              + '. Your sorts on this key may be skewed.');
        } else {
          if (!_.isString(doc[key])) { // TODO: Is this necessary? Check how numbers are sorted on their generated sortKeys
            console.warn('The type of '
                + key
                + ' is not string. Your sorts on this key may be skewed.');
          }
          doc[store][key] = {};

          _.each(locales, function (locale) {
            var collator = new Collator({locale: locale});
            doc[store][key][locale] = bin2hex(collator.sortKey(doc[key].substr(0, precision)));
          });
        }

      });

    });

  };

} else {
  throw new Meteor.Error('mongodb-not-found',
      'This package works with only mongodb');
}
