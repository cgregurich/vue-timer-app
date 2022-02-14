<template>
	<div class="hue-changer">
		<input @change="updateHue" v-model="hue" type="number">
		<input @change="updateHue" @mousemove="updateHue" type="range" min="0" max="360" v-model="hue">
	</div>
</template>

<script>
export default {
	name: 'HueChanger',
	data() {
		return {
			hue: getComputedStyle(document.documentElement).getPropertyValue('--hue'),
		}
	},
	mounted() {
		const hue = getComputedStyle(document.documentElement).getPropertyValue('--hue');
		this.hue = parseInt(hue);
	},
	methods: {
		updateHue() {
			document.documentElement.style.setProperty('--hue', this.hue);
		},
	},
	computed: {

	},
}
</script>

<style>
.hue-changer {
	display: flex;
	flex-direction: column;
	margin: 0 50px;
	align-items: center;
}
input[type="number"] {
	width: 100px;
}
input[type="range"] {
	width: 100%;
	background-color: yellow;
}
</style>