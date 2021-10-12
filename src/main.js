import getWaves from '@/get-waves'

// constructor
function waves(opts) {
	// if called as function return an instance
	if (!(this instanceof waves)) {
		return new waves(opts)
	}

	// use default options for not assigned ones
	Object.assign(this, defaultOpts, opts)
}

// default options
const defaultOpts = {
	count: 1,
	fills: 'rgb(0,0,0)',
	rate: 5
}

waves.prototype = {
	mount(el) {
		const svg = getWaves({
			rate: this.rate
		})
		el.append(svg)
		this.mountPoint = el
	}
}

export default waves
