var crg = require('../lib/country_reverse_geocoding.js')
          .country_reverse_geocoding();

describe("Country reverse geocoding", function() {
  var flag, results;

  it("should return an error if coordinates are not accurate", function() {
    var results = crg.get_country('foo', 'bar');

    expect(results instanceof Error).toBe(true);
  });

  it("should return information about a country", function() {
    var results = crg.get_country(47.3, 0.7);

    expect(typeof results).toBe('object');
    expect(typeof results.code).not.toBe('undefined');
    expect(typeof results.name).not.toBe('undefined');
    // This particular point should be in France
    expect(results.code).toBe('FRA');
  });

  it("should return null if no country was matched", function() {
    var results = crg.get_country(55.5, -30.9);

    expect(results).toBe(null);
  });
});
