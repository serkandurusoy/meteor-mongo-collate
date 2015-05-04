# Very early WIP. Don't use!

Language based sorting and collations for mongo.

Currently, mongodb's native sorting is English based and case sensitive. But for
most apps out there, this type of sorting is just unnatural and often misleading.

This package achieves to mitigate this problem with a workaround that creates and
stores *sortable keys* along with the original document as collation metadata.

Install with `meteor add serkandurusoy:mongo-collate`.

Enhances the `Mongo.Collection` object with `collate(options)` where `options` is
an object in the form of:

    {
      keys: [String], // The keys in the document that are to be sorted by collation
      locales: [String] // The locales that the sorting should be done in
    }

The `keys` must match match your document keys and the `locales` must be valid locale IDs.

#Example

// Create the collection
Players = new Mongo.Collection('players');

// Initialize the collation on the server
if (Meteor.isServer) {
  Players.collate({
    keys: ['name', 'lastName'],
    locales: ['tr-TR', 'de-DE']
  });
}

// Insert your data
Players.insert({
  name: 'Serkan',
  lastName: 'Durusoy'
});

// Fetch your data
Players.findOne();

/*
{
  name: 'Serkan',
  lastName: 'Durusoy',
  collators: {
    tr-TR: 'xxxxx',
    de-DE: 'xxxxx'
  }
}
*/

