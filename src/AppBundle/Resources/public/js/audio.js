function loadSound(soundId) {
console.log("loadSound(" + soundId + ")");
	var alreadyLoaded = false;
	$.each(window.drumMachine.loadedSounds, function(loadedSoundIndex, loadedSoundId) {
		if (loadedSoundId === soundId)
			alreadyLoaded = true;
	});
	if (! alreadyLoaded) {
		$.each(window.drumMachine.sounds, function(soundIndex, sound) {
			if (sound.id === soundId) {
				var request = new XMLHttpRequest();
				request.open('GET', "/sound/" + sound.slug + "/sound." + window.drumMachine.format, true);
				request.responseType = 'arraybuffer';
				request.onload = function() {
					// request.response is encoded... so decode it now
					window.drumMachine.audioContext.decodeAudioData(request.response, function(buffer) {
						window.drumMachine.sounds[soundIndex].buffer = buffer;
					}, function() {
						console.log('Error loading sound with id ' + sound.id);
					});
				}
				request.send();
				window.drumMachine.loadedSounds.push(soundId);
			}
		});
	}
}

function playSound(soundId, start, vol) {
console.log("playSound()");
    // Create source, sounds gain and master gain
	var source = window.drumMachine.audioContext.createBufferSource(); 
	var gainNode = window.drumMachine.audioContext.createGain();
	var masterGainNode = window.drumMachine.audioContext.createGain();

	// Set sounds and master gain nodes
	gainNode.gain.value = vol;
	masterGainNode.gain.value = window.drumMachine.masterVolume / 100;
	$.each(window.drumMachine.sounds, function(soundIndex, sound) {
		if (sound.id === soundId)
			source.buffer = sound.buffer;
	});

	// Connect everything
	source.connect(gainNode);
	gainNode.connect(masterGainNode);
	masterGainNode.connect(window.drumMachine.audioContext.destination);

	// Play
	source.start(start);
}

function scheduler() {
//console.log("scheduler()");
	while (window.drumMachine.nextTickTime < window.drumMachine.audioContext.currentTime + window.drumMachine.scheduleAheadTime) {
		scheduleNote();
		nextNote();
	}
}

function scheduleNote() {
console.log("scheduleNote()");
	// Find where we are in the pattern's rhythmic structure
	var tickCnt = 0;
	var noteIndexInPattern = 0;
	for (var i = 0; i < window.drumMachine.currentPattern.rhythmicStructure.nbRepetitions; i ++) {
		$.each(window.drumMachine.currentPattern.rhythmicStructure.patterns, function(patternIndex, pattern) {
			for (var j = 0; j < pattern.nbRepetitions; j++)
				for (var k = 0; k < pattern.nbNotes; k++) {
					// If we went further than the next tick, it means
					// there is no beat in the pattern's rhythmic structure
					// for the current tick index. Nothing will have to be played, then.
					if (tickCnt > window.drumMachine.currentTickIndex)
						return ;
					if (tickCnt === window.drumMachine.currentTickIndex) {
						$.each(window.drumMachine.currentPattern.voices, function(voiceIndex, voice) {
							if (voice.soundOccurrences[noteIndexInPattern]) {
								playSound(voice.soundId, window.drumMachine.nextTickTime, voice.volume);
							}
						});
					}
					var toAdd = 0;
					switch (pattern.noteType) {
						case 1:
							toAdd = 16;
							break ;
						case 2:
							toAdd = 8;
							break ;
						case 4:
							toAdd = 4;
							break ;
						case 8:
							toAdd = 2;
							break ;
						case 16:
							toAdd = 1;
							break ;
						default :
							console.log("[ERROR] Unknown note type " + pattern.noteType);
							return null;
					}
					tickCnt += toAdd;
					noteIndexInPattern++;
				}
		});
	}
}

function nextNote() {
	// Calculate length of a quarter note
	var secondsPerBeat = 60.0 / window.drumMachine.tempo;    

	// Calculate the next tick's time
	// We send one tick for each sixteenth note
	window.drumMachine.nextTickTime += 0.125 * secondsPerBeat;    

	// Advance the tick number, back to zero when loop finished
	window.drumMachine.currentTickIndex++;
	if (window.drumMachine.currentTickIndex >= getTotalTicksCount(window.drumMachine.currentPattern)) {
		window.drumMachine.currentTickIndex = 0;
	}
}

function getTotalTicksCount(pattern) {
	var res = 0;
	for (var i = 0; i < pattern.rhythmicStructure.nbRepetitions; i ++) {
		$.each(pattern.rhythmicStructure.patterns, function(patternIndex, pattern) {
			for (var j = 0; j < pattern.nbRepetitions; j++)
				for (var k = 0; k < pattern.nbNotes; k++) {
					switch (pattern.noteType) {
						case 1:
							res += 16;
							break ;
						case 2:
							res += 8;
							break;
						case 4:
							res += 4;
							break ;
						case 8:
							res += 2;
							break ;
						case 16:
							res += 1;
							break ;
						default:
							console.log("Unknown note type " + pattern.noteType);
							return null;
							break ;
					}
				}
		});
	}
	return res;
}

function playPattern(pattern) {
	window.drumMachine.currentPattern = pattern;
	var playButton = $('.play > .glyphicon');
	// start playing
	if (! window.drumMachine.isPlaying) { 
		window.drumMachine.currentTickIndex = 0;
		window.drumMachine.nextTickTime = window.drumMachine.audioContext.currentTime;
		// change play button
		playButton.removeClass('glyphicon-play').addClass('glyphicon-stop');
		// Send message to worker
		window.drumMachine.timerWorker.postMessage("start");
		window.drumMachine.isPlaying = true;
	} else { 
		// change play button
		playButton.removeClass('glyphicon-stop').addClass('glyphicon-play');
		// Send message to worker
		window.drumMachine.timerWorker.postMessage("stop");
		window.drumMachine.isPlaying = false;
	}
}

$(document).ready(function() {

	// Set the message worker
	window.drumMachine.timerWorker = new Worker(window.drumMachine.timerWorkerFilename);
	window.drumMachine.timerWorker.onmessage = function(e) {
		if (e.data == "tick") {
//console.log("tick!");
			scheduler();
		} else {
			console.log("message: " + e.data);
		}
	};
	window.drumMachine.timerWorker.postMessage({"interval": window.drumMachine.schedulerTimeInterval});

});
