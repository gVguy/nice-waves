<template>
	<div id="app">
		<h1>js-svg-waves demo</h1>
		<h3>
			<a class="docsLink" href="#">Docs</a>
		</h3>
		<div class="setup">
			<div class="setup-block main">
				<h3>fills</h3>
				<div
					v-for="(fill, i) in wavesOpts.fills"
					class="color-input-wrapper"
					:key="'fill_' + fill.id"
				>
					<color-input v-model="fill.color" @change="mountWaves" />
					<button v-if="i != 0" class="remove-fill" @click="removeFill(i)">
						&#x2715;
					</button>
				</div>
				<button class="add-fill" @click="addFill">&#x2295;</button>
			</div>
		</div>
		<div class="setup">
			<div class="setup-block">
				<h3>complexity</h3>
				<input
					type="range"
					min="1"
					max="10"
					step="1"
					v-model.number="wavesOpts['complexity']"
					@change="mountWaves"
				/>
				<p>{{ wavesOpts.complexity }}</p>
			</div>
			<div class="setup-block">
				<h3>wavelength</h3>
				<input
					type="range"
					min="1"
					max="20"
					step=".1"
					v-model.number="wavesOpts['wavelength']"
					@change="mountWaves"
				/>
				<p>{{ wavesOpts.wavelength }}</p>
			</div>
			<div class="setup-block">
				<h3>rate</h3>
				<input
					type="range"
					min="0.1"
					max="5"
					step=".1"
					v-model.number="wavesOpts['rate']"
					:disabled="!waves.animation.isPlaying"
					@change="mountWaves"
				/>
				<p>{{ wavesOpts.rate }}</p>
			</div>
		</div>
		<div class="setup">
			<div class="setup-block">
				<h3>randomComplexity</h3>
				<input
					type="range"
					min="0"
					max="1"
					step=".1"
					v-model.number="wavesOpts['randomComplexity']"
					@change="mountWaves"
				/>
				<p>{{ wavesOpts.randomComplexity }}</p>
			</div>
			<div class="setup-block">
				<h3>randomRate</h3>
				<input
					type="range"
					min="0"
					max="1"
					step=".1"
					v-model.number="wavesOpts['randomRate']"
					@change="mountWaves"
				/>
				<p>{{ wavesOpts.randomRate }}</p>
			</div>
			<div class="setup-block">
				<h3>randomOffset</h3>
				<input
					type="range"
					min="0"
					max="1"
					step=".1"
					v-model.number="wavesOpts['randomOffset']"
					@change="mountWaves"
				/>
				<p>{{ wavesOpts.randomOffset }}</p>
			</div>
			<div class="setup-block main">
				<button @click="playStopHandler">{{ playStopText }}</button>
			</div>
		</div>
	</div>
	<div class="waves" ref="wavesContainer"></div>
</template>

<script>
import waves from '@/main'
import ColorInput from 'vue-color-input'
import { random } from '@/utility'

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
			wavesOpts: {
				complexity: 6,
				wavelength: 9,
				rate: 0.5,
				fills: [{ id: 1, color: 'rgb(19, 158, 173)' }],
				randomComplexity: 0.3,
				randomRate: 0.5,
				randomOffset: 1
			}
		}
	},
	computed: {
		playStopText() {
			return this.waves.animation.isPlaying ? 'Stop' : 'Play'
		},
		opts() {
			const fills = this.wavesOpts.fills.map(f => f.color)
			return { ...this.wavesOpts, fills }
		}
	},
	methods: {
		mountWaves() {
			const mountPoint = this.$refs.wavesContainer
			const wasPlaying = this.waves.mounted
				? this.waves.animation.isPlaying
				: true
			this.waves = waves(this.opts).mount(mountPoint)
			if (!wasPlaying) this.waves.stop()
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
			this.wavesOpts.fills.push({
				id: this.wavesOpts.fills.length + 1,
				color: 'rgba(' + r + ', ' + g + ', ' + b + ', 0.5)'
			})
			this.mountWaves()
		},
		removeFill(i) {
			this.wavesOpts.fills.splice(i, 1)
			this.mountWaves()
		}
	},
	created() {
		// this.waves = {}
	},
	mounted() {
		this.mountWaves()
	},
	watch: {}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300&display=swap');
body {
	background: #fbfbfb;
}
#app {
	font-family: 'Montserrat', sans-serif;
	font-size: 16px;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	width: 100%;
}

.waves {
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
}
.setup-block h3 {
	margin: 0;
	white-space: nowrap;
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
</style>
