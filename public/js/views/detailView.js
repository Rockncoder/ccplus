/**
 * User: Troy
 * Date: 9/6/13
 * Time: 6:09 AM
 */

var app = app || {};

app.DetailView = Backbone.View.extend({
  $detail: null,
  mapElement: null,

  map: null,
  options: {
    mapTypeControl: false,
    streetViewControl: false,
    center: null,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  },

  events: {
  },

  initialize: function () {
    console.log("DETAIL VIEW initialize called");
    this.$detail = $("#detailContent");
    this.mapElement = $("#miniMap").get(0);
  },
  render: function () {
    console.log("DETAIL VIEW render called");

    /* set the CSS height dynamically */
    var info = app.Coffee.getBusiness(app.CurrentListing),
      divHeight, totalHeight, ctr, marker,
      infoWindow = new google.maps.InfoWindow({}),
      dim = app.Dimensions.get();

    this.$detail.html(app.Templates.detail(info)).trigger("create");
    divHeight = this.$detail.height();
    totalHeight = dim.height - divHeight - 32;
    $("#miniMap").css('height', totalHeight);
    ctr = new google.maps.LatLng(info.latitude, info.longitude);
    this.options.center = ctr;
    this.map = new google.maps.Map(this.mapElement, this.options);
    marker = new google.maps.Marker({
      position: ctr,
      map: this.map
    });
    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker);
    });
  }
});

//App.Pages.detailPage = (function () {
//  var map,
//    latLong = new google.maps.LatLng(34.0522, -118.2428),
//    mapElement = $("#miniMap").get(0),
//    options = {
//      mapTypeControl: false,
//      streetViewControl: false,
//      center: latLong,
//      zoom: 13,
//      mapTypeId: google.maps.MapTypeId.ROADMAP
//    },
//    $detail = $("#detailContent");
//  return {
//    pageshow: function () {
//      /* set the CSS height dynamically */
//      var info = App.Coffee.getBusiness(App.CurrentListing),
//        divHeight, totalHeight, ctr, marker,
//        infoWindow = new google.maps.InfoWindow({}),
//        dim = App.Dimensions.get();
//
//      $detail.html(App.Templates.detail(info)).trigger("create");
//      divHeight = $detail.height();
//      totalHeight = dim.height - divHeight - 32;
//      $("#miniMap").css('height', totalHeight);
//      ctr = new google.maps.LatLng(info.latitude, info.longitude);
//      options.center = ctr;
//      map = new google.maps.Map(mapElement, options);
//      marker = new google.maps.Marker({
//        position: ctr,
//        map: map
//      });
//      google.maps.event.addListener(marker, 'click', function () {
//        infoWindow.open(map, marker);
//      });
//    },
//    pagehide: function () {
//    }
//  };
//}());
