define("~fastboot/app-factory",["open-event-frontend/app","open-event-frontend/config/environment"],function(e,t){return e=e.default,t=t.default,{default:function(){return e.create(t.APP)}}}),define("open-event-frontend/initializers/ajax",["exports"],function(e){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
e.default={name:"ajax-service",initialize:function(){}}}),define("open-event-frontend/initializers/error-handler",["exports"],function(e){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t={name:"error-handler",initialize:function(){Ember.onerror||(Ember.onerror=function(e){var t="There was an error running your app in fastboot. More info about the error: \n ".concat(e.stack||e)
console.error(t)})}}
e.default=t}),define("open-event-frontend/instance-initializers/ember-data-storefront",["exports"],function(e){"use strict"
function t(e){var t=e.lookup("service:fastboot").get("shoebox"),n=e.lookup("service:storefront")
t.put("ember-data-storefront",{get created(){return n.get("fastbootShoeboxCreated")},get queries(){return n.get("fastbootDataRequests")}})}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=t,e.default=void 0
var n={name:"ember-data-storefront",initialize:t}
e.default=n}),define("open-event-frontend/instance-initializers/setup-fetch",["exports","fetch"],function(e,t){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"fetch",initialize:function(e){var n=e.lookup("service:fastboot");(0,t.setupFastboot)(n.get("request"))}}
e.default=n})

//# sourceMappingURL=open-event-frontend-fastboot-9e64e388457fafbc3c026b4bb5b17419.map