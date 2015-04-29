Package.describe({
  name: 'serkandurusoy:mongo-collate',
  version: '0.0.1',
  summary: 'Language based sorting and collations for mongo',
  git: 'https://github.com/serkandurusoy/meteor-mongo-collate',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('mongo-collate.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('serkandurusoy:mongo-collate');
  api.addFiles('mongo-collate-tests.js');
});
