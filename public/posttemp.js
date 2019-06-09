(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['posttemp'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "        "
    + container.escapeExpression((helpers.reverseArray || (depth0 && depth0.reverseArray) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.replies : depth0),{"name":"reverseArray","hash":{},"data":data}))
    + "\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.replytemp,depth0,{"name":"replytemp","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"post-and-replies\">\r\n  <article class=\"post\" postId=\""
    + alias4(((helper = (helper = helpers.postId || (depth0 != null ? depth0.postId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postId","hash":{},"data":data}) : helper)))
    + "\">\r\n    <button type=\"button\" class=\"report-button\">Sink</button>\r\n    <div class=\"image\">\r\n      <img class=\"img\" src=\""
    + alias4(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data}) : helper)))
    + "\" />\r\n    </div>\r\n    <div class=\"content\">\r\n      <p class=\"text\">\r\n        "
    + alias4(((helper = (helper = helpers.txt || (depth0 != null ? depth0.txt : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"txt","hash":{},"data":data}) : helper)))
    + "\r\n      </p>\r\n    </div>\r\n    <br class=\"clear\">\r\n    <div class=\"post-buttons\">\r\n      <button type=\"button\" class=\"like-button\"><p class=\"like-number\">0</p> Like</button>\r\n      <button type=\"button\" class=\"reply-button\">Reply</button>\r\n      <button type=\"button\" class=\"view-button\">View Replies</button>\r\n    </div>\r\n  </article>\r\n  <div class=\"create-reply hide\">\r\n    <div class=\"create-reply-input\">\r\n      <textarea placeholder=\"New Reply text.\"></textarea>\r\n    </div>\r\n    <button type=\"button\" class=\"cancel-reply-button\">Cancel</button>\r\n    <button type=\"button\" class=\"create-reply-button\">Post Reply</button>\r\n  </div>\r\n  <div class=\"reply-container hide\">\r\n    <div class=\"hide\">\r\n"
    + ((stack1 = (helpers.checklength || (depth0 && depth0.checklength) || alias2).call(alias1,(depth0 != null ? depth0.replies : depth0),0,{"name":"checklength","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.replies : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\r\n</div>\r\n";
},"usePartial":true,"useData":true});
})();