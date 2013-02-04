var crg = require('../lib/country_reverse_geocoding.js')
          .country_reverse_geocoding();

describe("Country reverse geocoding", function() {
  var flag, results;

  it("should return an error if coordinates are not accurate", function() {
    runs(function() {
      flag = false;
      crg.get_country('foo', 'bar', function(err, country) {
        results = {
          err: err,
          country: country
        };
        flag = true;
      });
    });

    waitsFor(function() {
      return flag;
    }, "Result should be returned", 500);
    
    runs(function() {
      expect(results.err).not.toBe(null);
      expect(results.err instanceof Error).toBe(true);
      expect(typeof results.country).toBe('undefined');
    });
  });

  it("should return information about a country", function() {
    runs(function() {
      flag = false;
      crg.get_country(47.3, 0.7, function(err, country) {
        results = {
          err: err,
          country: country
        };
        flag = true;
      });
    });

    waitsFor(function() {
      return flag;
    }, "Result should be returned", 500);
    
    runs(function() {
      expect(results.err).toBe(null);
      expect(typeof results.country).toBe('object');
      expect(typeof results.country.code).not.toBe('undefined');
      expect(typeof results.country.name).not.toBe('undefined');
      // This particular point should be in France
      expect(results.country.code).toBe('FRA');
    });
  });

  it("should return null if no country was matched", function() {
    runs(function() {
      flag = false;
      // Somewhere in the Atlantic Ocean
      crg.get_country(55.5, -30.9, function(err, country) {
        results = {
          err: err,
          country: country
        };
        flag = true;
      });
    });

    waitsFor(function() {
      return flag;
    }, "Result should be returned", 500);
    
    runs(function() {
      expect(results.err).toBe(null);
      expect(results.country).toBe(null);
    });
  });
});