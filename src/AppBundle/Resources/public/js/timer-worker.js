var timerId = null;
var interval = 100;

self.onmessage = function(e) {
	if (e.data === "start") {
		timerId = setInterval(function() {
			postMessage("tick");
		},interval)
	} else if (e.data.interval) {
		interval = e.data.interval;
		if ( timerId ) {
			clearInterval(timerId);
			timerId = setInterval(function() {
				postMessage("tick");
			},interval)
		}
	} else if (e.data === "stop") {
		clearInterval(timerId);
		timerId = null;
	} else if (e.data === "tick") {
		console.log("tick");
	}
};
