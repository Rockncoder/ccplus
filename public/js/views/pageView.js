/**
 * User: Troy
 * Date: 9/5/13
 * Time: 8:30 PM
 */


var app = app || {};

var PageView = Backbone.View.extend({
  initialize: function(options) {
    this.template = options.template;
  },
  render: function() {
    var content = $(this.template).html();
    $(this.el).html(content);
    return this;
  }
});