/**
 * User: Troy
 * Date: 9/1/13
 * Time: 3:04 PM
 */


var app = app || {};

app.MapView = Backbone.View.extend({
  map: null,
  marker: null,
  markers: [],
  scale: [
    0, 0, 0, 0, 15, 15, 15, 15, 15, 15,
    15, 14, 14, 14, 14, 14, 14, 14, 13, 13,
    13, 13, 13, 13, 13, 12, 12, 12, 12, 12,
    12, 12, 11, 11, 11, 11, 11, 11, 11, 11,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
  ],
  mapElement: $("#map").get(0),

  events: {
    'click #mapPageHome': 'centerMap'
  },

  initialize: function() {
    console.log("MAP VIEW initialize called");
    this.mapElement =   $("#map").get(0);
  },
  render: function(){
    console.log("MAP VIEW render called");
    app.changePage("#mapPage", { reverse:false, changeHash:false, transition: "slide" });
//    /* set the CSS height dynamically */
    var dim = app.Dimensions.get();
    $("#map").css('height', dim.height);

    if (app.Location.isEnabled()) {
      this.showMap(app.Location.get());
    } else {
      app.Location.codeAddress(app.Config.zipCode, function (loc) {
        if (loc) {
          console.log("codeAddress returned " + JSON.stringify(loc));
          this.showMap(loc);
        }
      });
    }
  },
  centerMap: function(evt){
    evt.preventDefault();
    debugger;
  },
  getOptions: function (radius) {
    return {
      mapTypeControl: false,
      streetViewControl: false,
      zoom: this.scale[(radius - 1) % 50],
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  },
  drawMarkers: function (map, listings) {
    var marker, biz, ndx, len = listings.length;
    for (ndx = 0; ndx < len; ndx += 1) {
      biz = listings[ndx];
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(biz.latitude, biz.longitude),
        map: map,
        bizId: biz.listingId,
        title: biz.businessName
      });
      this.markers.push(marker);
      google.maps.event.addListener(marker, 'tap', function (evt) {
        app.CurrentListing = this.bizId;
        app.changePage("#detail", {transition: "slide"});
      });
    }
  },
  eraseMarkers: function (map) {
    while (this.markers && this.markers.length) {
      this.marker = this.markers.pop();
      this.marker.setMap(null);
      console.log("marker = " + this.marker.title + ", " + this.marker.bizId);
    }
  },
  updateMap: function (map) {
    var listings = app.Coffee.getBusinesses();
    if (listings) {
      this.drawMarkers(map, listings);
    }
  },
  showMap: function (loc) {
    var that = this,
      options = this.getOptions(app.Config.searchRadius);
    options.center = new google.maps.LatLng(loc.latitude, loc.longitude);
    if(!this.map) {
      that.map = new google.maps.Map(this.mapElement, options);
    }

//    $("#mapPageHome").on("tap click", function (evt) {
//      var loc = app.Location.get();
//      that.map.setCenter(new google.maps.LatLng(loc.latitude, loc.longitude));
//    });
    /* draw markers on the map */
    this.eraseMarkers(that.map);
    this.updateMap(that.map);
  }
});
