function openPatternEditor() {
	$("#pattern-editor").css({ display: "block" });
}

function drawRhythmicStructure() {
	var html = "";
	if (window.patternEditor.rhythmicStructure.patterns.length === 0) {
		html += "Empty";
	} else {
		var enableGroupParenthesis = false;
		if (window.patternEditor.rhythmicStructure.patterns.length > 1
			|| window.patternEditor.rhythmicStructure.nbRepetitions > 1)
			enableGroupParenthesis = true;
		var groups = [];
		$.each(window.patternEditor.rhythmicStructure.patterns, function(index, elt) {
			var str = "";
			if (enableGroupParenthesis)
				str += "(";
			if (elt.nbRepetitions > 1)
				str += "(";
			str += elt.nbNotes + " &times; " + "<span class=\"music-note\">"
				+ noteToCharacter(elt.noteType) + "</span>";
			if (elt.nbRepetitions > 1)
				str += ") <small>&times; " + elt.nbRepetitions + "</small>";
			if (enableGroupParenthesis)
				str += ")";
			groups.push(str);
		});
		html += groups.join(" + ");
		if (window.patternEditor.rhythmicStructure.nbRepetitions > 1)
			html += " <small>&times; " + window.patternEditor.rhythmicStructure.nbRepetitions + "</small>";
	}
	$("#pattern-editor .rhythmic-structure .structure-as-string").html(html);
}

function buildRhythmicPatternEdition() {
	var html = "";
	if (window.patternEditor.rhythmicStructure.patterns.length === 0) {
		html += "<div class=\"well well-sm\">";
		html += "<i>Empty rhythmic structure !</i>";
		html += "<br />";
		html += "Use the \"Append\" button to add a rhythmic pattern.";
		html += "</div>";
	} else {
		var blocks = [];
		$.each(window.patternEditor.rhythmicStructure.patterns, function(index, pattern) {
			var str = "";
			str += "<div data-index=\"" + index + "\" class=\"block well well-sm\">";
			str += "<input type=\"number\" class=\"nb-notes\ placeholder=\"8\" min=\"1\" />";
			str += " &times ";
			str += "<select class=\"note-type\">";
			str += "<option value=\"1\">Whole note</option>";
			str += "<option value=\"2\">Half note</option>";
			str += "<option value=\"4\">Quarter note</option>";
			str += "<option value=\"8\">Eighth note</option>";
			str += "<option value=\"16\">Sixteenth note</option>";
			str += "</select>";
			str += " repeated ";
			str += "<input type=\"number\" class=\"nb-repetitions\" placeholder=\"1\" min=\"1\" />";
			str += " times"
			str += "</div>";
			blocks.push(str);
		});
		html = blocks.join("<div class=\"separator text-center\"><span class=\"glyphicon glyphicon-plus\"></span></div>");
	}
	$("#pattern-editor .rhythmic-structure .edition-container").html(html);
	$.each(window.patternEditor.rhythmicStructure.patterns, function(index, pattern) {
		var container = $("#pattern-editor .rhythmic-structure .edition-container div[data-index=" + index + "]");
		container.find(".nb-notes").val(pattern.nbNotes);
		container.find(".note-type").val(pattern.noteType);
		container.find(".nb-repetitions").val(pattern.nbRepetitions);
	});
}

function drawPatternStructureVisualization() {
	//FIXME
}

function validatePatternEditor() {
	var res = [];
	//FIXME
	return res;
}

$(document).ready(function() {

	window.patternEditor = {
		rhythmicStructure: {
			patterns: [],
			nbRepetitions: 1
		}
	};
	
	drawRhythmicStructure();
	drawPatternStructureVisualization();
	$("#pattern-editor-option-nb-repetitions").val(1);
	
	$("#pattern-editor .pattern-editor-close").click(function(e) {
		e.preventDefault();
		$("#pattern-editor").css({ display: "none" });
		return false;
	});
	
	$("#pattern-editor-structure-actions .edit").click(function(e) {
		e.preventDefault();
		buildRhythmicPatternEdition();
		$("#pattern-editor-edit-structure").css({display: "block"});
		return false;
	});
	
	$("#pattern-editor-edit-structure-append").click(function(e) {
		e.preventDefault();
		window.patternEditor.rhythmicStructure.patterns.push({
			nbNotes: 8,
			noteType: 8,
			nbRepetitions: 1,
		});
		buildRhythmicPatternEdition();
		drawRhythmicStructure();
		drawPatternStructureVisualization();
		return false;
	});
	
	$("body").on("change",
		"#pattern-editor .rhythmic-structure .edition-container .nb-notes, #pattern-editor .rhythmic-structure .edition-container .note-type, #pattern-editor .rhythmic-structure .edition-container .nb-repetitions", function() {
		var container = $(this).parent(".block");
		var index = container.data("index");
		window.patternEditor.rhythmicStructure.patterns[index] = {
				nbNotes: parseInt(container.find(".nb-notes").val()),
				noteType: parseInt(container.find(".note-type").val()),
				nbRepetitions: parseInt(container.find(".nb-repetitions").val()),
		}
		drawRhythmicStructure();
		drawPatternStructureVisualization();
	});

	$("#pattern-editor-edit-structure-ok").click(function(e) {
		e.preventDefault();
		$("#pattern-editor-edit-structure").css({display: "none"});
		return false;
	});
	
	$("#pattern-editor-option-nb-repetitions").change(function() {
		window.patternEditor.rhythmicStructure.nbRepetitions = parseInt($(this).val());
		drawRhythmicStructure();
		drawPatternStructureVisualization();
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
