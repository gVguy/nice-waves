import { createElNS, random, addRandomnessWithRange } from '@/utility'
import { stringifyPath, translatePath, morphPathVelocity } from '@/path'

export default class Wave {
	constructor(props) {
		// assign passed props
		for (let prop in props) {
			this[prop] = props[prop]
		}

		// complexity should be a round int
		this.complexity = Math.round(props.complexity)

		// actual path length (root svg viewbox width is 100)
		this.period = this.wavelength * 100

		// generate wave data object
		this.path = getWave.call(this)

		// and turn it to svg string (double length)
		this.pathDoubleString = this.path.clone().double().string

		// calculate wave offset
		// max offset is the distance between two high points
		const maxOffset = this.period / this.complexity
		let offset = this.offset * this.id * maxOffset
		offset = addRandomnessWithRange(
			offset,
			this.randomOffset,
			0,
			maxOffset * 2
		)

		// create individual wave svg elements
		this.svgEl = createElNS('svg', {
			width: this.period * 2,
			x: -offset
		})
		this.pathEl = createElNS('path', {
			d: this.pathDoubleString,
			fill: this.fill
		})

		// nest the svg elements
		this.svgEl.append(this.pathEl)

		// if wave morphing is enabled
		// create a morph TO path
		// and add animate node to svg
		const swayDuration = 20.3 - 20 * this.swayRate
		if (this.swayRate) {
			this.animateEl = createElNS('animate', {
				attributeName: 'd',
				values:
					this.pathDoubleString +
					';' +
					this.path.clone().morph(this.swayVelocity).double().string +
					';' +
					this.pathDoubleString,
				dur: swayDuration + 's',
				repeatCount: 'indefinite',
				calcMode: 'spline',
				keyTimes: '0; 0.5; 1',
				keySplines: '0.4 0 0.6 1;'.repeat(2)
			})

			this.pathEl.append(this.animateEl)
		}
	}

	// updates x offset value of the wave
	set x(val) {
		this.svgEl.setAttribute('x', val)
	}

	// returns x offset value of the wave
	get x() {
		return Number(this.svgEl.getAttribute('x'))
	}

	// called from the root animation loop
	animationStep() {
		// calculate new x value
		let x = this.x - this.flowRate

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
	// from first high point to period length (0 will be added manually later)
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
		let rand = random(0, 23) * this.randomVelocity
		if (Math.round(x) != Math.round(this.period)) {
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

	// add open and close
	// return Path object
	return new Path({
		open: [
			{
				cmd: 'M',
				points: [{ x: 0, y: 48 }]
			}
		],
		curve: data,
		close: [
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
		]
	})
}

class Path {
	constructor(data) {
		this.open = data.open
		this.curve = data.curve
		this.close = data.close
	}

	double() {
		this.curve = this.curve.concat(
			translatePath(
				this.curve,
				'x',
				this.curve[this.curve.length - 1].points[2].x
			),
			this.close
		)
		return this
	}

	morph(v = 1) {
		this.curve = morphPathVelocity(this.curve, v)
		return this
	}

	clone() {
		return new Path(this)
	}

	get string() {
		return stringifyPath(this.open.concat(this.curve, this.close))
	}
}
