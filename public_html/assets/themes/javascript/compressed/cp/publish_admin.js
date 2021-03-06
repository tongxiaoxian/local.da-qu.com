/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2015, EllisLab, Inc.
 * @license		http://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 2.0
 * @filesource
 */
/*jslint browser: true, devel: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: true, newcap: true, immed: true */
/*global $, jQuery, EE */
"use strict";function delete_publish_tab(){
// Toggle cannot use a namespaced click event so we need to unbind using the
// function reference instead
$("#publish_tab_list").unbind("click.tab_delete"),$("#publish_tab_list").bind("click.tab_delete",function(e){if(e.target!==this){var t=$(e.target).closest("li");the_id=t.attr("id").replace(/remove_tab_/,""),tab_req_check(the_id)||_delete_tab_hide(t,the_id)}return!1})}function _add_tab(e){
// ensure there are no duplicate ids provided
// ensure there are no duplicate ids provided
// Tab was hidden- just return it
// apply the classes to make it look focused
// add the custom tab
// add the tab to the list in the toolbar
// If this is the only tab on the interface, we should move focus into it
// The "add tab" button counts for 1, so we look for it plus the new tab (hence 2)
// apply the classes to make it look focused
// re-assign behaviours
return tab_name_filtered=e.replace(/ /g,"_").replace(/&/g,"and").toLowerCase(),$("#"+tab_name_filtered).length?"none"==$("#"+tab_name_filtered).css("display")?($("#remove_tab_"+tab_name_filtered).fadeIn(),$("#menu_"+tab_name_filtered).fadeIn(),$("#tab_menu_tabs li").removeClass("current"),$("#menu_"+tab_name_filtered).addClass("current"),tab_focus(tab_name_filtered),!0):!1:($(".addTabButton").before('<li id="menu_'+tab_name_filtered+'" title="'+e+'" class="content_tab"><a href="#" class="menu_'+tab_name_filtered+'" title="menu_'+tab_name_filtered+'">'+e+"</a></li>").fadeIn(),$("#publish_tab_list").append('<li id="remove_tab_'+tab_name_filtered+'"><a class="menu_focus" title="menu_+tab_name_filtered+" href="#">'+e+'</a> <a href="#'+tab_name_filtered+'" class="delete delete_tab"><img src="'+EE.THEME_URL+'images/content_custom_tab_delete.png" alt="Delete" width="19" height="18" /></a></li>'),new_tab=$('<div class="main_tab"><div class="insertpoint"></div><div class="clear"></div></div>').attr("id",tab_name_filtered),new_tab.prependTo("#holder"),$("#tab_menu_tabs li:visible").length<=2&&tab_focus(tab_name_filtered),$("#tab_menu_tabs li").removeClass("current"),$("#menu_"+tab_name_filtered).addClass("current"),setup_tabs(),delete_publish_tab(),!0)}
// Some of the ui widgets are slow to set up (looking at you, sortable) and we
// don't really need these until the sidebar is shown so to save on yet more
// things happening on document.ready we'll init them when they click on the sidebar link
$("#showToolbarLink").find("a").one("click",function(){
// set up resizing of publish fields
$(".publish_field").resizable({handles:"e",minHeight:49,stop:function(e){var t=10*Math.round($(this).outerWidth()/$(this).parent().width()*10);
// minimum of 10%
10>t&&(t=10),
// maximum of 100
t>99&&(t=100),$(this).css("width",t+"%")}}),$("#tools ul li a.field_selector").draggable({revert:!0,zIndex:33,helper:"clone"}).click(function(){return!1});var e={};e[EE.lang.add_tab]=add_publish_tab,$("#new_tab_dialog").dialog({autoOpen:!1,open:function(){$("#tab_name").focus()},resizable:!1,modal:!0,position:"center",minHeight:0,buttons:e}),$(".add_tab_link").click(function(){return $("#tab_name").val(""),$("#add_tab label").text(EE.lang.tab_name+": "),$("#new_tab_dialog").dialog("open"),setup_tabs(),!1})}).toggle(function(){
// disable all form elements
disable_fields(!0),$(".tab_menu").sortable({axis:"x",tolerance:"pointer",// feels easier in this case
placeholder:"publishTabSortPlaceholder",items:"li:not(.addTabButton)"}),
// EE._hidden_fields is defined at the bottom of publish.js
$(EE._hidden_fields).closest(".publish_field").show(),$("a span","#showToolbarLink").text(EE.lang.hide_toolbar),$("#showToolbarLink").animate({marginRight:"210"}),$("#holder").animate({marginRight:"196"},function(){$("#tools").show(),
// Swap the image
$("#showToolbarImg").hide(),$("#hideToolbarImg").css("display","inline")}),$(".publish_field").animate({backgroundPosition:"0 0"},"slow"),$(".handle").css("display","block"),$(".ui-resizable-e").show(500),$(".addTabButton").css("display","inline")},function(){
// enable all form elements
disable_fields(!1),$("#tools").hide(),$(".tab_menu").sortable("destroy"),$("a span","#showToolbarLink").text(EE.lang.show_toolbar),$("#showToolbarLink").animate({marginRight:"20"}),$("#holder").animate({marginRight:"10"}),$(".publish_field").animate({backgroundPosition:"-15px 0"},"slow"),$(".handle").css("display","none"),$(".ui-resizable-e").hide(),$(".addTabButton").hide(),
// Swap the image
$("#hideToolbarImg").hide(),$("#showToolbarImg").css("display","inline"),// .show() uses block
// EE._hidden_fields is defined at the bottom of publish.js
$(EE._hidden_fields).closest(".publish_field").hide()}),$("#tab_menu_tabs").sortable({tolerance:"intersect",items:"li:not(.addTabButton)",axis:"x"}),$("#tools h3 a").toggle(function(){$(this).parent().next("div").slideUp(),$(this).toggleClass("closed")},function(){$(this).parent().next("div").slideDown(),$(this).toggleClass("closed")}),$("#toggle_member_groups_all").toggle(function(){$("input.toggle_member_groups").each(function(){this.checked=!0})},function(){$("input.toggle_member_groups").each(function(){this.checked=!1})}),$(".delete_field").click(function(e){e.preventDefault();var t=$(this),a=t.attr("id").substr(13),i=$("#hold_field_"+a),n=(t.children("img"),function(){i.is(":hidden")?i.css("display","none"):i.slideUp(),
// set percent width to be used on hidden fields...
i.attr("data-width",EE.publish.get_percentage_width(i)),t.attr("data-visible","n").children().attr("src",EE.THEME_URL+"images/closed_eye.png")}),l=function(){i.slideDown(),
// remove percent width
i.attr("data-width",!1),t.attr("data-visible","y").children().attr("src",EE.THEME_URL+"images/open_eye.png")};"y"==t.attr("data-visible")?n():l()}),_delete_tab_hide=function(e,t){
// $("#"+tab_to_delete).remove() // remove from DOM
// hide the tab
// remove from sidebar
// hide the fields
// If the tab is selected - move focus to the left
return $(".menu_"+t).parent().fadeOut(),$(e).fadeOut(),$("#"+t).fadeOut(),selected_tab=get_selected_tab(),t==selected_tab&&(prev=$(".menu_"+selected_tab).parent().prevAll(":visible"),prev.length>0?prev=prev.attr("id").substr(5):prev="publish_tab",tab_focus(prev)),!1},get_selected_tab=function(){return jQuery("#tab_menu_tabs .current").attr("id").substring(5)},_delete_tab_reveal=function(){// show the fields
// $(".menu"+tab_to_show).parent().animate({width:0, margin:0, padding:0, border:0, opacity:0}, "fast");
// show the tab
// change icon
return tab_to_show=$(this).attr("href").substring(1),$(".menu_"+tab_to_show).parent().fadeIn(),$(this).children().attr("src",EE.THEME_URL+"images/content_custom_tab_show.gif"),$("#"+tab_to_delete).fadeIn(),!1},tab_req_check=function(e){var t=!1,a=new Array,i=EE.publish.required_fields;return $("#"+e).find(".publish_field").each(function(){var e=this.id.replace(/hold_field_/,""),n=0,l="";for(l in i)i[l]==e&&(t=!0,a[n]=e,n++)}),t===!0?($.ee_notice(EE.publish.lang.tab_has_req_field+a.join(","),{type:"error"}),!0):!1},
// when the page loads set up existing tabs to delete
delete_publish_tab(),add_publish_tab=function(){tab_name=$("#tab_name").val();var e=/^[^*>:+()\[\]=|"'.#$]+$/;// allow all unicode characters except for css selectors and $
e.test(tab_name)?""===tab_name?$.ee_notice(EE.lang.tab_name_required):_add_tab(tab_name)?$("#new_tab_dialog").dialog("close"):$.ee_notice(EE.lang.duplicate_tab_name):$.ee_notice(EE.lang.illegal_tab_name)},$("#tab_name").keypress(function(e){return"13"==e.keyCode?(// return key press
add_publish_tab(),!1):void 0}),
// Sidebar starts out closed - kill tab sorting
$(".tab_menu").sortable("destroy");