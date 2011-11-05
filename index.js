module.exports = function(bot) {

	uptimeModule = new bot.Module();

	uptimeModule.load = function() {

		this.start = new Date().getTime();
		var self = this;

		bot.registerCommand(this.name, 'uptime', function(request) {
			var now = new Date().getTime();
			var uptime_seconds = Math.floor((now - self.start) / 1000);
			var intervals = {};
			intervals.day = Math.floor(uptime_seconds / 86400);
			intervals.hour = Math.floor((uptime_seconds % 86400) / 3600);
			intervals.minute = Math.floor(((uptime_seconds % 86400) % 3600) / 60);
			intervals.second = ((uptime_seconds % 86400) % 3600) % 60;

			var elements = []
			for (var interval in intervals) {
				var value = intervals[interval];
				if (value > 0) {
					elements.push(value + ' ' + interval + self.numPlural(value));
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

			bot.say(request.channel, 'I\'ve been sentient for ' + reply);
		});
	};

	uptimeModule.numPlural = function(num) {
		return (num != 1) ? 's' : '';
	};

	return uptimeModule;
};
