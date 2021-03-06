/*!
 * jQuery UI Tabs @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
!function(e,t){function s(){return++a}function i(){return++n}var a=0,n=0;e.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:!1,cookie:null,// e.g. { expires: 7, path: '/', domain: 'jquery.com', secure: true }
collapsible:!1,disable:null,disabled:[],enable:null,event:"click",fx:null,// e.g. { height: 'toggle', opacity: 'toggle', duration: 200 }
idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(!0)},_setOption:function(e,t){if("selected"==e){if(this.options.collapsible&&t==this.options.selected)return;this.select(t)}else this.options[e]=t,this._tabify()},_tabId:function(e){return e.title&&e.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+s()},_sanitizeSelector:function(e){
// we need this because an id may contain a ":"
return e.replace(/:/g,"\\:")},_cookie:function(){var t=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+i());return e.cookie.apply(null,[t].concat(e.makeArray(arguments)))},_ui:function(e,t){return{tab:e,panel:t,index:this.anchors.index(e)}},_cleanup:function(){
// restore all former loading tabs labels
this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var t=e(this);t.html(t.data("label.tabs")).removeData("label.tabs")})},_tabify:function(s){
// Reset certain styles left over from animation
// and prevent IE's ClearType bug...
function i(t,s){t.css("display",""),!e.support.opacity&&s.opacity&&t[0].style.removeAttribute("filter")}var a=this,n=this.options,l=/^#.+/;// Safari 2 reports '#' for an empty hash
this.list=this.element.find("ol,ul").eq(0),this.lis=e(" > li:has(a[href])",this.list),this.anchors=this.lis.map(function(){return e("a",this)[0]}),this.panels=e([]),this.anchors.each(function(t,s){var i,o=e(s).attr("href"),r=o.split("#")[0];
// inline tab
if(r&&(r===location.toString().split("#")[0]||(i=e("base")[0])&&r===i.href)&&(o=s.hash,s.href=o),l.test(o))a.panels=a.panels.add(a.element.find(a._sanitizeSelector(o)));else if(o&&"#"!==o){
// required for restore on destroy
e.data(s,"href.tabs",o),
// TODO until #3808 is fixed strip fragment identifier from url
// (IE fails to load from such url)
e.data(s,"load.tabs",o.replace(/#.*$/,""));var h=a._tabId(s);s.href="#"+h;var u=a.element.find("#"+h);u.length||(u=e(n.panelTemplate).attr("id",h).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(a.panels[t-1]||a.list),u.data("destroy.tabs",!0)),a.panels=a.panels.add(u)}else n.disabled.push(t)}),
// initialization from scratch
s?(
// attach necessary classes for styling
this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"),this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.lis.addClass("ui-state-default ui-corner-top"),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"),
// Selected tab
// use "selected" option or try to retrieve:
// 1. from fragment identifier in url
// 2. from cookie
// 3. from selected class attribute on <li>
n.selected===t?(location.hash&&this.anchors.each(function(e,t){return t.hash==location.hash?(n.selected=e,!1):void 0}),"number"!=typeof n.selected&&n.cookie&&(n.selected=parseInt(a._cookie(),10)),"number"!=typeof n.selected&&this.lis.filter(".ui-tabs-selected").length&&(n.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))),n.selected=n.selected||(this.lis.length?0:-1)):null===n.selected&&(// usage of null is deprecated, TODO remove in next release
n.selected=-1),
// sanity check - default to first tab...
n.selected=n.selected>=0&&this.anchors[n.selected]||n.selected<0?n.selected:0,
// Take disabling tabs via class attribute from HTML
// into account and update option properly.
// A selected tab cannot become disabled.
n.disabled=e.unique(n.disabled.concat(e.map(this.lis.filter(".ui-state-disabled"),function(e,t){return a.lis.index(e)}))).sort(),-1!=e.inArray(n.selected,n.disabled)&&n.disabled.splice(e.inArray(n.selected,n.disabled),1),
// highlight selected tab
this.panels.addClass("ui-tabs-hide"),this.lis.removeClass("ui-tabs-selected ui-state-active"),
// check for length avoids error when initializing empty list
n.selected>=0&&this.anchors.length&&(a.element.find(a._sanitizeSelector(a.anchors[n.selected].hash)).removeClass("ui-tabs-hide"),this.lis.eq(n.selected).addClass("ui-tabs-selected ui-state-active"),
// seems to be expected behavior that the show callback is fired
a.element.queue("tabs",function(){a._trigger("show",null,a._ui(a.anchors[n.selected],a.element.find(a._sanitizeSelector(a.anchors[n.selected].hash))[0]))}),this.load(n.selected)),
// clean up to avoid memory leaks in certain versions of IE 6
// TODO: namespace this event
e(window).bind("unload",function(){a.lis.add(a.anchors).unbind(".tabs"),a.lis=a.anchors=a.panels=null})):n.selected=this.lis.index(this.lis.filter(".ui-tabs-selected")),
// update collapsible
// TODO: use .toggleClass()
this.element[n.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible"),
// set or update cookie after init and add/remove respectively
n.cookie&&this._cookie(n.selected,n.cookie);
// disable tabs
for(var o,r=0;o=this.lis[r];r++)e(o)[-1==e.inArray(r,n.disabled)||e(o).hasClass("ui-tabs-selected")?"removeClass":"addClass"]("ui-state-disabled");if(
// reset cache if switching from cached to not cached
n.cache===!1&&this.anchors.removeData("cache.tabs"),
// remove all handlers before, tabify may run on existing tabs after add or option change
this.lis.add(this.anchors).unbind(".tabs"),"mouseover"!==n.event){var h=function(e,t){t.is(":not(.ui-state-disabled)")&&t.addClass("ui-state-"+e)},u=function(e,t){t.removeClass("ui-state-"+e)};this.lis.bind("mouseover.tabs",function(){h("hover",e(this))}),this.lis.bind("mouseout.tabs",function(){u("hover",e(this))}),this.anchors.bind("focus.tabs",function(){h("focus",e(this).closest("li"))}),this.anchors.bind("blur.tabs",function(){u("focus",e(this).closest("li"))})}
// set up animations
var c,d;n.fx&&(e.isArray(n.fx)?(c=n.fx[0],d=n.fx[1]):c=d=n.fx);
// Show a tab...
var b=d?function(t,s){e(t).closest("li").addClass("ui-tabs-selected ui-state-active"),s.hide().removeClass("ui-tabs-hide").animate(d,d.duration||"normal",function(){i(s,d),a._trigger("show",null,a._ui(t,s[0]))})}:function(t,s){e(t).closest("li").addClass("ui-tabs-selected ui-state-active"),s.removeClass("ui-tabs-hide"),a._trigger("show",null,a._ui(t,s[0]))},f=c?function(e,t){t.animate(c,c.duration||"normal",function(){a.lis.removeClass("ui-tabs-selected ui-state-active"),t.addClass("ui-tabs-hide"),i(t,c),a.element.dequeue("tabs")})}:function(e,t,s){a.lis.removeClass("ui-tabs-selected ui-state-active"),t.addClass("ui-tabs-hide"),a.element.dequeue("tabs")};
// attach tab event handler, unbind to avoid duplicates from former tabifying...
this.anchors.bind(n.event+".tabs",function(){var t=this,s=e(t).closest("li"),i=a.panels.filter(":not(.ui-tabs-hide)"),l=a.element.find(a._sanitizeSelector(t.hash));
// If tab is already selected and not collapsible or tab disabled or
// or is already loading or click callback returns false stop here.
// Check if click handler returns false last so that it is not executed
// for a disabled or loading tab!
if(s.hasClass("ui-tabs-selected")&&!n.collapsible||s.hasClass("ui-state-disabled")||s.hasClass("ui-state-processing")||a.panels.filter(":animated").length||a._trigger("select",null,a._ui(this,l[0]))===!1)return this.blur(),!1;
// if tab may be closed
if(n.selected=a.anchors.index(this),a.abort(),n.collapsible){if(s.hasClass("ui-tabs-selected"))return n.selected=-1,n.cookie&&a._cookie(n.selected,n.cookie),a.element.queue("tabs",function(){f(t,i)}).dequeue("tabs"),this.blur(),!1;if(!i.length)
// TODO make passing in node possible, see also http://dev.jqueryui.com/ticket/3171
return n.cookie&&a._cookie(n.selected,n.cookie),a.element.queue("tabs",function(){b(t,l)}),a.load(a.anchors.index(this)),this.blur(),!1}
// show new tab
if(n.cookie&&a._cookie(n.selected,n.cookie),!l.length)throw"jQuery UI Tabs: Mismatching fragment identifier.";i.length&&a.element.queue("tabs",function(){f(t,i)}),a.element.queue("tabs",function(){b(t,l)}),a.load(a.anchors.index(this)),
// Prevent IE from keeping other link focussed when using the back button
// and remove dotted border from clicked link. This is controlled via CSS
// in modern browsers; blur() removes focus from address bar in Firefox
// which can become a usability and annoying problem with tabs('rotate').
e.browser.msie&&this.blur()}),
// disable click in any case
this.anchors.bind("click.tabs",function(){return!1})},_getIndex:function(e){
// meta-function to give users option to provide a href string instead of a numerical index.
// also sanitizes numerical indexes to valid values.
return"string"==typeof e&&(e=this.anchors.index(this.anchors.filter("[href$='"+e+"']"))),e},destroy:function(){var t=this.options;return this.abort(),this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"),this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.anchors.each(function(){var t=e.data(this,"href.tabs");t&&(this.href=t);var s=e(this).unbind(".tabs");e.each(["href","load","cache"],function(e,t){s.removeData(t+".tabs")})}),this.lis.unbind(".tabs").add(this.panels).each(function(){e.data(this,"destroy.tabs")?e(this).remove():e(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))}),t.cookie&&this._cookie(null,t.cookie),this},add:function(s,i,a){a===t&&(a=this.anchors.length);var n=this,l=this.options,o=e(l.tabTemplate.replace(/#\{href\}/g,s).replace(/#\{label\}/g,i)),r=s.indexOf("#")?this._tabId(e("a",o)[0]):s.replace("#","");o.addClass("ui-state-default ui-corner-top").data("destroy.tabs",!0);
// try to find an existing element before creating a new one
var h=n.element.find("#"+r);return h.length||(h=e(l.panelTemplate).attr("id",r).data("destroy.tabs",!0)),h.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"),a>=this.lis.length?(o.appendTo(this.list),h.appendTo(this.list[0].parentNode)):(o.insertBefore(this.lis[a]),h.insertBefore(this.panels[a])),l.disabled=e.map(l.disabled,function(e,t){return e>=a?++e:e}),this._tabify(),1==this.anchors.length&&(l.selected=0,o.addClass("ui-tabs-selected ui-state-active"),h.removeClass("ui-tabs-hide"),this.element.queue("tabs",function(){n._trigger("show",null,n._ui(n.anchors[0],n.panels[0]))}),this.load(0)),this._trigger("add",null,this._ui(this.anchors[a],this.panels[a])),this},remove:function(t){t=this._getIndex(t);var s=this.options,i=this.lis.eq(t).remove(),a=this.panels.eq(t).remove();
// If selected tab was removed focus tab to the right or
// in case the last tab was removed the tab to the left.
return i.hasClass("ui-tabs-selected")&&this.anchors.length>1&&this.select(t+(t+1<this.anchors.length?1:-1)),s.disabled=e.map(e.grep(s.disabled,function(e,s){return e!=t}),function(e,s){return e>=t?--e:e}),this._tabify(),this._trigger("remove",null,this._ui(i.find("a")[0],a[0])),this},enable:function(t){t=this._getIndex(t);var s=this.options;if(-1!=e.inArray(t,s.disabled))return this.lis.eq(t).removeClass("ui-state-disabled"),s.disabled=e.grep(s.disabled,function(e,s){return e!=t}),this._trigger("enable",null,this._ui(this.anchors[t],this.panels[t])),this},disable:function(e){e=this._getIndex(e);var t=this.options;
// cannot disable already selected tab
return e!=t.selected&&(this.lis.eq(e).addClass("ui-state-disabled"),t.disabled.push(e),t.disabled.sort(),this._trigger("disable",null,this._ui(this.anchors[e],this.panels[e]))),this},select:function(e){if(e=this._getIndex(e),-1==e){if(!this.options.collapsible||-1==this.options.selected)return this;e=this.options.selected}return this.anchors.eq(e).trigger(this.options.event+".tabs"),this},load:function(t){t=this._getIndex(t);var s=this,i=this.options,a=this.anchors.eq(t)[0],n=e.data(a,"load.tabs");
// not remote or from cache
if(this.abort(),!n||0!==this.element.queue("tabs").length&&e.data(a,"cache.tabs"))return void this.element.dequeue("tabs");if(
// load remote from here on
this.lis.eq(t).addClass("ui-state-processing"),i.spinner){var l=e("span",a);l.data("label.tabs",l.html()).html(i.spinner)}
// last, so that load event is fired before show...
return this.xhr=e.ajax(e.extend({},i.ajaxOptions,{url:n,success:function(n,l){s.element.find(s._sanitizeSelector(a.hash)).html(n),
// take care of tab labels
s._cleanup(),i.cache&&e.data(a,"cache.tabs",!0),s._trigger("load",null,s._ui(s.anchors[t],s.panels[t]));try{i.ajaxOptions.success(n,l)}catch(o){}},error:function(e,n,l){
// take care of tab labels
s._cleanup(),s._trigger("load",null,s._ui(s.anchors[t],s.panels[t]));try{
// Passing index avoid a race condition when this method is
// called after the user has selected another tab.
// Pass the anchor that initiated this request allows
// loadError to manipulate the tab content panel via $(a.hash)
i.ajaxOptions.error(e,n,t,a)}catch(l){}}})),s.element.dequeue("tabs"),this},abort:function(){
// stop possibly running animations
// "tabs" queue must not contain more than two elements,
// which are the callbacks for the latest clicked tab...
// terminate pending requests from other tabs
// take care of tab labels
return this.element.queue([]),this.panels.stop(!1,!0),this.element.queue("tabs",this.element.queue("tabs").splice(-2,2)),this.xhr&&(this.xhr.abort(),delete this.xhr),this._cleanup(),this},url:function(e,t){return this.anchors.eq(e).removeData("cache.tabs").data("load.tabs",t),this},length:function(){return this.anchors.length}}),e.extend(e.ui.tabs,{version:"@VERSION"}),/*
 * Tabs Extensions
 */
/*
 * Rotate
 */
e.extend(e.ui.tabs.prototype,{rotation:null,rotate:function(e,t){var s=this,i=this.options,a=s._rotate||(s._rotate=function(t){clearTimeout(s.rotation),s.rotation=setTimeout(function(){var e=i.selected;s.select(++e<s.anchors.length?e:0)},e),t&&t.stopPropagation()}),n=s._unrotate||(s._unrotate=t?function(e){a()}:function(e){e.clientX&&// in case of a true click
s.rotate(null)});
// start rotation
return e?(this.element.bind("tabsshow",a),this.anchors.bind(i.event+".tabs",n),a()):(clearTimeout(s.rotation),this.element.unbind("tabsshow",a),this.anchors.unbind(i.event+".tabs",n),delete this._rotate,delete this._unrotate),this}})}(jQuery);