var os = require('os');

module.exports = function(bot, module) {

	module.start = new Date().getTime();

	module.addCommand({
		match: 'uptime',
		func: function(request) {
			var now = new Date().getTime();
			var uptime_seconds = Math.floor((now - module.start) / 1000);
			request.reply = 'I\'ve been sentient for ' + secondsToString(uptime_seconds);
			bot.reply(request);
		}
	});

	module.addCommand({
		match: 'system uptime',
		func: function(request) {
			request.reply = 'System has been running for ' + secondsToString(Math.floor(os.uptime()));
			bot.reply(request);
		}
	});

};

function secondsToString(seconds) {
	var intervals = {};
	intervals.day = Math.floor(seconds / 86400);
	intervals.hour = Math.floor((seconds % 86400) / 3600);
	intervals.minute = Math.floor(((seconds % 86400) % 3600) / 60);
	intervals.second = ((seconds % 86400) % 3600) % 60;

	var elements = [];
	for (var interval in intervals) {
		var value = intervals[interval];
		if (value > 0) {
			elements.push(value + ' ' + interval + numPlural(value));
		}
	}

	var reply = '';
	if (elements.length > 1) {
		var last = elements.pop();
		reply = elements.join(', ');
		reply += ' and ' + last;
	}
	else {
		reply = elements[0];
	}
	return reply;
}

function numPlural(num) {
	return (num != 1) ? 's' : '';
}
