<template>
	<div id="app">
		<h1>js-svg-waves demo</h1>
		<h3>
			<a class="docsLink" href="#">Docs</a>
		</h3>
		<div class="setup">
			<div class="setup-block main">
				<h3>main block</h3>
			</div>
			<div class="setup-block">
				<h3>unmain block</h3>
			</div>
		</div>
	</div>
	<div id="waves_container">
	</div>
</template>

<script>
	import waves from '../src/main';

	export default {
		name: 'ServeDev',
		data() {
			return {
			}
		},
		computed: {
		},
		methods: {
		},
		created() {
		},
		mounted() {
			const mountPoint = document.getElementById('waves_container');
			this.waves = waves();
			this.waves.mount(mountPoint);
		},
		watch: {
		}
	};
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

	#waves_container {
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
	}
	.setup-block h3 {
		margin: 0;
		white-space: nowrap;
	}
</style>