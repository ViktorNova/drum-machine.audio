function openPatternEditor() {
	$("#pattern-editor").css({ display: "block" });
}

function validatePatternEditor() {
	var res = [];
	
	return res;
}

$(document).ready(function() {

	$("#pattern-editor .pattern-editor-close").click(function(e) {
		e.preventDefault();
		$("#pattern-editor").css({ display: "none" });
		return false;
	});
	
	$("#pattern-editor-generate-slug").click(function(e) {
		e.preventDefault();
		var slug = slugify($("#pattern-editor-label").val());
		$("#pattern-editor-slug").val(slug);
		return false;
	});
	
	$("#pattern-editor-save").click(function(e) {
		e.preventDefault();
		var validationErrors = validatePatternEditor();
		if (validationErrors.length === 0) {
			//TODO
		} else {
			
		}
		return false;
	});
	
});
