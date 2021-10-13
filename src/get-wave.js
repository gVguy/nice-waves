import { random } from '@/utility'
import { translatePath } from '@/path'

export function getWave(complexity, randomVelocity, curviness, wavelength) {
	// increase path width based on wave length passed in
	wavelength *= 100

	// initialize an array based on complexity
	// containing x coordinates of high and low points
	// from first high point to 100 (0 will be added manually later)
	const points = complexity * 2
	const step = wavelength / points
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
		let rand = random(0, 46) * randomVelocity
		if (x != wavelength) {
			y = y < 25 ? 48 - rand : 2 + rand
		} else {
			y = 48
		}

		// transform every x coordinate into cubic-bezier command
		const r = {
			cmd: 'C',
			points: [
				{ x: x - step + step * curviness, y: lastY },
				{ x: x - step * curviness, y },
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
