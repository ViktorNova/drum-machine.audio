/**
 * Tangos
 */

function scheduleNoteTangos(clapType, beatNumber, sounds, time) {
    // beatNumber : TODO
    // tangos : TODO
    if (clapType == 0) { // Palmas claras
    	if (beatNumber == 0) {
    		playSound(sounds.udu_1.buffer, time, sounds.udu_1.volume);
    		playSound(sounds.clara_3.buffer, time, sounds.clara_3.volume);
    	} else if (beatNumber == 1) {
    		playSound(sounds.clara_3.buffer, time, sounds.clara_3.volume);
    	} else if (beatNumber == 2) {
    		playSound(sounds.clara_2.buffer, time, sounds.clara_2.volume);
    	} else if (beatNumber == 3) {
    		playSound(sounds.udu_2.buffer, time, sounds.udu_2.volume);
    		playSound(sounds.clara_2.buffer, time, sounds.clara_2.volume);
    	} else if (beatNumber == 4) {
    		playSound(sounds.clara_3.buffer, time, sounds.clara_3.volume);
    	} else if (beatNumber == 6) {
    		playSound(sounds.clara_1.buffer, time, sounds.clara_1.volume);
    	} else if (beatNumber == 8) {
    		playSound(sounds.udu_1.buffer, time, sounds.udu_1.volume);
    		playSound(sounds.clara_3.buffer, time, sounds.clara_3.volume);
    	} else if (beatNumber == 9) {
    		playSound(sounds.clara_3.buffer, time, sounds.clara_3.volume);
    	} else if (beatNumber == 10) {
    		playSound(sounds.clara_1.buffer, time, sounds.clara_1.volume);
    	} else if (beatNumber == 11) {
    		playSound(sounds.udu_2.buffer, time, sounds.udu_2.volume);
    		playSound(sounds.clara_3.buffer, time, sounds.clara_3.volume);
    	} else if (beatNumber == 12) {
    		playSound(sounds.clara_2.buffer, time, sounds.clara_2.volume);
    	} else if (beatNumber == 14) {
    		playSound(sounds.clara_1.buffer, time, sounds.clara_1.volume);
    	}
    } else { // Palmas sordas
    	if (beatNumber == 0) {
    		playSound(sounds.sorda_2.buffer, time, 0.3);
    	} else if (beatNumber == 1) {
    		playSound(sounds.sorda_2.buffer, time, 0.3);
    	} else if (beatNumber == 2) {
    		playSound(sounds.sorda_1.buffer, time, sounds.sorda_1.volume);
    	} else if (beatNumber == 3) {
    		playSound(sounds.sorda_2.buffer, time, sounds.sorda_2.volume);
    	} else if (beatNumber == 4) {
    		playSound(sounds.sorda_2.buffer, time, 0.3);
    	} else if (beatNumber == 6) {
    		playSound(sounds.sorda_1.buffer, time, sounds.sorda_1.volume);
    	} else if (beatNumber == 8) {
    		playSound(sounds.sorda_2.buffer, time, 0.3);
    	} else if (beatNumber == 9) {
    		playSound(sounds.sorda_2.buffer, time, 0.3);
    	} else if (beatNumber == 10) {
    		playSound(sounds.sorda_1.buffer, time, sounds.sorda_1.volume);
    	} else if (beatNumber == 11) {
    		playSound(sounds.sorda_2.buffer, time, 0.3);
    	} else if (beatNumber == 12) {
    		playSound(sounds.sorda_1.buffer, time, sounds.sorda_1.volume);
    	} else if (beatNumber == 14) {
    		playSound(sounds.sorda_2.buffer, time, 0.3);
    	}
    }

    // On playing sounds, animate bars
    for ( var j = 0; j <= beatNumber; j++ ) {
        if ( j == beatNumber ) {
            if ( beatNumber == 4 || beatNumber == 10 || beatNumber == 14 || beatNumber == 18 || beatNumber == 22 ) {
                $('.bar_' + j)
                .velocity({ y: 5, height: [250, 300]}, {duration: 0, easing: "linear"})
                .velocity({  y: 250,height: 5}, {duration: 500, easing: "linear"});                 
            } else if ( beatNumber % 2 === 0 ) {
                $('.bar_' + j)
                .velocity({ y: 55, height: [200, 250]}, {duration: 0, easing: "linear"})
                .velocity({  y: 250,height: 5}, {duration: 500, easing: "linear"});                   
            } else {
                $('.bar_' + j)
                .velocity({ y: 155, height: [100, 150]}, {duration: 0, easing: "linear"})
                .velocity({  y: 250,height: 5}, {duration: 500, easing: "linear"});                 
            }
        }
    }
}

function drawTangos(i, bar, container) {
	var number = null;
	if ( i === 0 ) {
		number = i + 1;
	} else {
		number = i - ( (i / 2) - 1);
	}

	// Draw bars
	container.append('<rect class="bar bar_' + i + '" x=' + bar.x + ' y=' + bar.y + ' fill="' + bar.fill + '" width=' + bar.width + ' height=' + bar.height + '/>');

	// Draw numbers
    if ( i % 2 === 0 ) {
        container.append('<text class="number number_' + i + '" x=' + (bar.x + bar.width / 2.2) + ' y=' + (bar.y + 25) + ' fill="lightgray" font-size="16" font-family="sans-serif" font-weight="bold">' + number + '</text>');
    }

    // Set styles
    if ( i == 0 || i == 8 ) {
        $('.bar_' + i).attr('fill', 'firebrick');
        $('.number_' + i).attr('fill', 'black');
    }
}
