import { clamp, createElNS } from '@/utility'
import Wave from '@/wave'

// default options
const defaultOpts = {
	count: {
		value: 1,
		range: [0, Infinity]
	},
	fills: {
		value: ['rgb(0,0,0)']
	},
	rate: {
		value: 1,
		range: [0.1, 10]
	},
	complexity: {
		value: 1,
		range: [1, 10]
	},
	randomVelocity: {
		value: 0.5,
		range: [0, 1]
	},
	curviness: {
		value: 0.4,
		range: [0, 1]
	},
	wavelength: {
		value: 1.5,
		range: [1, 20]
	}
}

function waves(opts = {}) {
	// if called as function return an instance
	if (!(this instanceof waves)) {
		return new waves(opts)
	}

	// process and assign passed options falling back to default
	for (let [k, v] of Object.entries(defaultOpts)) {
		const passedVal = opts[k]
		const defaultVal = v.value
		if (passedVal == undefined || typeof passedVal != typeof defaultVal)
			this[k] = defaultVal
		else if (v.range) this[k] = clamp(...v.range, passedVal)
		else this[k] = passedVal
	}

	// initialize waves
	this.waves = []

	for (let i = 0; i < this.count; i++) {
		const fill = this.fills[this.fills.length % i]
		const wave = new Wave({
			rate: this.rate,
			complexity: this.complexity,
			randomVelocity: this.randomVelocity,
			curviness: this.curviness,
			wavelength: this.wavelength,
			fill
		})

		this.waves.push(wave)
	}

	// initialize animation object
	this.animation = {
		isPlaying: false
	}
}

waves.prototype = {
	mount(el) {
		const svg = createElNS('svg', {
			viewBox: '0 0 100 50',
			width: '100%',
			height: '100%',
			preserveAspectRatio: 'none'
		})

		// clear mountpoint element before mount, cause we will take 100% space
		el.innerHTML = ''

		// nest all waves to the root svg
		this.waves.forEach(wave => svg.append(wave.svg))

		// append the root svg
		el.append(svg)

		// run the animation
		this.play()

		return this
	},

	play() {
		// if already playing do nothing
		if (this.animation.isPlaying) return this

		this.animation.request = window.requestAnimationFrame(
			this.animationStep.bind(this)
		)

		this.animation.isPlaying = true

		return this
	},

	stop() {
		// if already stopped do nothing
		if (!this.animation.isPlaying) return this

		window.cancelAnimationFrame(this.animation.request)
		this.animation.isPlaying = false

		return this
	},

	animationStep() {
		// run every wave's animation step
		this.waves.forEach(wave => wave.animationStep())

		// request next frame
		this.animation = window.requestAnimationFrame(
			this.animationStep.bind(this)
		)
	}
}

export default waves
