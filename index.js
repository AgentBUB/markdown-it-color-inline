'use strict';

module.exports = function (md) {
	return md.inline.ruler.push('inlinecolor', require('./lib/inlinecolor'));
};
