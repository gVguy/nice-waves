// returns a random number in defined range
export function random(from, to) {
	return Math.floor(from + Math.random() * (to - from + 1))
}

// adds randomness to a given number (n)
// based on random coefficient [0-1] (r)
// but makes sure it's within defined range (min, max)
export function addRandomnessWithRange(n, r, min, max) {
	const randRange = (max - min) * r
	n -= randRange * 0.5
	if (n < min) n = min
	else if (n + randRange > max) n = max - randRange
	return n + Math.random() * randRange
}

// clips a number to be in defined range
export function clamp(from, to, num) {
	return Math.min(to, Math.max(num, from))
}

// creates ns elements with tags
export function createElNS(tag, attrs) {
	const el = document.createElementNS('http://www.w3.org/2000/svg', tag)
	for (let [attr, value] of Object.entries(attrs)) {
		el.setAttributeNS(null, attr, value)
	}
	return el
}
