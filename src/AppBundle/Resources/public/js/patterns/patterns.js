$(document).ready(function() {

	$("body").on("click", "#patterns-main-actions .create-pattern", function(e) {
		e.preventDefault();
		openPatternEditor();
		return false;
	});

});
