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
    expect(typeof results.id).not.toBe('undefined');
    expect(typeof results.code).not.toBe('undefined');
    expect(typeof results.name).not.toBe('undefined');
    // This particular point should be in France
    expect(results.id).toBe('FRA');
    expect(results.code).toBe('FR');

    results = crg.get_country(1.352083 , 103.819836);
    expect(results.id).toBe('SGP');
    expect(results.code).toBe('SG')
  });

  it("should return null if no country was matched", function() {
    var results = crg.get_country(55.5, -30.9);
    expect(results).toBe(null);
  });

  it("should return information about a us state", function() {
    var results = crg.get_us_state(32.377447, -86.300942);

    expect(typeof results).toBe('object');
    expect(typeof results.id).not.toBe('undefined');
    expect(typeof results.name).not.toBe('undefined');
    // This particular point should be in Alabama
    expect(results.id).toBe('USA-AL');
  });

  it("should return null if no state was matched", function() {
    var results = crg.get_us_state(55.5, -30.9);
    expect(results).toBe(null);
  });

  it("should return correct us state results", function() {
    expect(crg.get_us_state(32.377447, -86.300942).id).toBe('USA-AL');
    expect(crg.get_us_state(58.302197, -134.410467).id).toBe('USA-AK');
    expect(crg.get_us_state(33.448097, -112.097094).id).toBe('USA-AZ');
    expect(crg.get_us_state(34.746758, -92.288761).id).toBe('USA-AR');
    expect(crg.get_us_state(38.576572, -121.493411).id).toBe('USA-CA');
    expect(crg.get_us_state(38.186778, -84.875333).id).toBe('USA-KY');
    expect(crg.get_us_state(30.457072, -91.187406).id).toBe('USA-LA');
    expect(crg.get_us_state(44.307236, -69.781678).id).toBe('USA-ME');
    expect(crg.get_us_state(35.682281, -105.939658).id).toBe('USA-NM');
    expect(crg.get_us_state(35.780278, -78.639167).id).toBe('USA-NC');
    expect(crg.get_us_state(46.820814, -100.782742).id).toBe('USA-ND');
    expect(crg.get_us_state(44.938731, -123.030097).id).toBe('USA-OR');
    expect(crg.get_us_state(41.830833, -71.415).id).toBe('USA-RI');
  });

});
