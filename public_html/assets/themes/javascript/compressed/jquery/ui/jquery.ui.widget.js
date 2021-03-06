/*!
 * jQuery UI Widget @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
!function(t,e){
// jQuery 1.4+
if(t.cleanData){var i=t.cleanData;t.cleanData=function(e){for(var n,s=0;null!=(n=e[s]);s++)try{t(n).triggerHandler("remove")}catch(a){}i(e)}}else{var n=t.fn.remove;t.fn.remove=function(e,i){return this.each(function(){return i||e&&!t.filter(e,[this]).length||t("*",this).add([this]).each(function(){try{t(this).triggerHandler("remove")}catch(e){}}),n.call(t(this),e,i)})}}t.widget=function(e,i,n){var s,a=e.split(".")[0];e=e.split(".")[1],s=a+"-"+e,n||(n=i,i=t.Widget),t.expr[":"][s]=function(i){return!!t.data(i,e)},t[a]=t[a]||{},t[a][e]=function(t,e){arguments.length&&this._createWidget(t,e)};var r=new i;
// we need to make the options hash a property directly on the new instance
// otherwise we'll modify the options hash on the prototype that we're
// inheriting from
//	$.each( basePrototype, function( key, val ) {
//		if ( $.isPlainObject(val) ) {
//			basePrototype[ key ] = $.extend( {}, val );
//		}
//	});
r.options=t.extend(!0,{},r.options),t[a][e].prototype=t.extend(!0,r,{namespace:a,widgetName:e,widgetEventPrefix:t[a][e].prototype.widgetEventPrefix||e,widgetBaseClass:s},n),t.widget.bridge(e,t[a][e])},t.widget.bridge=function(i,n){t.fn[i]=function(s){var a="string"==typeof s,r=Array.prototype.slice.call(arguments,1),o=this;
// prevent calls to internal methods
// allow multiple hashes to be passed on init
// prevent calls to internal methods
return s=!a&&r.length?t.extend.apply(null,[!0,s].concat(r)):s,a&&"_"===s.charAt(0)?o:(a?this.each(function(){var n=t.data(this,i),a=n&&t.isFunction(n[s])?n[s].apply(n,r):n;return a!==n&&a!==e?(o=a,!1):void 0}):this.each(function(){var e=t.data(this,i);e?e.option(s||{})._init():t.data(this,i,new n(s,this))}),o)}},t.Widget=function(t,e){
// allow instantiation without initializing for simple inheritance
arguments.length&&this._createWidget(t,e)},t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(e,i){
// $.widget.bridge stores the plugin instance, but we do it anyway
// so that it's stored even before the _create function runs
t.data(i,this.widgetName,this),this.element=t(i),this.options=t.extend(!0,{},this.options,this._getCreateOptions(),e);var n=this;this.element.bind("remove."+this.widgetName,function(){n.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return t.metadata&&t.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(i,n){var s=i;if(0===arguments.length)
// don't return a reference to the internal hash
return t.extend({},this.options);if("string"==typeof i){if(n===e)return this.options[i];s={},s[i]=n}return this._setOptions(s),this},_setOptions:function(e){var i=this;return t.each(e,function(t,e){i._setOption(t,e)}),this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&this.widget()[e?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",e),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(e,i,n){var s,a,r=this.options[e];if(n=n||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(s in a)s in i||(i[s]=a[s]);return this.element.trigger(i,n),!(t.isFunction(r)&&r.call(this.element[0],i,n)===!1||i.isDefaultPrevented())}}}(jQuery);