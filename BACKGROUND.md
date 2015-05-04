# Very early WIP. Don't use!

Language based sorting and collations for mongo.

Currently, mongodb's native sorting is English based and case sensitive. But for
most apps out there, this type of sorting is just unnatural and often misleading.

In the actual real life world of sorting,

* Case does not matter
* Every language has its own understanding of how the alphabet gets sorted

To translate that to computer world, [CLDR](http://cldr.unicode.org/index/cldr-spec/collation-guidelines)
has been created and [ICU Organization](http://site.icu-project.org/) have moved on to
organize projects around the [Unicode Collation Algorithm](http://www.unicode.org/reports/tr10/).

The whole idea acts on the premise of allowing computers to sort a set of
natural language strings according to the rules of any given language, and that
same set can be ordered differently for each language.

To achieve this, the algorithm for the locale gets applied to a string which returns
a random looking, but very actionable short string made up of numbers. When sorted,
that string represents the natural sort order of the original string in that
language. These are what we call *sort keys*.

While there are outstanding feature requests [SERVER-90](https://jira.mongodb.org/browse/SERVER-90)
from 2009 and [SERVER-1920](https://jira.mongodb.org/browse/SERVER-1920) from 2010,
there has not been much official response from mongodb developers.

The best solution that the community have come up with was to store the sort keys
along with the original data, and apply the sorting on them instead. And this package
does exactly that for the keys and languages on selected collections.

Currently, the only javascript library that can transform any given string to its
sort key in a given language, is the [ilib library](https://www.npmjs.com/package/ilib)
for which, the [meteor wrapper](https://atmospherejs.com/serkandurusoy/ilib)
has been published on atmosphere to the very purpose.

TODO:

- [ ] Spread the word and get contributors on board, perhaps hand this over to
      one of those more organized meteor i18n initiatives
- [ ] Write some tests
- [ ] Factor out a custom build from ilib so that we only get what we need (sortkey)
- [ ] Ability to create sort keys on the client

