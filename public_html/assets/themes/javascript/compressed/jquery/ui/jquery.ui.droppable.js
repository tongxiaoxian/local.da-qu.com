/*!
 * jQuery UI Droppable @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.mouse.js
 *	jquery.ui.draggable.js
 */
!function(e,t){e.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect"},_create:function(){var t=this.options,i=t.accept;this.isover=0,this.isout=1,this.accept=e.isFunction(i)?i:function(e){return e.is(i)},
//Store the droppable's proportions
this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},
// Add the reference and positions to the manager
e.ui.ddmanager.droppables[t.scope]=e.ui.ddmanager.droppables[t.scope]||[],e.ui.ddmanager.droppables[t.scope].push(this),t.addClasses&&this.element.addClass("ui-droppable")},destroy:function(){for(var t=e.ui.ddmanager.droppables[this.options.scope],i=0;i<t.length;i++)t[i]==this&&t.splice(i,1);return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"),this},_setOption:function(t,i){"accept"==t&&(this.accept=e.isFunction(i)?i:function(e){return e.is(i)}),e.Widget.prototype._setOption.apply(this,arguments)},_activate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),i&&this._trigger("activate",t,this.ui(i))},_deactivate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),i&&this._trigger("deactivate",t,this.ui(i))},_over:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!=this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",t,this.ui(i)))},_out:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!=this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",t,this.ui(i)))},_drop:function(t,i){var s=i||e.ui.ddmanager.current;if(!s||(s.currentItem||s.element)[0]==this.element[0])return!1;// Bail if draggable and droppable are same element
var o=!1;return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var t=e.data(this,"droppable");return t.options.greedy&&!t.options.disabled&&t.options.scope==s.options.scope&&t.accept.call(t.element[0],s.currentItem||s.element)&&e.ui.intersect(s,e.extend(t,{offset:t.element.offset()}),t.options.tolerance)?(o=!0,!1):void 0}),o?!1:this.accept.call(this.element[0],s.currentItem||s.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",t,this.ui(s)),this.element):!1},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}}}),e.extend(e.ui.droppable,{version:"@VERSION"}),e.ui.intersect=function(t,i,s){if(!i.offset)return!1;var o=(t.positionAbs||t.position.absolute).left,r=o+t.helperProportions.width,n=(t.positionAbs||t.position.absolute).top,a=n+t.helperProportions.height,l=i.offset.left,p=l+i.proportions.width,h=i.offset.top,c=h+i.proportions.height;switch(s){case"fit":return o>=l&&p>=r&&n>=h&&c>=a;case"intersect":return l<o+t.helperProportions.width/2&&r-t.helperProportions.width/2<p&&h<n+t.helperProportions.height/2&&a-t.helperProportions.height/2<c;case"pointer":var d=(t.positionAbs||t.position.absolute).left+(t.clickOffset||t.offset.click).left,u=(t.positionAbs||t.position.absolute).top+(t.clickOffset||t.offset.click).top,f=e.ui.isOver(u,d,h,l,i.proportions.height,i.proportions.width);return f;case"touch":// Top edge touching
// Bottom edge touching
// Left edge touching
// Right edge touching
return(n>=h&&c>=n||a>=h&&c>=a||h>n&&a>c)&&(o>=l&&p>=o||r>=l&&p>=r||l>o&&r>p);default:return!1}},/*
	This manager tracks offsets of draggables and droppables
*/
e.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,i){var s=e.ui.ddmanager.droppables[t.options.scope]||[],o=i?i.type:null,r=(t.currentItem||t.element).find(":data(droppable)").andSelf();e:for(var n=0;n<s.length;n++)if(!(s[n].options.disabled||t&&!s[n].accept.call(s[n].element[0],t.currentItem||t.element))){//No disabled and non-accepted
for(var a=0;a<r.length;a++)if(r[a]==s[n].element[0]){s[n].proportions.height=0;continue e}//Filter out elements in the current dragged item
s[n].visible="none"!=s[n].element.css("display"),s[n].visible&&(//If the element is not visible, continue
"mousedown"==o&&s[n]._activate.call(s[n],i),//Activate the droppable if used directly from draggables
s[n].offset=s[n].element.offset(),s[n].proportions={width:s[n].element[0].offsetWidth,height:s[n].element[0].offsetHeight})}},drop:function(t,i){var s=!1;return e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){this.options&&(!this.options.disabled&&this.visible&&e.ui.intersect(t,this,this.options.tolerance)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=1,this.isover=0,this._deactivate.call(this,i)))}),s},dragStart:function(t,i){
//Listen for scrolling so that if the dragging causes scrolling the position of the droppables can be recalculated (see #5003)
t.element.parents(":not(body,html)").bind("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)})},drag:function(t,i){
//If you have a highly dynamic page, you might try this option. It renders positions every time you move the mouse.
t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,i),
//Run through all droppables and check their positions based on specific tolerance options
e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s=e.ui.intersect(t,this,this.options.tolerance),o=s||1!=this.isover?s&&0==this.isover?"isover":null:"isout";if(o){var r;if(this.options.greedy){var n=this.element.parents(":data(droppable):eq(0)");n.length&&(r=e.data(n[0],"droppable"),r.greedyChild="isover"==o?1:0)}
// we just moved into a greedy child
r&&"isover"==o&&(r.isover=0,r.isout=1,r._out.call(r,i)),this[o]=1,this["isout"==o?"isover":"isout"]=0,this["isover"==o?"_over":"_out"].call(this,i),
// we just moved out of a greedy child
r&&"isout"==o&&(r.isout=0,r.isover=1,r._over.call(r,i))}}})},dragStop:function(t,i){t.element.parents(":not(body,html)").unbind("scroll.droppable"),
//Call prepareOffsets one final time since IE does not fire return scroll events when overflow was caused by drag (see #5003)
t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)}}}(jQuery);