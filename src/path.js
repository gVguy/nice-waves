import { addRandomnessWithRange } from '@/utility'

// translates a specified coordinate of every point a given amount
export function translatePath(path, coord, offset) {
	const resultPathData = []
	path.forEach(item => {
		item = JSON.parse(JSON.stringify(item))
		if (item.points) {
			item.points.forEach(point => {
				if (point[coord] !== undefined) point[coord] += offset
			})
		}
		resultPathData.push(item)
	})
	return resultPathData
}

// randomizes path velocity within its original velocity range
export function morphPathVelocity(path, velocity) {
	const resultPathData = []
	let lastY = 480
	path.forEach((item, i) => {
		item = JSON.parse(JSON.stringify(item))
		let y = item.points[item.points.length - 1].y
		if (i != path.length - 1)
			y =
				y < 250
					? addRandomnessWithRange(y, velocity, 2, 250)
					: addRandomnessWithRange(y, velocity, 250, 480)
		else y = 480
		item.points.forEach((point, j) => (point.y = j == 0 ? lastY : y))
		lastY = y
		resultPathData.push(item)
	})
	return resultPathData
}

// takes a path data object and returns string
export function stringifyPath(path) {
	return path
		.map(
			item =>
				item.cmd +
				' ' +
				(item.points
					? item.points
							.map(
								point =>
									(point.x === undefined
										? ''
										: Number(point.x.toFixed(1))) +
									' ' +
									(point.y === undefined
										? ''
										: Number(point.y.toFixed(1)))
							)
							.join(' ')
					: '')
		)
		.join(' ')
}
