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

		// sway rate should be inverse and times 100
		this.swayRate = this.swayRate ? 501 - this.swayRate * 100 : 0
		console.log(this.swayRate)

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
			fill: this.fill,
			'shape-rendering': 'geometricPrecision'
		})

		// nest the svg elements
		this.svgEl.append(this.pathEl)

		// if sway is enabled
		// create a morphed path and an array of morph steps
		// to be referenced in animation loop
		if (this.swayRate) {
			const from = this.path.curve
			const to = this.path.clone().morph().curve
			this.swaySteps = from.map((fromCmd, i) => {
				return fromCmd.points.map((point, j) => {
					const fromY = point.y
					const toY = to[i].points[j].y
					const direction = fromY < toY ? 1 : -1
					return (
						((Math.max(fromY, toY) - Math.min(fromY, toY)) /
							this.swayRate) *
						direction
					)
				})
			})
			this.swayDirection = 1
			this.swayIndex = 0
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
		this.flowStep()
		this.swayStep()
	}

	// move whole wave on the x-axis
	flowStep() {
		if (!this.flowRate) return

		// calculate new x value
		let x = this.x - this.flowRate

		// if new x will make the wave scroll too far
		// use the similar scroll position of the first period instead
		if (x < -this.period) x += this.period

		this.x = x
	}

	// move each path Y point up or down a pre-calculated distance
	swayStep() {
		if (!this.swayRate) return

		if (this.swayIndex >= this.swayRate) {
			// reached the end of animation, turn back
			this.swayDirection = 0 - this.swayDirection
			this.swayIndex = 0
		}
		this.path.curve.forEach((cmd, i) => {
			cmd.points.forEach((point, j) => {
				point.y += this.swaySteps[i][j] * this.swayDirection
			})
		})
		this.swayIndex++
		this.pathEl.setAttribute('d', this.path.string)
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
		let rand = random(0, 23) * this.randomHeight
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
