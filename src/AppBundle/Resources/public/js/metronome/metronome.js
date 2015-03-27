window.metronome = {
	patterns: null,
	sounds: null
};
// Set variables
var audioContext = null;
var isPlaying = false;      		// Are we currently playing?
var startTime;              		// The start time of the entire sequence.
var currentNote;        			// What note is currently last scheduled?
var palo = 'buleria-6';				// Default rhythm style
var tempo =  parseInt($('#' + palo + ' .tempo').val()) / 2; // Set default tempo
var masterVolume = parseInt($('#' + palo + " .masterVolume").val()); // Set default master volume
var lookahead = 25.0;       		// How frequently to call scheduling function 
                            		//(in milliseconds)
var scheduleAheadTime = 0.1;    	// How far ahead to schedule audio (sec)
                            		// This is calculated from lookahead, and overlaps 
                            		// with next interval (in case the timer is late)
var nextNoteTime = 0.0;     		// when the next note is due.
var noteResolution = 0;     		// 0 = counter times, 1 = times only
var clapType = 0;			// Default clap = light claps
var notesInQueue = [];      		// the notes that have been put into the web audio,
                            		// and may or may not have played yet. {note, time}
var timerWorker = null;     		// The Web Worker used to fire timer messages

var numberOfTimes = 12;				// Default rhythm times
var container = $('svg.visualizer');// Select the drawing svg container

// Set functions
function playSound(buffer, start, vol, callback) {
    // Create source, sounds gain and master gain
	var source = audioContext.createBufferSource(); 
	var gainNode = audioContext.createGain();
	var masterGainNode = audioContext.createGain();

	// Set sounds and master gain nodes
	gainNode.gain.value = vol;
	masterGainNode.gain.value = masterVolume / 100;
	source.buffer = buffer;

	// Connect everything
	source.connect(gainNode);
	gainNode.connect(masterGainNode);
	masterGainNode.connect( audioContext.destination );

	// Play
	source.start(start);

	callback && callback();
};

function nextNote() {
	// Calculate current beat length
	var secondsPerBeat = 60.0 / tempo;    

	// Add beat length to last beat time  
	nextNoteTime += 0.25 * secondsPerBeat;    

	// Advance the beat number, back to zero when loop finished
	currentNote++;    
	if (currentNote == numberOfTimes) {
		currentNote = 0;
	}
}

function scheduleNote( beatNumber, time ) {
	// push the note on the queue, even if we're not playing.
	notesInQueue.push( { note: beatNumber, time: time } );

	// If option "times only" selected, don't play counter times
	if ( (noteResolution==1) && (beatNumber%2) ) {
		return; 
	}

	switch (palo) {
		case 'buleria-6':
			scheduleNoteBuleria6(clapType, beatNumber, time);
			break ;
		case 'buleria-12':
			scheduleNoteBuleria12(clapType, beatNumber, time);
			break ;
		case 'solea':
			scheduleNoteSolea(clapType, beatNumber, time);
			break ;
		case 'siguiriya':
			scheduleNoteSiguiriya(clapType, beatNumber, time);
			break ;
		case 'fandangos':
			scheduleNoteFandangos(clapType, beatNumber, time);
			break ;
		case 'tangos':
			scheduleNoteTangos(clapType, beatNumber, time);
			break ;
		case 'rumba':
			scheduleNoteRumba(clapType, beatNumber, time);
			break ;
		default :
			console.log("Unknown palo \"" + palo + "\"");
			break ;
	}
}

function scheduler() {
	// while there are notes that will need to play before the next worker interval, 
	// schedule them and advance the pointer.
	while ( nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
		scheduleNote( currentNote, nextNoteTime );
		nextNote();
	}
}

function play() {
	isPlaying = !isPlaying;

	var playButton = $('.play > .glyphicon');

	// start playing
	if (isPlaying) { 

		currentNote = 0;
		nextNoteTime = audioContext.currentTime;

		// change play button
		playButton.removeClass('glyphicon-play').addClass('glyphicon-stop');
		$('.play').toggleClass('active');

		// Send message to worker
		timerWorker.postMessage("start");
		return "stop";

		// stop playing
	} else { 

		// change play button
		playButton.removeClass('glyphicon-stop').addClass('glyphicon-play');
		$('.play').removeClass('active');

		// Send message to worker
		timerWorker.postMessage("stop");
		return "play";

	}
}

function drawSvg() {

	// Take measures
	var x = Math.floor( 1200 / numberOfTimes );
	var y = x - Math.floor( 1200 / (numberOfTimes + 1) );

	// Draw svg
	for (  i = 0; i < numberOfTimes; i++ ) {

		var bar = {
			'x': (x * i + y) - y / 2,
			'y': 250,
			'width': x - y,
			'height': 5,
			'fill': 'tomato'
		};

		var number = null;
 
		switch (palo) {
			case 'buleria-6':
				drawBuleria6(i, bar, container);
				break ;
			case 'buleria-12':
				drawBuleria12(i, bar, container);
				break ;
			case 'solea':
				drawSolea(i, bar, container);
				break ;
			case 'siguiriya':
				drawSiguiriya(i, bar, container);
				break ;
			case 'fandangos':
				drawFandangos(i, bar, container);
				break ;
			case 'tangos':
				drawTangos(i, bar, container);
				break ;
			case 'rumba':
				drawRumba(i, bar, container);
				break ;
			default :
				console.log("Unknown palo \"" + palo + "\"");
				break ;
		}

	}

	// Necessary for jQuery to create svg
	$(".visualizer_div").html($(".visualizer_div").html());
	console.log('drawn visualizer');

}

function resetDraw() {
	// Erase svg and draw again
	container.contents().remove();
	drawUi();
}

function drawUi() {
	var html = "";

	// Fill #palos
	$.each(window.metronome.patterns, function(patternIndex, patternData) {
		html += "<li role=\"presentation\" ";
		if (patternIndex == 0)
			html += "class=\"active\"";
		html += ">";
		html += "<a href=\"#" + patternData.slug + "\" aria-controls=\"" + patternData.slug
			+ "\" role=\"tab\" data-toggle=\"tab\" id=\"patterns-list-item-"
			+ patternData.slug + "\">";
		html += patternData.label;
		html += "</a>";
		html += "</li>";
	});
	$("#palos").html(html);

	// Fill .tab-content
	html = "";
	$.each(window.metronome.patterns, function(patternIndex, patternData) {

		html += "<div id=\"" + patternData.slug + "\" role=\"tabpanel\" class=\"tab-pane fade in ";
		if (patternIndex === 0)
			html += "active";
		html += "\">";

		html += "<section class=\"controls row\">";
		html += "<div class=\"col-xs-4 col-sm-3\">";
		html += "<h3><small>Play :</small></h3>";
		html += "<button class=\"play\">";
		html += "<span class=\"glyphicon glyphicon-play\" aria-hidden=\"true\"></span>";
		html += "</button>";
		html += "</div>";

		html += "<div class=\"col-xs-4 col-sm-3\">";
		html += "<h3><small>Change velocity :</small></h3>"
		html += "<input class=\"tempo\" value=\"200\">";
		html += "</div>";

		html += "<div class=\"col-xs-4 col-sm-3\">";
		html += "<h3><small>Change volume :</small></h3>";
		html += "<input class=\"masterVolume\" value=\"80\">";
		html += "</div>";

		html += "<div class=\"col-xs-12 col-sm-3\">";
		html += "<div class=\"row\">";
		html += "<div class=\"col-xs-6 col-sm-12\">";
		html += "<h3><small>Change resolution :</small></h3>";
		html += "<div class=\"btn-group\" data-toggle=\"buttons\">";
		html += "<label class=\"btn btn-default active\">";
		html += "<input type=\"radio\" name=\"options\" id=\"option1\" onchange=\"noteResolution = 0;\" autocomplete=\"off\" checked /> Contra tiempos";
		html += "</label>";
		html += "<label class=\"btn btn-default\">";
		html += "<input type=\"radio\" name=\"options\" id=\"option2\" onchange=\"noteResolution = 1;\" autocomplete=\"off\" /> Tiempos";
		html += "</label>";
		html += "</div>";
		html += "</div>";
		html += "<div class=\"col-xs-6 col-sm-12\">";
		html += "<h3><small>Change palmas :</small></h3>";
		html += "<div class=\"btn-group\" data-toggle=\"buttons\">";
		html += "<label class=\"btn btn-default active\">";
		html += "<input type=\"radio\" name=\"options\" id=\"option1\" onchange=\"clapType = 0;\" autocomplete=\"off\" checked /> Claras";
		html += "</label>";
		html += "<label class=\"btn btn-default\">";
		html += "<input type=\"radio\" name=\"options\" id=\"option2\" onchange=\"clapType = 1;\" autocomplete=\"off\" /> Sordas";
		html += "</label>";
		html += "</div>";
		html += "</div>";
		html += "</div>";
		html += "</div>";
		html += "</section>";
		
		html += "<p class=\"text-danger\">Info : </p>";

		html += "<section class=\"visualizer_div\">";
		html += "<svg version=\"1.1\" class=\"visualizer\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\""
			+ "width=\"100%\" height=\"300px\" viewBox=\"0 0 1200 300\" enable-background=\"new 0 0 1200 300\" xml:space=\"preserve\">";
		html += "</svg>";
	    html += "</section>";

	    html += "</div>";
	});
	$("#metronome-tab-content").html(html);
	
	$.each(window.metronome.patterns, function(patternIndex, patternData) {
		// Set volume button
		$('#' + patternData.slug + ' .masterVolume').knob({
			width:104,
			height:104,            
			min:0,
			max:100,
			step:1,
			angleArc:360,
			displayInput:true,
			thickness:'.2',
			inputColor:'#777',
			font:'arial',
			fontWeight:'normal',
			fgColor:'tomato',             
			release:function (v) { 
				masterVolume = v;
				console.log('new masterVolume = ' + v);
		        }
		});
	    // Set tempo button
	    $('#' + patternData.slug + ' .tempo').knob({
	        width:104,
	        height:104,
	        min:60,
	        max:350,
	        step:1,
	        angleArc:360,
	        displayInput:true,
	        thickness:'.2',
	        inputColor:'#777',
	        font:'arial',
	        fontWeight:'normal',
	        fgColor:'tomato',
	        release:function (v) {
				tempo = v / 2;
				console.log('new tempo = ' + (v / 2) );
	            var _txt = null;
	            var _txtDiv = $('#' + patternData.slug + ' .text-danger');

	            if ( v >= 270 ) {
	            	_txt = "Your rhythm is very fast ...";
	            	if ( _txtDiv.css('opacity') == 0 ) {
	            		_txtDiv.append(_txt);
	            		_txtDiv.animate({'opacity': '1'}, 300);
	            	} else {
	            		_txtDiv.empty().append("Info : ");
	            		_txtDiv.append(_txt);
	            	}
	            } else if ( v <= 80 ) {
	            	_txt = "Your rhythm is very slow ...";
	            	if ( _txtDiv.css('opacity') == 0 ) {
	            		_txtDiv.append(_txt);
	            		_txtDiv.animate({'opacity': '1'}, 300);
	            	} else {
	            		_txtDiv.empty().append("Info : ");
	            		_txtDiv.append(_txt);
	            	}
	            } else {
	            	if ( _txtDiv.css('opacity') == 1 ) {
	            		_txtDiv.animate({'opacity': '0'}, 300, function() {
	            			_txtDiv.empty();
	            		});
	            	}
	            	
	            }
	        }
	    });
	});
	
	// Draw SVG
	drawSvg();
}

// *************************************************************************
// *************************************************************************
// On document ready, load buttons, tempo and volume values, init() function
// *************************************************************************
// *************************************************************************

$(document).ready(function() {
	
	window.metronome.patterns = patterns;

	// Create Web Audio API audio context
	window.AudioContext = window.AudioContext || window.webkitAudioContext;

	audioContext = new AudioContext();

	// Prepare loading sounds
	var format = (new Audio().canPlayType('audio/ogg') !== '' ? 'ogg' : 'mp3');

	function loadSoundObj(soundIndex) {
		var request = new XMLHttpRequest();
		request.open('GET', "/sound/" + window.metronome.sounds[soundIndex].slug + "/sound." + format, true);
		request.responseType = 'arraybuffer';

		request.onload = function() {
			// request.response is encoded... so decode it now
			audioContext.decodeAudioData(request.response, function(buffer) {
				window.metronome.sounds[soundIndex].buffer = buffer;
			}, function() {
				message.call($wrapper, 'error', 'Error loading ' + obj["src"]);
			});
		}

		request.send();
	}

	// Load sounds
	window.metronome.sounds = sounds;
	$.each(window.metronome.sounds, function(soundIndex, soundData) {
		loadSoundObj(soundIndex);
	});

	// Set the message worker
	timerWorker = new Worker(metronomeWorkerFilename);

	timerWorker.onmessage = function(e) {
		if (e.data == "tick") {
			// console.log("tick!");
			scheduler();
		} else {
			console.log("message: " + e.data);
		}
	};
	timerWorker.postMessage({"interval":lookahead});

	// Set buttons
	$("body").on('click', ".play", function() {
		play();
	});

	$(document).keydown(function(e) {
		if (e.keyCode == '32') {
			play();
		}
	});

	// Change tabs
	$("body").on("click", "#palos a", function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	// On tab change, set actual rhythm datas
	$('#palos a').on('shown.bs.tab', function (e) {

		// newly activated tab : e.target
		// previous active tab : e.relatedTarget

		if (isPlaying = true) {
			play();
		} 

		// Set rhythm style
		palo = $(e.target).attr('aria-controls');

		// Reset options
		noteResolution = 0;
		clapType = 0;

		// Select the drawing svg container
		container = $('svg.visualizer'); 

		// Set rhythm tempo
		tempo = parseInt($("#" + palo + " .tempo").val()) / 2;

		// Set number of times
		switch (palo) {
			case 'buleria-6':
				numberOfTimes = 12;
				break ;
			case 'buleria-12':
				numberOfTimes = 24;
				break ;
			case 'solea':
				numberOfTimes = 24;
				break ;
			case 'siguiriya':
				numberOfTimes = 24;
				break ;
			case 'fandangos':
				numberOfTimes = 24;
				break ;
			case 'tangos':
				numberOfTimes = 16;
				break ;
			case 'rumba':
				numberOfTimes = 16;
				break ;
			default :
				console.log("Unknown palo \"" + palo + "\"");
				break ;
		}

		console.log('tab shown : ' + palo + ', tempo : ' + tempo);

		// Reset svg
		resetDraw();

	});
    
	$(window).on("orientationchange", resetDraw);
	$(window).on("resize", resetDraw); 

});

