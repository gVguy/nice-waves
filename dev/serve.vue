<template>
	<div id="app">
		<h1>nice-waves</h1>
		<h3>
			<a class="docsLink" href="#">Docs</a>
		</h3>
		<div id="waves"></div>
		<div class="setup">
			<div
				class="fill-blender"
				v-for="(fill, i) in opts.fills"
				:style="{ background: fill }"
				:key="'fill_blender_' + i"
			></div>
			<div class="setup-content">
				<div class="setup-block main">
					<h3>fills</h3>
					<div
						v-for="(fill, i) in fills"
						class="color-input-wrapper"
						:key="'fill_' + fill.id"
					>
						<color-input
							v-model="fill.color"
							@change="fillChangeHandler"
						/>
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
					class="setup-grid"
					:style="{
						gridTemplateColumns: '1fr '.repeat(propsLayout.cols)
					}"
				>
					<div
						v-for="prop in propsLayout.items"
						class="setup-block"
						:key="'setup_' + prop"
					>
						<div v-if="prop">
							<h3>{{ prop }}</h3>
							<input
								type="range"
								:min="wavesOpts[prop].range[0]"
								:max="wavesOpts[prop].range[1]"
								:step="wavesOpts[prop].range[1] > 5 ? 1 : 0.01"
								v-model.number="wavesOpts[prop]['value']"
								:name="prop"
								@change="parameterChangeHandler"
							/>
							<p>{{ wavesOpts[prop].value }}</p>
						</div>
						<div v-else><!-- placeholder --></div>
					</div>
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
						@click="() => mountWaves()"
						v-tooltip="'Generate new instance with same options'"
					>
						Re-mount
					</button>
					<button
						class="control-btn"
						@click="resetOpts"
						v-tooltip="'Reset all opts to default settings'"
					>
						Reset
					</button>
				</div>
			</div>
		</div>
		<div v-show="showOpts" class="popup-opts" @pointerdown="showOptsHandler">
			<div class="code" @pointerdown.stop>
				<pre><code class="lang-js">{{ optsString }}</code></pre>
			</div>
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
				fills: [],
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
			const opts = Object.fromEntries(
				Object.keys(this.wavesOpts).map(key => [
					key,
					this.wavesOpts[key].value
				])
			)
			return opts
		},
		optsString() {
			let opts = JSON.parse(JSON.stringify(this.opts))

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
		fillChangeHandler() {
			this.wavesOpts.fills = { value: this.fills.map(f => f.color) }
			this.mountWaves()
		},
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
			this.fillChangeHandler()
		},
		removeFill(i) {
			this.fills.splice(i, 1)
			this.fillChangeHandler()
		},
		showOptsHandler() {
			this.showOpts = !this.showOpts
			Prism.highlightAll()
		},
		resetOpts(mount = true) {
			this.wavesOpts = JSON.parse(JSON.stringify(defaultOpts))

			this.fills = this.wavesOpts.fills.value.map((f, i) => ({
				id: i + 1,
				color: f
			}))

			if (mount) this.mountWaves()
		}
	},
	created() {
		this.resetOpts(false)

		// props template positions matrix
		// prettier-ignore
		const layout = [
			[ 'flowRate',       'swayRate',       'wavelength', 'randomHeight', 'offset' ],
			[ 'randomFlowRate', 'swayVelocity',   'complexity',  'curviness',   'randomOffset' ],
			[ '',               'randomSwayRate', ]
		]
		const cols = layout.reduce((p, c) => (c.length > p ? c.length : p), 0)
		const items = layout.flat()
		this.propsLayout = { cols, items }
	},
	mounted() {
		this.mountWaves()
	}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300&display=swap');
:root {
	background: #fbfbfb;
}
body {
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
	width: 100%;
	height: 200px;
}

h1 {
	margin-bottom: 0;
}
.docsLink {
	margin-bottom: 20px;
	text-decoration: underline;
	color: #0f0f0f;
}
.setup {
	color: #fbfbfb;
	text-align: center;
	flex-grow: 1;
	width: 100%;
	position: relative;
	.fill-blender {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	.setup-content {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
}
.setup-grid {
	display: grid;
	grid-template-rows: auto;
}
.setup-block {
	margin: 20px;
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
		color: #fbfbfb;
	}
}
.popup-opts {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 10;
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
	z-index: 9999;
}
</style>
