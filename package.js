Package.describe({
  name: 'serkandurusoy:mongo-collate',
  version: '0.0.1',
  summary: 'Language based sorting and collations for mongo',
  git: 'https://github.com/serkandurusoy/meteor-mongo-collate',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  Npm.depends({
    ilib: "11.0.2"
  });

  api.versionsFrom('1.0');

  api.use('underscore','server');
  api.use('check','server');
  api.use('mongo','server');
  api.use('matb33:collection-hooks@0.7.13','server');

  api.addFiles('libs.js', 'server');
  api.addFiles('mongo-collate.js', 'server');

});
