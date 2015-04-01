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

	$("body").on("click", "#header-actions .email", function(e) {
		e.preventDefault();
		if ($("#profile").length > 0) {
			$("#homepage-tabpanel a[href=\"#profile\"]").tab("show");
		}
		return false;
	});

});
