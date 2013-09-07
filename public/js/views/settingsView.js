/**
 * User: Troy
 * Date: 9/1/13
 * Time: 3:04 PM
 */


var app = app || {};

app.SettingsView = Backbone.View.extend({
  events: {
  },

  initialize: function() {
    console.log("SETTINGS VIEW initialize called");
  },
  render: function(){
    console.log("SETTINGS VIEW render called");
    app.changePage("#settingsPage", { reverse:false, changeHash:false, transition: "slide" });
  }
});