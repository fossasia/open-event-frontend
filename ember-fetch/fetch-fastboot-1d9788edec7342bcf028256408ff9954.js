define("fetch",["exports"],function(t){var e=/^https?:\/\//,r=/^\/\//,o=FastBoot.require("abortcontroller-polyfill/dist/cjs-ponyfill"),n=FastBoot.require("node-fetch")
function s(t){if(null===t)throw new Error("Trying to fetch with relative url but ember-fetch hasn't finished loading FastBootInfo, see details at https://github.com/ember-cli/ember-fetch#relative-url")
const e="undefined:"===t.protocol?"http:":t.protocol
return[t.get("host"),e]}function l(t){if(r.test(t)){let[e]=s(i)
t=e+t}else if(!e.test(t)){let[e,r]=s(i)
t=r+"//"+e+t}return t}var i=null
t.default=function(t,e){return t&&t.href?t.url=l(t.href):"string"==typeof t&&(t=l(t)),n(t,e)},t.setupFastboot=function(t){i=t},t.Request=class extends n.Request{constructor(t,e){"string"==typeof t?t=l(t):t&&t.href&&(t=l(t.href)),super(t,e)}},t.Headers=n.Headers,t.Response=n.Response,t.AbortController=o.AbortController})

//# sourceMappingURL=fetch-fastboot-62c4ed8a476033a0619635fcb3ff75cd.map