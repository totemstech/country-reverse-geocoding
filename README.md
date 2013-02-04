country-reverse-geocoding
=========================

NodeJS module to reverse geocoding of countries.

## Installation

`npm install country-reverse-geocoding`

## How it works

The only method of this module is `get_country`:

`get_country(lat, lng)`

Where `lat` and `lng` are the latitude and longitude of the point to be
reverse-geocoded.
`get_country` returns:
* an `Error` if something went wrong
* `null` if the point is not in any country
* an object with two attributes: `code`, the country code, and `name`, the English name of this country

```javascript
var crg = require('country-reverse-geocoding').country_reverse_geocoding();

var country = crg.get_country(47.3, 0.7);

console.log(country.name); // France
```

## Tests

Install jasmine-node:

`npm install jasmine-node -g`

Then run

`jasmine-node spec/`

## More information

The GeoJSON specification: http://www.geojson.org/
The GeoJSON file used in this module comes from https://github.com/johan/world.geo.json

## License

Distributed under the MIT License.
