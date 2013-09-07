/**
 * User: Troy
 * Date: 9/1/13
 * Time: 3:04 PM
 */


var app = app || {};

app.AboutView = Backbone.View.extend({
  events: {
  },

  initialize: function() {
    console.log("ABOUT VIEW initialize called");
  },
  render: function(){
    console.log("ABOUT VIEW render called");
    app.changePage("#aboutPage", { reverse:false, changeHash:false, transition: "slide" });
  }
});
