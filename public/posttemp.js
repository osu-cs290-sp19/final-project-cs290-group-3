(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['posttemp'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"post\">\r\n  <div class=\"image\">\r\n    <img class=\"img\" src=\""
    + alias4(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data}) : helper)))
    + "\" />\r\n  </div>\r\n  <div class=\"content\">\r\n    <p class=\"text\">\r\n      "
    + alias4(((helper = (helper = helpers.txt || (depth0 != null ? depth0.txt : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"txt","hash":{},"data":data}) : helper)))
    + "\r\n    </p>\r\n  </div>\r\n</article>\r\n";
},"useData":true});
})();