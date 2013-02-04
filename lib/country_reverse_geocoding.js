var fwk = require('fwk');
var fs = require('fs');
var path = require('path');

/**
 * Reverse geocoding for countries
 *
 * @param spec { country_geo_json }
 */
var country_reverse_geocoding = function(spec, my) {
  var _super = {};
  my = my || {};
  spec = spec || {};

  my.country_geo_json = spec.country_geo_json || 'data/countries.geo.json';

  // public
  var get_country;                  /* get_country(lat, lng);                 */

  // private
  var point_in_poly;                /* point_in_poly(polygon, point)          */

  var that = {};

  /*******************************/
  /*       Private helpers       */
  /*******************************/

  /**
   * Checks if a point is contained in a polygon
   * (based on the Jordan curve theorem), for more info:
   * http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
   * @param polygon array a series of the polygon's coordinates
   * @param point object representing the point's coordinates
   * @return boolean true if the point lies within the polygon, false otherwise
   */
   point_in_polygon = function(polygon, point) {
    var nvert = polygon.length;
    var c = false;
    var i = 0;
    var j = 0;
    for(i = 0, j = nvert-1; i < nvert; j = i++) {
      if( ((polygon[i][1] > point[1]) != (polygon[j][1] > point[1])) && 
         (point[0] < (polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]) ) {
        c = !c;
      }
    }
    return c;
   };

  /*****************************/
  /*      Public functions     */
  /*****************************/

  /**
   * Get country information from coordinates
   * @param lat number latitude
   * @param lng number longitude
   * @return cb_ function (err, { code: '', name: ''}) 
   *             information about a country, null if not in a country
   */
  get_country = function(lat, lng, cb_) {
    if(typeof lat !== 'number' || typeof lng!== 'number') {
      return cb_(new Error('Wrong coordinates (' + lat + ',' + lng + ')'));
    }

    fs.readFile(path.resolve(my.country_geo_json), 'utf8',
      function(err, data) {
      if(err) {
        return cb_(err);
      }
      else {
        try{
          var country_data = JSON.parse(data).features;
          var point = [lng, lat];
          var i = 0;
          fwk.async.until(function() {
            var country = country_data[i];
            if(country.geometry.type === 'Polygon') {
              return point_in_polygon(country.geometry.coordinates[0], point);
            }
            else if(country.geometry.type === 'MultiPolygon') {
              var j = 0;
              var found = false;
              do {
                found = point_in_polygon(country.geometry.coordinates[j][0], point);
                j++;
              } while (j < country.geometry.coordinates.length && !found);

              return found;
            }
          }, function(pcb_) {
            i++;
            if(i < country_data.length) {
              pcb_();
            }
            else {
              pcb_(true);
            }
          }, function(err) {
            if(err) {
              return cb_(null, null);
            }
            else {
              return cb_(null, {
                code: country_data[i].id,
                name: country_data[i].properties.name
              });
            }
          });
        }
        catch(err) {
          return cb_(err);
        }
      }
    }); 
  };

  fwk.method(that, 'get_country', get_country, _super);

  return that;
};

exports.country_reverse_geocoding = country_reverse_geocoding;
