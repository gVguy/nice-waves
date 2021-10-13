import { createElNS, random } from '@/utility'
import { stringifyPath, translatePath } from '@/path'

export default class Wave {
	constructor(props) {
		// assign passed props
		this.rate = props.rate
		this.complexity = Math.round(props.complexity)
		this.randomVelocity = props.randomVelocity
		this.curviness = props.curviness
		this.wavelength = props.wavelength
		this.fill = props.fill

		// actual path length (root svg viewbox width is 100)
		this.period = this.wavelength * 100

		// generate wave data object
		this.pathData = getWave.call(this)

		// create individual wave svg elements
		this.svg = createElNS('svg', {
			width: this.period * 2,
			x: -random(0, this.period * 0.5)
		})
		this.path = createElNS('path', {
			d: this.pathString,
			fill: this.fill
		})

		// nest the svg elements
		this.svg.append(this.path)
	}

	// transforms path data to svg string format
	get pathString() {
		return stringifyPath(this.pathData)
	}

	// updates x offset value of the wave
	set x(val) {
		this.svg.setAttribute('x', val)
	}

	// returns x offset value of the wave
	get x() {
		return Number(this.svg.getAttribute('x'))
	}

	// called from the root animation loop
	animationStep() {
		// calculate new x value
		let x = this.x - this.rate

		// if new x will make the wave scroll too far
		// use the similar scroll position of the first period instead
		if (x < -this.period) x += this.period

		this.x = x
	}
}

//returns wave data
function getWave() {
	// initialize an array based on complexity
	// containing x coordinates of high and low points
	// from first high point to 100 (0 will be added manually later)
	const points = this.complexity * 2
	const step = this.period / points
	let data = Array(points)
		.fill(step)
		.map((i, k) => i * (k + 1))

	// data contains only x coordinates for now
	// transform it into path data
	let y = 48
	let lastY = 48
	data = data.map(x => {
		// alternate high and low points
		// and add randomness to y
		// unless processing last point, which should remain unrandomized
		let rand = random(0, 46) * this.randomVelocity
		if (x != this.period) {
			y = y < 25 ? 48 - rand : 2 + rand
		} else {
			y = 48
		}

		// transform every x coordinate into cubic-bezier command
		const r = {
			cmd: 'C',
			points: [
				{ x: x - step + step * this.curviness, y: lastY },
				{ x: x - step * this.curviness, y },
				{ x, y }
			]
		}

		lastY = y

		return r
	})

	// make path twice its length for scrolling
	data.push(...translatePath(data, 'x', data[data.length - 1].points[2].x))

	// add starting point
	data.unshift({
		cmd: 'M',
		points: [{ x: 0, y: 48 }]
	})

	// close path
	data.push(
		{
			cmd: 'V',
			points: [{ y: 50 }]
		},
		{
			cmd: 'H',
			points: [{ y: 0 }]
		},
		{
			cmd: 'Z'
		}
	)

	return data
}
