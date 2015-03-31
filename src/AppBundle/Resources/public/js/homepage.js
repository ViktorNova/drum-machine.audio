$(document).ready(function() {

	$('#main-controls .master-volume').knob({
        width: 60,
        height: 60,
        min: 0,
        max: 100,
        step: 1,
        angleArc: 360,
        displayInput: true,
        thickness: '.2',
        inputColor: '#777',
        font: 'arial',
        fontWeight: 'normal',
        fgColor: "#337ab7",             
        release: function (v) { 
        	window.drumMachine.masterVolume = v;
        }
	});

	$('#main-controls .tempo').knob({
        width: 60,
        height: 60,
        min: 10,
        max: 350,
        step: 1,
        angleArc: 360,
        displayInput: true,
        thickness: '.2',
        inputColor: '#777',
        font: 'arial',
        fontWeight: 'normal',
        fgColor: "#337ab7",             
        release: function (v) { 
        	window.drumMachine.tempo = v;
        }
	});

});
