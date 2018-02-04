$(document).on("click", ".pagination .btn-next", function() {

	var temp = $("<div>"),
		self = $(this);

	self
		.html("Loading...")
		.addClass("loading");

	temp.load($(this).data("href") + ".main .article, .pagination", function() {
		window.history.pushState({page: self.data("site"), postion: $(document).scrollTop()}, document.title, self.data("href"));
		self.parent(".pagination").remove();
		$(".main").append(temp.html());
	});

});