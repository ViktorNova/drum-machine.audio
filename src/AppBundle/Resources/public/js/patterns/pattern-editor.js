function openPatternEditor() {
	$("#pattern-editor .pattern-editor-empty").css({ display: "none" });
	$("#pattern-editor .pattern-editor-loaded").css({ display: "block" });
	$("#find-pattern-collapse").collapse("hide");
	$("#pattern-editor-collapse").collapse('show');
}

function drawRhythmicStructure() {
	var html = "";
	if (window.drumMachine.patternEditor.rhythmicStructure.patterns.length === 0) {
		html += "Empty rhythmic structure !";
	} else {
		if (window.drumMachine.patternEditor.rhythmicStructure.nbRepetitions > 1)
			html += "(";
		var enableGroupParenthesis = false;
		if (window.drumMachine.patternEditor.rhythmicStructure.patterns.length > 1)
			enableGroupParenthesis = true;
		var groups = [];
		$.each(window.drumMachine.patternEditor.rhythmicStructure.patterns, function(index, elt) {
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
		if (window.drumMachine.patternEditor.rhythmicStructure.nbRepetitions > 1)
			html += ") <small>&times; " + window.drumMachine.patternEditor.rhythmicStructure.nbRepetitions + "</small>";
	}
	$("#pattern-editor .rhythmic-structure .structure-as-string").html(html);
}

function buildRhythmicPatternEdition() {
	var html = "";
	if (window.drumMachine.patternEditor.rhythmicStructure.patterns.length === 0) {
		html += "<div class=\"well well-sm\">";
		html += "<i>Empty rhythmic structure !</i>";
		html += "<br />";
		html += "Use the \"Append\" button to add a rhythmic pattern.";
		html += "</div>";
	} else {
		var blocks = [];
		$.each(window.drumMachine.patternEditor.rhythmicStructure.patterns, function(index, pattern) {
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
			str += " times";
			str += "<button type=\"button\" class=\"remove btn btn-default btn-xs pull-right\">";
			str += "<span class=\"glyphicon glyphicon-remove\"></span>";
			str += "</button>";
			str += "</div>";
			blocks.push(str);
		});
		html = blocks.join("<div class=\"separator text-center\"><span class=\"glyphicon glyphicon-plus\"></span></div>");
	}
	$("#pattern-editor .rhythmic-structure .edition-container").html(html);
	$.each(window.drumMachine.patternEditor.rhythmicStructure.patterns, function(index, pattern) {
		var container = $("#pattern-editor .rhythmic-structure .edition-container div[data-index=" + index + "]");
		container.find(".nb-notes").val(pattern.nbNotes);
		container.find(".note-type").val(pattern.noteType);
		container.find(".nb-repetitions").val(pattern.nbRepetitions);
	});
}

function buildSoundEventsEditor() {
	var html = "";
	if (window.drumMachine.patternEditor.rhythmicStructure.patterns.length === 0) {
		html += "Your pattern's rhythmic structure is empty ! Please build it, then you'll be able to add sound events.";
	} else {
		html += "<h4>Voices</h4>";
		if (window.drumMachine.patternEditor.voices.length === 0) {
			html += "There is currently no voice in your pattern. Please add at least one.";
			html += "<br /><br />";
		} else {
			html += "<table class=\"table table-hover table-condensed\">";
			html += "<tbody>";
			$.each(window.drumMachine.patternEditor.voices, function(index, voice) {
				html += "<tr>";
				var soundLabel = "";
				$.each(window.drumMachine.sounds, function(index, sound) {
					if (sound.id === voice.soundId)
						soundLabel = sound.label;
				});
				html += "<td>" + soundLabel + "</td>";
				html += "<td>";
				html += "<div class=\"btn-group\" role=\"group\" aria-label=\"voice-actions\">";
				html += "<button type=\"button\" class=\"delete btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-remove\"></span></button>";
				html += "</div>";
				html += "</td>";
				html += "</tr>";
			});
			html += "</tbody>";
			html += "</table>";
		}
		
		html += "<div style=\"display: none;\" class=\"add-voice-panel panel panel-default\">";
		html += "<div class=\"panel-body\">";
		html += "<p>Please select the sound you want to use in your new voice :</p>";
		html += "<select class=\"sound form-control\">";
		$.each(window.drumMachine.sounds, function(index, sound) {
			html += "<option value=\"" + sound.id + "\">";
			html += sound.label;
			html += "</option>";
		});
		html += "</select>";
		html += "<br />";
		html += "<div class=\"btn-group\" role=\"group\" aria-label=\"add-voice-actions\">";
		html += "<button type=\"button\" class=\"ok btn btn-primary btn-sm\">Ok</button>";
		html += "<button type=\"button\" class=\"cancel btn btn-default btn-sm\">Cancel</button>";
		html += "</div>";
		html += "</div>";
		html += "</div>";
		
		html += "<div class=\"btn-group\" role=\"group\ aria-label=\"sound-editor-voices\">";
		html += "<button type=\"button\" class=\"add btn btn-primary btn-sm\">";
		html += "<span class=\"glyphicon glyphicon-plus\"></span> Add a voice";
		html += "</button>";
		html += "</div>";
		
		html += "<h4>Sound occurrences</h4>";
		html += "<div class=\"text-center\">"
        html += "<button class=\"play\">";
        html += "<span class=\"glyphicon glyphicon-play\" aria-hidden=\"true\"></span>";
        html += "</button>";
        html += "</div>";
		html += "<table class=\"sound-events-editor table table-striped table-hover table-condensed\">";
		html += "<tbody>";
		$.each(window.drumMachine.patternEditor.voices, function(voiceIndex, voice) {
			html += "<tr>";
			var soundLabel = "";
			$.each(window.drumMachine.sounds, function(soundIndex, sound) {
				if (sound.id === voice.soundId)
					soundLabel = sound.label;
			});
			html += "<td>" + soundLabel + "</td>";
			var tickIndex = 0;
			for (var i = 0; i < window.drumMachine.patternEditor.rhythmicStructure.nbRepetitions; i ++) {
				$.each(window.drumMachine.patternEditor.rhythmicStructure.patterns, function(patternIndex, pattern) {
					for (var j = 0; j < pattern.nbRepetitions; j++)
						for (var k = 0; k < pattern.nbNotes; k++) {
							html += "<td><input type=\"checkbox\" data-tick-index=\"" + tickIndex
								+ "\" data-voice-index=\"" + voiceIndex + "\" /></td>";
							tickIndex++;
						}
				});
			}
			html += "</tr>";
		});
		html += "<tr>";
		html += "<td>Rhythm</td>"
		for (var i = 0; i < window.drumMachine.patternEditor.rhythmicStructure.nbRepetitions; i ++) {
			$.each(window.drumMachine.patternEditor.rhythmicStructure.patterns, function(patternIndex, pattern) {
				for (var j = 0; j < pattern.nbRepetitions; j++)
					for (var k = 0; k < pattern.nbNotes; k++)
						html += "<td><span class=\"music-note\">" + noteToCharacter(pattern.noteType) + "</span></td>";
			});
		}
		html += "</tr>";
		html += "</tbody>";
		html += "</table>"
	}

	$("#pattern-editor .sound-events-editor-container").html(html);
}

function validatePatternEditor() {
	var res = [];
	//FIXME
	return res;
}

$(document).ready(function() {

	window.drumMachine.patternEditor = {
		rhythmicStructure: {
			patterns: [],
			nbRepetitions: 1
		},
		voices: []
	};
	
	drawRhythmicStructure();
	buildSoundEventsEditor();
	$("#pattern-editor-option-nb-repetitions").val(1);
	$("#pattern-editor-structure-actions .edit").attr("disabled", null);
	
	$("#pattern-editor .pattern-editor-close").click(function(e) {
		e.preventDefault();
		$("#pattern-editor").css({ display: "none" });
		return false;
	});

	$("#pattern-editor-structure-actions .edit").click(function(e) {
		e.preventDefault();
		$("#pattern-editor-structure-actions .edit").attr("disabled", "disabled");
		buildRhythmicPatternEdition();
		$("#pattern-editor-edit-structure").css({display: "block"});
		return false;
	});

	$("body").on("change",
			"#pattern-editor .rhythmic-structure .edition-container .nb-notes, #pattern-editor .rhythmic-structure .edition-container .note-type, #pattern-editor .rhythmic-structure .edition-container .nb-repetitions", function() {
			var container = $(this).parent(".block");
			var index = container.data("index");
			window.drumMachine.patternEditor.rhythmicStructure.patterns[index] = {
					nbNotes: parseInt(container.find(".nb-notes").val()),
					noteType: parseInt(container.find(".note-type").val()),
					nbRepetitions: parseInt(container.find(".nb-repetitions").val()),
			}
			drawRhythmicStructure();
			buildSoundEventsEditor();
		});

	$("body").on("click", "#pattern-editor .rhythmic-structure .edition-container .remove", function(e) {
		e.preventDefault();
		var container = $(this).parent(".block");
		var indexToRemove = container.data("index");
		container.remove();
		var newPatterns = [];
		$.each(window.drumMachine.patternEditor.rhythmicStructure.patterns, function(index, elt) {
			if (index !== indexToRemove)
				newPatterns.push(elt);
		});
		window.drumMachine.patternEditor.rhythmicStructure.patterns = newPatterns;
		drawRhythmicStructure();
		buildSoundEventsEditor();
		return false;
	});

	$("#pattern-editor-edit-structure-append").click(function(e) {
		e.preventDefault();
		window.drumMachine.patternEditor.rhythmicStructure.patterns.push({
			nbNotes: 8,
			noteType: 8,
			nbRepetitions: 1,
		});
		buildRhythmicPatternEdition();
		drawRhythmicStructure();
		buildSoundEventsEditor();
		return false;
	});
	
	$("#pattern-editor-edit-structure-ok").click(function(e) {
		e.preventDefault();
		$("#pattern-editor-structure-actions .edit").attr("disabled", null);
		$("#pattern-editor-edit-structure").css({display: "none"});
		return false;
	});
	
	$("#pattern-editor-option-nb-repetitions").change(function() {
		window.drumMachine.patternEditor.rhythmicStructure.nbRepetitions = parseInt($(this).val());
		drawRhythmicStructure();
		buildSoundEventsEditor();
	});

	$("body").on("click", "#pattern-editor .sound-events-editor-container .add", function(e) {
		e.preventDefault();
		$("#pattern-editor .sound-events-editor-container .add-voice-panel").css({display: "block"});
		$("#pattern-editor .sound-events-editor-container .add").prop("disabled", true);
		return false;
	});

	$("body").on("click", "#pattern-editor .sound-events-editor-container .ok", function(e) {
		e.preventDefault();
		var soundId = parseInt($("#pattern-editor .sound-events-editor-container .add-voice-panel .sound").val());
		// Lazy-load the corresponding sound
		loadSound(soundId);
		// Build empty sound occurrences list according to the rhythmic structure
		var soundOccurrences = [];
		for (var i = 0; i < window.drumMachine.patternEditor.rhythmicStructure.nbRepetitions; i ++) {
			$.each(window.drumMachine.patternEditor.rhythmicStructure.patterns, function(patternIndex, pattern) {
				for (var j = 0; j < pattern.nbRepetitions; j++)
					for (var k = 0; k < pattern.nbNotes; k++) {
						soundOccurrences.push(false);
					}
			});
		}
		window.drumMachine.patternEditor.voices.push({
			soundId: soundId,
			volume: 100,
			soundOccurrences: soundOccurrences
		});
		buildSoundEventsEditor();
		return false;
	});

	$("body").on("click", "#pattern-editor .sound-events-editor-container .cancel", function(e) {
		e.preventDefault();
		$("#pattern-editor .sound-events-editor-container .add-voice-panel").css({display: "none"});
		$("#pattern-editor .sound-events-editor-container .add").prop("disabled", false);
		return false;
	});

	$("body").on("click", "#pattern-editor .sound-events-editor-container .play", function(e) {
		e.preventDefault();
		playPattern(window.drumMachine.patternEditor);
		return false;
	});

	$("body").on("change", "#pattern-editor .sound-events-editor input[type=checkbox]", function(e) {
		var voiceIndex = parseInt($(this).data("voice-index"));
		var tickIndex = parseInt($(this).data("tick-index"));
		var newVal = null;
		if ($(this).prop("checked")) {
			newVal = true;
		} else {
			newVal = false;
		}
		window.drumMachine.patternEditor.voices[voiceIndex].soundOccurrences[tickIndex] = newVal;
		// Copy the pattern to window.drumMachine.currentPattern
		// so that the player is aware of the changes
		window.drumMachine.currentPattern = window.drumMachine.patternEditor;
//console.log(window.drumMachine.currentPattern);
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
