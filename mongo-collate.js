if (Meteor.isServer) {

  Mongo.Collection.prototype.collate = function (options) {
    var self    = this,
        keys    = options.keys,
        locales = options.locales;

    self.before.insert(function (userId, doc) {
      doc.collators = {};
      _.each(keys, function (key) {
        doc.collators[key] = {};
        _.each(locales, function (locale) {
          var collator = new ilib.Collator({locale: locale});
          doc.collators[key][locale] = collator.sortKey(doc[key]);
        });
      });
    });

  };
}