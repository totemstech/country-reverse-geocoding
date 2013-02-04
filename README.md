country-reverse-geocoding
=========================

NodeJS module to reverse geocoding of countries.

## Installation

`npm install country-reverse-geocoding`

## How it works

The only method of this module is `get_country`:

`get_country(lat, lng, callback)`

Where `lat` and `lng` are the latitude and longitude of the point to be
reverse-geocoded and `callback` is a function being called once a result or
an error is found.
The `callback` returns with two parameters: an `Error` if something went wrong 
(`null` otherwise), and a `country` object.
The `country` object is `null` if the given point is not located in any country.
If it is located in a country, then the object has two attributes: `code`,
the country code, and `name`, the English name of this country.

```javascript
var crg = require('country-reverse-geocoding').country_reverse_geocoding();

crg.get_country(47.3, 0.7, function(err, country) {
  if(err) {
    console.log(err.message)
  }
  else {
    if(country) {
      console.log('This point is in ' + JSON.stringify(country.name));
    }
    else {
      console.log('This point is not located in any country');
    }
  }
});
```

### Options

The default GeoJSON file can be replaced by calling:

```javascript
var crg = require('country-reverse-geocoding').country_reverse_geocoding({
  country_geo_json = 'path/to/custom.geo.json'
});
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
