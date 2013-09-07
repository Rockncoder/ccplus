/**
 * User: Troy
 * Date: 9/1/13
 * Time: 3:03 PM
 */

var app = app || {};

app.ListingsView = Backbone.View.extend({
  myScroll: null,
  pullDownHeight: 0,
  $pullDown: null,
  $pullDownLabel: null,

  callRefresh: function () {
    app.Coffee.next(function () {
      var $psScroller = $('#psScroller');

      /* remove the loading spinner */
      $.mobile.loading("hide");
      /* load the new listing */
      app.Coffee.showCurrentListing("psScroller");
      isShowingListings = true;

      /* dynamically adjust the height of the scrollable region */
      $psScroller.find("ul").css('margin', 0);
      var $rows = $psScroller.find("ul > li"), $refresh = $psScroller.find('> div');
      $psScroller.height($rows.eq(0).outerHeight() * $rows.length + $refresh.outerHeight());

      /* set a click event on each row  */
      $(".listing").off().on("click", function () {
        app.CurrentListing = this.attributes.getNamedItem("data-rnc-listingid").value;
      });
    });
  },


  events: {
  },

  initialize: function () {
    console.log("LISTINGS initialize called");
  },
  render: function () {
    app.changePage("#pageScroll", { reverse: false, changeHash: false, transition: "slide" });
    console.log("LISTINGS render called");
    var dim = app.Dimensions.get();
    $("#psWrapper").css('height', dim.height);
    this.showListings();
  },
  showListings: function () {
    var that = this;

    $.mobile.loading("show");
    if (app.Location.isEnabled()) {
      if (app.Location.hasSet()) {
        var loc = app.Location.get();
        that.getListings({location: loc.latitude + ":" + loc.longitude});
      } else {
        $(window).one("rnc_position", function (evt, latitude, longitude, accuracy) {
          that.getListings({location: latitude + ":" + longitude});
        });
      }
    } else {
      that.getListings({location: App.Config.zipCode})
    }
  },
  getListings: function (location) {
    var that = this;

    app.Coffee.get(location, function () {
      var $psScroller = $('#psScroller');

      /* remove the loading spinner */
      $.mobile.loading("hide");
      /* load the new listing */
      app.Coffee.showCurrentListing("psScroller");
      isShowingListings = true;

      /* dynamically adjust the height of the scrollable region */
      $psScroller.find("ul").css('margin', 0);
      var $rows = $psScroller.find("ul > li"), $refresh = $psScroller.find('> div');
      $psScroller.height($rows.eq(0).outerHeight() * $rows.length + $refresh.outerHeight());

      /* set a click event on each row  */
      $(".listing").off().on("click", function () {
        app.CurrentListing = this.attributes.getNamedItem("data-rnc-listingid").value;
      });

      if (!that.myScroll) {
        that.$pullDown = $('#pullDown');
        that.$pullDownLabel = that.$pullDown.find('.pullDownLabel');
        that.pullDownHeight = $refresh.outerHeight();

        that.myScroll = new iScroll('psWrapper', {
            topOffset: that.pullDownHeight,
            useTransition: true,
            hScrollbar: false,
            vScrollbar: false,
            onRefresh: function () {
              if (that.$pullDown.hasClass('loading')) {
                that.$pullDown.removeClass();
                that.$pullDownLabel.html('Pull down to refresh...');
              }
            },
            onScrollMove: function () {
              if (this.y > 5 && !that.$pullDown.hasClass('flip')) {
                that.$pullDown.addClass('flip');
                that.$pullDownLabel.html('Release to refresh...');
                this.minScrollY = 0;
              } else if (this.y < 5 && that.$pullDown.hasClass('flip')) {
                that.$pullDown.removeClass();
                that.$pullDownLabel.html('Pull down to refresh...');
                this.minScrollY = -that.pullDownHeight;
              }
            },
            onScrollEnd: function () {
              if (that.$pullDown.hasClass('flip')) {
                that.$pullDown.removeClass();
                that.$pullDown.addClass('loading');
                that.$pullDownLabel.html('Loading...')
                that.callRefresh();
              }
            }
          }
        );
      }
    });
  }
});

