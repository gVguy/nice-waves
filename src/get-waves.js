// returns svg

export default function getWaves(opts) {
	// increases a specified coordinate of every point a given amount
	function translatePath(path, c, offset) {
		const resultPathData = []
		path.forEach(item => {
			item = JSON.parse(JSON.stringify(item))
			if (item.points) {
				item.points.forEach(point => {
					if (point[c] !== undefined) point[c] += offset
				})
			}
			resultPathData.push(item)
		})
		return resultPathData
	}

	// takes a path data object and returns string
	function stringifyPath(path) {
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

	let pathData = [
		{
			cmd: 'C',
			points: [
				{ x: 15, y: 48 },
				{ x: 35, y: 2 },
				{ x: 50, y: 2 }
			]
		},
		{
			cmd: 'S',
			points: [
				{ x: 85, y: 48 },
				{ x: 100, y: 48 }
			]
		}
	]

	// make path twice its length for scrolling
	pathData = pathData.concat(translatePath(pathData, 'x', 100))

	// add starting point
	pathData.unshift({
		cmd: 'M',
		points: [{ x: 0, y: 48 }]
	})

	// close path
	pathData.push(
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

	const pathFrom = stringifyPath(pathData)

	const pathTo = stringifyPath(translatePath(pathData, 'x', -100))

	// creates ns elements with tags
	function createElNS(tag, attrs) {
		const el = document.createElementNS('http://www.w3.org/2000/svg', tag)
		for (let [attr, value] of Object.entries(attrs)) {
			el.setAttributeNS(null, attr, value)
		}
		return el
	}

	// create svg
	const svg = createElNS('svg', {
		viewBox: '0 0 100 50',
		width: '100%',
		height: '100%',
		preserveAspectRatio: 'none'
	})

	const wave = createElNS('path', {
		d: pathFrom
	})

	const animate = createElNS('animate', {
		attributeName: 'd',
		from: pathFrom,
		to: pathTo,
		dur: opts.rate + 's',
		repeatCount: 'indefinite'
	})

	wave.append(animate)
	svg.append(wave)

	return svg
}
