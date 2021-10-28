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

	// some props should be half its value
	this.curviness *= 0.5
	this.randomSwayRate *= 0.5

	// offset should depend on waves count
	this.offset /= this.fills.length

	// initialize waves
	this.waves = []

	for (let i = 0; i < this.fills.length; i++) {
		// non-randomized properties of individual wave
		const props = {
			id: i + 1,
			randomHeight: this.randomHeight,
			offset: this.offset,
			curviness: this.curviness,
			wavelength: this.wavelength,
			randomWavelength: this.randomWavelength,
			fill: this.fills[i],
			randomOffset: this.randomOffset,
			swayVelocity: this.swayVelocity,
			complexity: this.complexity
		}

		// add randomness to properties of individual waves
		// based on properties' default ranges and passed (or default) randomness coefficients
		// and add them to props object
		Array('flowRate', 'swayRate').forEach(prop => {
			props[prop] =
				this[prop] > 0
					? addRandomnessWithRange(
							this[prop],
							this[
								'random' + prop.charAt(0).toUpperCase() + prop.slice(1)
							],
							defaultOpts[prop].range[0],
							defaultOpts[prop].range[1]
					  )
					: 0
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
	mount(el = '#waves') {
		if (typeof el == 'string') {
			// called with a selector string
			// or using default #waves
			el = document.querySelector(el)
		}

		if (!el || el.ELEMENT_NODE !== 1) {
			// cant find a valid mount point
			console.error("waves: can't mount")
			return false
		}

		const svg = createElNS('svg', {
			viewBox: '0 0 1000 500',
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

		this.mounted = svg

		return this
	},

	play() {
		// if already playing
		// or there animation rates of both flow and sway are 0
		if (
			this.animation.isPlaying ||
			(!this.flowRate && (!this.swayRate || !this.swayVelocity))
		)
			return this

		// start animation
		this.animation.request = window.requestAnimationFrame(() =>
			this.animationStep()
		)

		this.animation.isPlaying = true

		return this
	},

	stop() {
		// if already stopped do nothing
		if (!this.animation.isPlaying) return this

		// stop flow animationframe loop
		window.cancelAnimationFrame(this.animation.request)
		this.animation.isPlaying = false

		// pause sway animation
		this.waves.forEach(wave => wave.svgEl.pauseAnimations())

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
