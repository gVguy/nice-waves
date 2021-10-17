<template>
	<div id="app">
		<h1>svg-waves</h1>
		<h3>
			<a class="docsLink" href="#">Docs</a>
		</h3>
		<div class="setup">
			<div class="setup-block main">
				<h3>fills</h3>
				<div
					v-for="(fill, i) in fills"
					class="color-input-wrapper"
					:key="'fill_' + fill.id"
				>
					<color-input v-model="fill.color" @change="mountWaves" />
					<button
						v-if="fills.length != 1"
						class="remove-fill"
						@click="removeFill(i)"
					>
						&#x2715;
					</button>
				</div>
				<button class="add-fill" @click="addFill">&#x2295;</button>
			</div>
			<div
				class="setup-block"
				v-for="opt in Object.keys(wavesOpts)"
				:key="'setup_' + opt"
			>
				<h3>{{ opt }}</h3>
				<input
					type="range"
					:min="wavesOpts[opt].range[0]"
					:max="wavesOpts[opt].range[1]"
					:step="wavesOpts[opt].range[1] > 5 ? 1 : 0.01"
					v-model.number="wavesOpts[opt]['value']"
					:name="opt"
					@change="parameterChangeHandler"
				/>
				<p>{{ wavesOpts[opt].value }}</p>
			</div>
			<div class="setup-block main">
				<button class="control-btn" @click="playStopHandler">
					{{ playStopText }}
				</button>
				<button class="control-btn" @click="showOptsHandler">
					Show opts
				</button>
				<button
					class="control-btn"
					@click="mountWaves"
					v-tooltip="'Generate new instance with same options'"
				>
					Re-mount
				</button>
			</div>
		</div>
	</div>
	<div id="waves"></div>
	<div v-show="showOpts" class="popup-opts" @pointerdown="showOptsHandler">
		<div class="code" @pointerdown.stop>
			<pre><code class="lang-js">{{ optsString }}</code></pre>
		</div>
	</div>
</template>

<script>
import waves from '@/main'
import ColorInput from 'vue-color-input'
import { random } from '@/utility'
import defaultOpts from '@/default-opts'

// hightlight for opts popup
import Prism from 'prismjs'
Prism.manual = true

export default {
	name: 'ServeDev',
	components: { ColorInput },
	data() {
		return {
			waves: {
				animation: {
					isPlaying: null
				}
			},
			fills: [],
			showOpts: false,
			wavesOpts: {
				flowRate: 0,
				swayRate: 0,
				swayVelocity: 0
			}
		}
	},
	computed: {
		playStopText() {
			return this.waves.animation.isPlaying ? 'Stop' : 'Play'
		},
		opts() {
			const fills = this.fills.map(f => f.color)
			const opts = [['fills', fills]].concat(
				Object.keys(this.wavesOpts).map(key => [
					key,
					this.wavesOpts[key].value
				])
			)
			return Object.fromEntries(opts)
		},
		optsString() {
			let opts = this.opts

			Object.keys(opts).forEach(key => {
				if (
					JSON.stringify(opts[key]) ==
					JSON.stringify(defaultOpts[key].value)
				)
					delete opts[key]
			})

			opts = JSON.stringify(opts, null, 2).replace(/"(\S*)":/gm, '$1:')

			return `const opts = ${opts}

waves(opts).mount()${this.waves.animation.isPlaying ? '' : '.stop()'}`
		}
	},
	methods: {
		parameterChangeHandler(e) {
			let forcePlay = false
			if (
				['flowRate', 'swayRate'].includes(e.target.name) &&
				e.target.value > 0
			)
				forcePlay = true
			this.mountWaves(forcePlay)
		},
		mountWaves(forcePlay) {
			const wasPlaying = this.waves.mounted
				? this.waves.animation.isPlaying
				: true
			this.waves = waves(this.opts).mount()
			if (!wasPlaying && !forcePlay) this.waves.stop()
		},
		playStopHandler() {
			if (this.waves.animation.isPlaying) {
				this.waves.stop()
			} else {
				this.waves.play()
			}
		},
		addFill() {
			const [r, g, b] = Array(3)
				.fill(null)
				.map(() => random(0, 190))
			this.fills.push({
				id: this.fills.length + 1,
				color: 'rgba(' + r + ', ' + g + ', ' + b + ', 0.5)'
			})
			this.mountWaves()
		},
		removeFill(i) {
			this.fills.splice(i, 1)
			this.mountWaves()
		},
		showOptsHandler() {
			this.showOpts = !this.showOpts
			Prism.highlightAll()
		}
	},
	created() {
		const custom = {
			flowRate: 0.6,
			swayRate: 0.6,
			wavelength: 14,
			randomHeight: 0.4,
			swayVelocity: 0.42
		}
		this.wavesOpts = JSON.parse(JSON.stringify(defaultOpts))
		Object.keys(custom).forEach(k => (this.wavesOpts[k].value = custom[k]))
		delete this.wavesOpts.fills

		const fills = custom.fills ? custom.fills : defaultOpts.fills.value

		this.fills = fills.map((f, i) => ({
			id: i + 1,
			color: f
		}))

		// props template positions matrix
		// prettier-ignore
		// const propsLayout = [
		// 	[ 'flowRate',       'velocity',     'wavelength', 'offset',       'curviness'],
		// 	[ 'randomFlowRate', 'swayVelocity', 'complexity', 'randomOffset', ''],
		// 	[]
		// ]
	},
	mounted() {
		this.mountWaves()
	}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300&display=swap');
body {
	background: #fbfbfb;
	margin: 0;
	padding: 0;
	font-family: 'Montserrat', sans-serif;
}
#app {
	font-size: 16px;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	width: 100%;
	min-height: 100vh;
}

#waves {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 200px;
}

h1 {
	margin-bottom: 0;
}
.docsLink {
	margin-bottom: 20px;
	text-decoration: underline;
}
.setup {
	display: flex;
	justify-content: center;
	align-items: top;
	flex-wrap: wrap;
	margin-bottom: 20px;
}
.setup-block {
	flex: 0 1;
	margin: 10px;
	text-align: center;
	&.main {
		flex-basis: 100%;
	}
	p {
		margin: 0;
	}
	h3 {
		margin: 0;
		white-space: nowrap;
	}
	.control-btn {
		font-size: 16px;
		font-family: inherit;
		margin: 3px;
	}
}
.color-input {
	vertical-align: middle;
	.box {
		border-radius: 10px;
	}
	.box.active {
		background: #0f0f0f;
	}
}
.color-input-wrapper {
	position: relative;
	display: inline-block;
	margin: 3px;
	&:hover .remove-fill {
		opacity: 0.4;
	}
	.remove-fill {
		position: absolute;
		top: 0;
		right: 0;
		background: rgba(15, 15, 15, 0.6);
		color: #fbfbfb;
		border-radius: 3px 10px 3px 3px;
		opacity: 0;
		border: none;
		outline: none;
		cursor: pointer;
		transition: all 0.3;
		&:hover {
			opacity: 1;
		}
	}
}
.add-fill {
	vertical-align: middle;
	background: none;
	color: #a8a8a8;
	border: none;
	outline: none;
	font-size: 35px;
	line-height: 30px;
	cursor: pointer;
	transition: color 0.3s;
	&:hover {
		color: #0f0f0f;
	}
}
.popup-opts {
	width: 100%;
	height: 100%;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(15, 15, 15, 0.4);
	.code {
		padding: 15px;
		background: #fbfbfb;
		box-shadow: 0px 2px 5px rgba(15, 15, 15, 0.4);
		text-align: left;
		code {
			font-family: 'Source Code Pro', monospace;
		}
	}
}
.tooltip {
	background: rgba(1, 1, 1, 0.5);
	color: #fbfbfb;
	font-family: 'Montserrat', sans-serif;
	transition: opacity 0.3s;
	padding: 10px;
	border-radius: 3px;
}
</style>
