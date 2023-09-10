'use strict';

var parseColorName = (state, start, disableNested) => {
	let level = 1;
	let found = false;
	let prevPos;
	let labelEnd = -1;
	const max = state.posMax;
	const oldPos = state.pos;
	state.pos = start + 1;
	while (state.pos < max) {
		const marker = state.src.charCodeAt(state.pos);
		if (marker === 125) {
			level--;
			if (level === 0) {
				found = true;
				break;
			}
		}
		prevPos = state.pos;
		state.md.inline.skipToken(state);
		if (marker === 123) {
			if (prevPos === state.pos - 1) {
				level++;
			} else if (disableNested) {
				state.pos = oldPos;
				return -1;
			}
		}
	}
	if (found) {
		labelEnd = state.pos;
	}
	state.pos = oldPos;
	return labelEnd;
};

var parseContent = (state, start) => {
	let pos = start;
	const max = state.posMax;
	if (pos < max && state.src.charCodeAt(pos) === 40) {
		pos++;
		let level = 1;
		while (pos < max) {
			const char = state.src.charCodeAt(pos);
			if (char === 41) {
				level--;
				if (level === 0) {
					return pos;
				}
			} else if (char === 40) {
				level++;
			}
			pos++;
		}
		return -1;
	} else {
		return -1;
	}
};

function inlinecolor(state, silent) {
	const max = state.posMax;
	if (state.src.charCodeAt(state.pos) !== 123) {
		return false;
	}
	const labelStart = state.pos + 1;
	const labelEnd = parseColorName(state, state.pos, true);
	if (labelEnd < 0) {
		return false;
	}
	const colorName = state.src.substring(labelStart, labelEnd);
	const contentStart = labelEnd + 2;
	const contentEnd = parseContent(state, labelEnd + 1);
	if (contentEnd < 0) {
		return false;
	}
	if (!silent) {
		state.pos = contentStart;
		state.posMax = contentEnd;
		const openToken = state.push('color_open', 'span', 1);
		openToken.attrs = [['id', defaultIdName]];
		openToken.attrs.push(['style', `color: ${colorName};`]);
		openToken.info = colorName;
		state.md.inline.tokenize(state);
		const closeToken = state.push('color_close', 'span', -1);
		closeToken.info = colorName;
	}
	state.pos = contentEnd + 1;
	state.posMax = max;
	return true;
}

module.exports = inlinecolor;
