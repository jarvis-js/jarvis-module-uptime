module.exports = function(bot, module) {

	module.load = function() {

		module.start = new Date().getTime();

		module.addCommand('uptime', function(request) {
			var now = new Date().getTime();
			var uptime_seconds = Math.floor((now - module.start) / 1000);
			var intervals = {};
			intervals.day = Math.floor(uptime_seconds / 86400);
			intervals.hour = Math.floor((uptime_seconds % 86400) / 3600);
			intervals.minute = Math.floor(((uptime_seconds % 86400) % 3600) / 60);
			intervals.second = ((uptime_seconds % 86400) % 3600) % 60;

			var elements = []
			for (var interval in intervals) {
				var value = intervals[interval];
				if (value > 0) {
					elements.push(value + ' ' + interval + module.numPlural(value));
				}
			}

			var reply = '';
			if (elements.length > 1) {
				var last = elements.pop();
				reply = elements.join(', ');
				reply += ' and ' + last;
			}
			else {
				reply = elements.join(', ');
			}

			request.reply = 'I\'ve been sentient for ' + reply;
			bot.respond(request);
		});
	};

	module.numPlural = function(num) {
		return (num != 1) ? 's' : '';
	};

};
