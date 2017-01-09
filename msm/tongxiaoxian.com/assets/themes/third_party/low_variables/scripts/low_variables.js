/**
 * Low Variables JavaScript file
 *
 * @package        low_variables
 * @author         Lodewijk Schutte <hi@gotolow.com>
 * @link           http://gotolow.com/addons/low-variables
 * @copyright      Copyright (c) 2009-2015, Low
 */

(function($){

/**
 *  Drag and drop lists object
 */
$.fn.lowDragLists = function(){

	this.each(function(){

		// Set input names
		var input_on  = 'var['+ this.id.replace('low-drag-lists-', '') +'][]',
			input_off = '';

		// Get lists
		var $list_on  = $('.low-on', this),
			$list_off = $('.low-off', this);

		// Quick function to see if list item is On or not
		var isOn = function(li) {
			return $(li).parent().hasClass('low-on');
		};

		// Define callback function
		var switched = function(event, obj) {
			$('input', obj.item).attr('name', (isOn(obj.item) ? input_on : input_off));
		};

		// Initiate sortables
		$list_on.sortable({connectWith: $list_off, receive: switched});
		$list_off.sortable({connectWith: $list_on, receive: switched});

		// Add doubleclick event to lis in element
		$(this).delegate('li', 'dblclick', function(event){
			$(this).appendTo((isOn(this) ? $list_off : $list_on));
			switched(event, {item: this});
		});

	});

};

/**
 *  File Upload
 */
$.fn.lowFileUpload = function(){

	this.each(function(){

		// Determine vars
		var var_id  = this.id.replace(/^.*\-(\d+)$/, '$1'),
			$el     = $(this),
			$toggle = $('a', this),
			speed   = 200;

		// Create file input field
		var $upload = $('<input/>').attr({
			'type': 'file',
			'name': 'newfile['+var_id+']'
		}).css('display', 'none').change(function(){
			$el.addClass('has-file');
		});

		// Add events to toggle link to show/hide input field
		$toggle.toggle(function(event){
			event.preventDefault();
			$toggle.after($upload);
			$upload.fadeIn(speed);
		}, function(event){
			event.preventDefault();
			$el.removeClass('has-file');
			$upload.fadeOut(speed, function(){
				$upload.detach();
			});
		});

	});

};

/**
 *  Low Table variable type
 */
$.fn.lowTable = function(){

	this.each(function(){

		// Get elements we need
		var var_id = this.id.replace(/^.*\-(\d+)$/, '$1'),
			$el    = $(this),
			$tbody = $('tbody', this),
			$add   = $('tfoot a', this),
			cols   = $('thead th', this).length,
			rows   = $('tbody tr', this).length;

		// Add class to cell to get rid of padding in css
		$el.parent().addClass('low-table-cell');

		// Define addRow function
		$add.click(function(event) {

			// don't go anywhere
			event.preventDefault();

			// Create new row and append it to the table
			var $tr = $('<tr/>');
			$tbody.append($tr);

			// Loop thru cols and add <td><input /></td> for each one
			for (var i = 0; i < cols; i++) {

				var $td = $('<td/>'),
					$input = $('<input/>');

				$input.attr({
					'name': 'var['+ var_id +']['+ rows +']['+ i +']',
					'type': 'text'
				});

				$tr.append($td.append($input));
			}

			// Increase row count
			rows++;
		});

		// Add / remove class to table cell on focus / blur
		$el.delegate('input', 'focus', function(){
			$(this).parent().addClass('low-focus');
		});

		$el.delegate('input', 'blur', function(){
			$(this).parent().removeClass('low-focus');
		});

	});

};

/**
 *  Manage Variables list-table
 */
$.fn.lowManageList = function(){

	// Just one list
	if (this.length != 1) return;

	var $table     = this,
		table      = $table.get(0),
		vars       = [],
		stack      = [],
		ajaxUrl    = location.href.replace('method=manage', 'method=ajax_update'),
		properties = {
			hidden: 'is_hidden',
			early:  'early_parsing',
			file:   'save_as_file'
		};

	// Define row as object
	var Var = function(tr, i) {
		var self     = this,
			$tr      = $(tr),
			$box     = $tr.find(':checkbox'),
			box      = $box.get(0),
			$name    = $tr.find('.low-var-name'),
			isHidden = $tr.data('hidden'),
			isEarly  = $tr.data('early'),
			isFile   = $tr.data('file');

		// The var ID
		this.id = $tr.data('id');
		this.index = i;

		// Show variable on alt-click
		$name.on('click', function(event){
			if (event.altKey) {
				prompt('Code:', '{'+ $.trim($name.text()) +'}');
				event.preventDefault();
			}
		});

		// Toggle Property links
		var Prop = function(td) {
			var $td      = $(td),
				$link    = $td.find('a'),
				prop     = $td.data('prop'),
				disabled = $td.data('disabled'),
				dbProp   = properties[prop],
				status   = $link.hasClass('on'),
				data     = {
					CSRF_TOKEN: EE.CSRF_TOKEN,
					XID: EE.XID,
					var_id: self.id,
					type: dbProp
				};

			if (disabled === true) {
				$link.css({
					cursor: 'default',
					opacity: 0.4
				});
			}

			this.toggle = function(event) {
				if (disabled === true) return false;
				if (event) event.preventDefault();
				data.status = status ? 'n' : 'y';
				$.post(ajaxUrl, data, wrapUp);
			};

			var wrapUp = function(response) {
				status = !status;
				$tr.data(prop, status);
				$link[status ? 'addClass' : 'removeClass']('on');
			};

			$link.on('click', this.toggle);

			return this;
		};

		$tr.find('.low-toggle-prop').each(function(){
			new Prop(this);
		});

		this.on = function() {
			box.checked = true;
			hilite(true);
		};

		this.off = function() {
			box.checked = false;
			hilite(false);
		};

		this.isOn = function() {
			return box.checked;
		};

		this.getProp = function(prop) {
			return $tr.data(prop);
		};

		var hilite = function(on) {
			$tr[on ? 'addClass' : 'removeClass']('selected');
		};

		// Pre-select this box
		if (box.checked) hilite(true);

		// Fires onchange of checkbox
		var toggleBox = function() {
			hilite(this.checked);
			if (this.checked) {
				stack.push(self.index);
				stack = stack.slice(-2);
			}
		};

		// Hilite on box change
		$box.on('change', toggleBox);

		// What happens on row click?
		$tr.on('click', function(event){
			var tag = event.target.tagName.toLowerCase();
			if (tag == 'a' || tag == 'input') return;
			box.checked = ! box.checked;
			$box.trigger('change');
		});

		return this;
	};

	// Create Vars from table rows
	$table.find('tbody tr').each(function(i){
		vars.push(new Var(this, i));
	});

	// Shift-click on the table body,
	// Make sure the table is not selectable
	// And the default cursor
	$table.find('tbody').on('click', function(event) {

		var l = stack.length;

		if ( ! (event.shiftKey && l >= 2)) return true;

		// Prevent text selection
		if (document.selection && document.selection.empty) {
			document.selection.empty();
		} else if (window.getSelection) {
			window.getSelection().removeAllRanges();
		}

		var a = stack[l - 1],
			b = stack[l - 2];

		if (a < b) {
			while (a < b) vars[++a].on();
		} else {
			while (a > b) vars[--a].on();
		}

	}).on('selectstart', function() {
		return false;
	}).css('cursor', 'default');

	// Check all vars with a certain property: Hidden, Early or File
	$table.find('.low-check-all').on('click', function(event){
		event.preventDefault();
		var prop = $(this).data('prop');
		for (var i in vars) {
			var v = vars[i]
			v.getProp(prop) ? v.on() : v.off();
		}
	});
};

/**
 *  Stuff to execute onDomReady
 */
$(function(){

	// Create new drag-lists for each one found
	$('.low-drag-lists').lowDragLists();

	// File-upload fields
	$('.low-new-file').lowFileUpload();

	// Create new drag-lists for each one found
	$('.low-table').lowTable();

	// Manage List vars selections
	$('#low-list-vars').lowManageList();

	// Edit group - sort variables in group
	$('#low-variables-list').sortable({axis:'y', opacity:0.75});

	// Sortable groups in manage list
	$('.low-manager #low-sortable-groups').sortable({
		axis: 'y',
		opacity: 0.75,
		handle: '.low-handle',
		update: function(e, ui) {
			var new_order = [];

			$('.low-grouplink').each(function(){
				new_order.push($(this).attr('data-groupid'));
			});

			$.ajax({
				url: location.href + '&method=save_group_order',
				data: 'groups=' + new_order.join('|'),
				type: 'GET'
			});
		}
	});

	// Upload folders / overwrite stuff
	var $selectUploadFolder = $('#low-select-upload-folder');
	var toggleOverwriteFiles = function() {
		var method = ($selectUploadFolder.val() == '0') ? 'hide' : 'show';
		$('#low-overwrite-files')[method]();
	};
	toggleOverwriteFiles();
	$selectUploadFolder.change(toggleOverwriteFiles);


	// Toggle all types
	$('#low-select-all-types').click(function(){
		$('input[name*=enabled_types]').not(':disabled').attr('checked', this.checked);
	});

	// Toggle variable type tables
	$('#low-select-type').change(function(){
		$('.low-var-type').hide();
		$('#' + $(this).val()).show();
		// trigger window resize
		$(window).resize();
	});

	// Toggle allow-multiple settings
	$('.low-var-type').each(function(){
		var toggle = function() {
			var set = $(this).parents('tr').nextAll();
			this.checked ? set.show() : set.hide();
		};
		$('input[class=low-allow-multiple]', this).each(toggle).click(toggle);
	});

	// Variable group stuff
	var $saveAsNew = $(':checkbox[name=save_as_new_group]');
	var toggleNewGroupOptions = function() {
		var $target = $('#new-group-options'),
			speed = 200;
		if ($saveAsNew.is(':checked')) {
			$target.slideDown(speed);
		} else {
			$target.slideUp(speed);
		}
	};

	// On error, show the options again
	toggleNewGroupOptions();
	$saveAsNew.change(toggleNewGroupOptions);


	$('#first-group').each(function(){
		var $this = $(this),
			$link = $('<a href="#" id="low-collapse"/>'),
			$groups = $('#low-grouplist'),
			$vars = $('#low-varlist'),
			$that = $groups.find('th'),
			opened = '&lsaquo;]',
			closed = '[&rsaquo;',
			margin = $vars.css('marginLeft')
			speed = 200;

		$('#mainContent .pageContents').css('min-height', $groups.css('height'));

		$link.html(opened);
		$link.appendTo($that);

		$link.toggle(
			function(event){
				event.preventDefault();
				$groups.animate({width:'hide'}, speed);
				$vars.animate({marginLeft: 0}, speed);
				$link.html(closed);
				$link.prependTo($this);
			},
			function(event){
				event.preventDefault();
				$groups.animate({width:'show'}, speed);
				$vars.animate({marginLeft:margin}, speed);
				$link.html(opened);
				$link.prependTo($that);
			}
		);
	});

});
})(jQuery);