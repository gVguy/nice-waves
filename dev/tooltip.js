class Tooltip {
	constructor(text) {
		this.el = document.createElement('div')
		this.el.innerHTML = text
		this.el.className = 'tooltip'
		Object.assign(this.el.style, {
			position: 'absolute',
			transition: 'opacity .4s',
			padding: '10px',
			opacity: 0
		})
		this.state = 'hidden'
	}

	handleEvent(e) {
		switch (e.type) {
			case 'pointermove':
				this.position(e.pageX, e.pageY)
				break
			case 'pointerover':
				this.show()
				break
			case 'pointerout':
				this.hide()
				break
			case 'transitionend':
				if (this.state == 'showing') this.state = 'visible'
				else if (this.state == 'hiding') {
					this.unmount()
				}
				break
		}
	}

	show() {
		if (this.state == 'hidden') {
			document.documentElement.append(this.el)
			this.timeout = setTimeout(() => {
				this.el.style.opacity = 1
				this.state = 'showing'
			}, 500)
			document.addEventListener('pointermove', this)
			this.el.addEventListener('transitionend', this)
			this.state = 'mounted'
		} else if (this.state == 'hiding') {
			this.el.style.opacity = 1
			this.state = 'showing'
		} else if (this.state == 'will-hide') {
			clearTimeout(this.timeout)
			this.state = 'visible'
		}
	}

	position(x, y) {
		this.el.style.top = y + 20 + 'px'
		this.el.style.left = x - this.el.offsetWidth * 0.5 + 'px'
	}

	hide() {
		if (this.state == 'visible') {
			this.timeout = setTimeout(() => {
				this.el.style.opacity = 0
				this.state = 'hiding'
			}, 500)
			this.state = 'will-hide'
		} else if (this.state == 'showing') {
			this.el.style.opacity = 0
			this.state = 'hiding'
		} else if (this.state == 'mounted') {
			clearTimeout(this.timeout)
			this.unmount()
		}
	}

	unmount() {
		this.el.remove()
		this.el.removeEventListener('transitionend', this)
		document.removeEventListener('pointermove', this)
		this.state = 'hidden'
	}
}

export default {
	mounted(el, binding) {
		el.tooltip = new Tooltip(binding.value)

		el.addEventListener('pointerover', el.tooltip)
		el.addEventListener('pointerout', el.tooltip)
	},
	beforeUnmount(el) {
		el.removeEventListener('pointerover', el.tooltip)
		el.removeEventListener('pointerout', el.tooltip)
	}
}
