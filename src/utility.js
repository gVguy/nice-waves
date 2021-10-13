// returns a random number in defined range
export function random(from, to) {
	return Math.floor(from + Math.random() * (to - from + 1))
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
