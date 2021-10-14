import { clamp, createElNS, addRandomnessWithRange } from '@/utility'
import defaultOpts from '@/default-opts'
import Wave from '@/wave'

// default options

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

	// make some props somewhat logarithmic
	this.randomFlowRate *= 1 / defaultOpts.flowRate.range[1]
	this.randomSwayRate *= 1 / defaultOpts.swayRate.range[1]

	// initialize waves
	this.waves = []

	for (let i = 0; i < this.fills.length; i++) {
		// non-randomized properties of individual wave
		const props = {
			id: i + 1,
			randomVelocity: this.randomVelocity,
			offset: this.offset,
			curviness: this.curviness,
			wavelength: this.wavelength,
			fill: this.fills[i],
			randomOffset: this.randomOffset,
			swayRate: this.swayRate
		}

		// add randomness to properties of individual waves
		// based on properties' default ranges and passed (or default) randomness coefficients
		// and add them to props object
		Array('complexity', 'flowRate', 'swayRate').forEach(prop => {
			props[prop] = addRandomnessWithRange(
				this[prop],
				this['random' + prop.charAt(0).toUpperCase() + prop.slice(1)],
				defaultOpts[prop].range[0],
				defaultOpts[prop].range[1]
			)
		})

		// create a wave based on props
		const wave = new Wave(props)

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
		this.waves.forEach(wave => svg.append(wave.svgEl))

		// append the root svg
		el.append(svg)

		// run the animation
		this.play()

		this.mounted = true

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
		this.animation.request = window.requestAnimationFrame(
			this.animationStep.bind(this)
		)
	}
}

export default waves
