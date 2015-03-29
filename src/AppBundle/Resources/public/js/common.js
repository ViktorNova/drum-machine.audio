var currentModeSlug = "metronome";

function slugify(text) {
	return text.toLowerCase()
    	.replace(/[^\w ]+/g,'')
    	.replace(/ +/g,'-');
}

function noteToCharacter(note) {
	var res = null;
	switch (note) {
		case 1:
			res = "w";
			break ;
		case 2:
			res = "h";
			break ;
		case 4:
			res = "q";
			break ;
		case 8:
			res = "e";
			break ;
		case 16:
			res = "s";
			break ;
		default :
			console.log("[ERROR] Unknown note type " + note + " !");
			return null;
			break ;
	}
	return res;
}

$(document).ready(function() {
	
	function headerResetActions() {
		var html = "";
		// Display current mode
		html += "<b>";
		if (currentModeSlug === "metronome")
			html += "<span class=\"glyphicon glyphicon-time\"></span> Metronome";
		else
			html += "<span class=\"glyphicon glyphicon-cd\"></span> Backing Track";
		html += "</b>";
		$("#header-actions .current-mode").html(html);
		// Fill mode switcher
		html = "";
		html += "<button class=\"btn btn-xs btn-primary\" type=\"submit\">";
		if (currentModeSlug === "metronome")
			html += "<span class=\"glyphicon glyphicon-cd\"></span> Switch to <b>\"Backing Track\"</b> mode";
		else
			html += "<span class=\"glyphicon glyphicon-time\"></span> Switch to <b>Metronome</b> mode";
		html += "</button>";
		$("#header-actions .current-mode-switch").html(html);
		// Fill page actions buttons
		html = "";
		if (currentModeSlug === "metronome") {
			html += "<button id=\"header-action-add-pattern\" class=\"btn btn-sm btn-default\" type=\"submit\">Add pattern</button>";
		} else {
			//TODO
		}
		$("#header-actions .header-page-actions").html(html);
	}
	
	headerResetActions();
	
	$("body").on("click", "#header-action-add-pattern", function(e) {
		e.preventDefault();
		openPatternEditor();
		return false;
	});
	
});