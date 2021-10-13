<template>
	<div id="app">
		<h1>js-svg-waves demo</h1>
		<h3>
			<a class="docsLink" href="#">Docs</a>
		</h3>
		<div class="setup">
			<!-- <div class="setup-block main">
				<h3>main block</h3>
			</div> -->
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
					step=".5"
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
					max="10"
					step=".1"
					v-model.number="wavesOpts['rate']"
					@change="mountWaves"
				/>
				<p>{{ wavesOpts.rate }}</p>
			</div>
		</div>
	</div>
	<div class="waves" ref="wavesContainer"></div>
</template>

<script>
import waves from '../src/main'

export default {
	name: 'ServeDev',
	data() {
		return {
			wavesOpts: {
				complexity: 1,
				wavelength: 1.5,
				rate: 1
			}
		}
	},
	computed: {},
	methods: {
		mountWaves() {
			const mountPoint = this.$refs.wavesContainer
			this.waves = waves(this.wavesOpts).mount(mountPoint)
		}
	},
	created() {},
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
	align-items: center;
	flex-wrap: wrap;
	margin-bottom: 20px;
}
.setup-block {
	flex: 0 1;
	margin: 10px;
	text-align: center;
	&.main {
		flex-basis: 100%;
		& .color-text {
			width: 380px;
			height: 40px;
		}
	}
	p {
		margin: 0;
	}
}
.setup-block h3 {
	margin: 0;
	white-space: nowrap;
}
</style>
