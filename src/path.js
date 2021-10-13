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
									(point.x === undefined ? '' : point.x) +
									' ' +
									(point.y === undefined ? '' : point.y)
							)
							.join(' ')
					: '')
		)
		.join(' ')
}
