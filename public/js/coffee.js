/**
 * User: Troy
 * Date: 4/30/13
 * Time: 9:15 PM
 */

var app = app || {};

app.Coffee = (function () {
  var source = $("#listing-template").html(),
    template = Handlebars.compile(source),
    apiKey = "295629e29b02e54009da5ef31a373c8d",
    term = "coffee",
    numListing = 20,

    currentPage = 1,
    listings = null,
    results = null,
    totalPages = 0,
    totalAvailable = 0,
    location = "90023",
    fetch = function (callback) {
      var radius = app.Config.searchRadius;

      $.ajax({
        url: "http://api2.yp.com/listings/v1/search?searchloc=" + location + "&pagenum=" + currentPage + "&term=" + term + "&format=json&sort=distance&radius=" + radius + "&listingcount=" + numListing + "&key=" + apiKey,
        dataType: "JSONP"
      }).done(function (data) {
          var meta;
          console.log("Starting next finished");
          if (data && data.searchResult && data.searchResult.metaProperties) {
            meta = data.searchResult.metaProperties;

            if (meta.resultCode === "Success") {
              totalAvailable = meta.totalAvailable;
              totalPages = Math.ceil(totalAvailable / numListing);
              var temp = data.searchResult.searchListings.searchListing;
              listings = temp.concat(listings);
              results = data.searchResult;

              if (callback) {
                callback(listings);
              }
            }
          }
        });
    };

  return {
    getBusiness: function (id) {
      var item, ndx,
        results = null,
        list = listings,
        len = list.length;
      id = +id;
      for (ndx = 0; ndx < len; ndx += 1) {
        item = list[ndx];
        if (item.listingId === id) {
          results = item;
          break;
        }
      }
      return results;
    },
    previousListings: function () {

    },
    nextListings: function () {

    },
    showCurrentListing: function (listingId) {
      var stripPageNum = function (that) {
        var pageNum = +$(that).attr("href").replace("#", "");
        return pageNum;
      };
      $("#" + listingId).html(template({listings: listings})).trigger("create");
    },
    getBusinesses: function () {
      return listings;
    },
    next: function (callback) {
      if (currentPage < totalPages) {
        currentPage++;
        fetch(callback);
      }
    },
    get: function (options, callback) {

      if (options) {
        currentPage = options.currentPage || currentPage;
        location = options.location || location;
      }

      if (app.Config.useZipCode === "on") {
        location = app.Config.zipCode;
      }

      listings = [];
      fetch(callback);
    }
  };
})();