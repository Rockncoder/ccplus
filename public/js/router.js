/**
 * User: Troy
 * Date: 9/1/13
 * Time: 2:38 PM
 */

$(function () {
  app.currentPage = "#" + $.mobile.activePage[0].id;
  app.CurrentListing = 0;
  app.Templates = {
    detail: Handlebars.compile($("#detail-template").html())
  };
  app.Config = {
    zipCode: "90023",
    useZipCode: false,
    searchRadius: 10
  };

  app.Dimensions = (function () {
    var width, height, headerHeight, footerHeight, contentHeight,
      isIPhone = (/iphone/gi).test(navigator.appVersion);
    return {
      get: function () {
        width = $(window).width();
        height = $(window).height() + (isIPhone ? 60 : 0);
        headerHeight = $("header", $.mobile.activePage).height() || 0;
        footerHeight = $("footer", $.mobile.activePage).height() || 0;
        contentHeight = height - headerHeight - footerHeight;

        return {
          width: width,
          height: contentHeight
        };
      }
    };
  }());

  app.changePage = function(selector, options) {
    if(selector !== "#" + $.mobile.activePage.attr('id')) {
      app.currentPage = selector;
      $.mobile.changePage(selector, options);
    }
  };

  app.Router = Backbone.Router.extend({
    routes:{
      "":'listings',
      "listings":"listings",
      "map":"map",
      "settings":"settings",
      "about":"about",
      "detail":"detail"
    },
    initialize: function(el) {
      console.log("Hola Router");
      this.listingsView =  new app.ListingsView();
      this.mapView =  new app.MapView();
      this.settingsView =  new app.SettingsView();
      this.aboutView =  new app.AboutView();
      this.detailView =  new app.DetailView();
      var dim = app.Dimensions.get();
      $('section[data-role="content"]').height(dim.height);
    },
    listings:function () {
      console.log("The LISTINGS page");
      this.listingsView.render();
    },
    map:function () {
      console.log("The MAP page");
      this.mapView.render();
    },
    settings:function () {
      console.log("The SETTINGS page");
      this.settingsView.render();
    },
    about:function () {
      console.log("The CREDITS page");
      this.aboutView.render();
      $.mobile.changePage("#aboutPage", { reverse:false, changeHash:false, transition: "slide" });
    },
    detail: function() {
      console.log("The DETAIL page");
      this.detailView.render();
      $.mobile.changePage("#detailPage", { reverse:false, changeHash:false, transition: "slide" });
    }
  });
  new app.Router;
  Backbone.history.start();
});