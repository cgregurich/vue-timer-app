<template>
  <div id="app">
		<!-- <button @click="test">TEST</button> -->
		<div id="nav">
      <router-link class="router-link" to="/stopwatch">Stopwatch</router-link>
      <router-link class="router-link" to="/timer">Timer</router-link>
      <router-link class="router-link" to="/tasks">Tasks</router-link>
      <router-link class="router-link" to="/sessions">Sessions</router-link>
      <router-link class="router-link" to="/colors">Colors</router-link>
    </div>
		<router-view/>
  </div>
</template>

<script>
export default {
	components: {

	},
	methods: {
		test() {
			setInterval(() => {
				const currentHue = getComputedStyle(document.documentElement).getPropertyValue('--hue');
				console.log(currentHue);
				document.documentElement.style.setProperty('--hue', parseInt(currentHue) + 1);
			}, 10);
		}
	}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins&family=Azeret+Mono&display=swap');
* {
	font-family: Nunito;
}
:root {
	--color: hsl(0, 100%, 50%);
	--hue: 200;
	--bg: hsl(var(--hue), 64%, 58%);
	--fg: hsl(var(--hue), 64%, 63%);
	--disabled-input-text: hsl(var(--hue), 64%, 75%); 
	--disabled-button-text: hsl(var(--hue), 64%, 85%);
	--colored-icon-hover: hsl(var(--hue), 65%, 20%);
	--text-on-white: hsl(var(--hue), 64%, 50%);
	--input-placeholder: hsl(var(--hue), 65%, 80%);
	--colored-icon: hsl(var(--hue), 65%, 40%);
}
body {
	background-color: var(--bg);
}
#nav {
	margin: 15px 0 35px 0;
	display: flex;
	justify-content: center;
}
.router-link, .router-link:visited {
	border-radius: 9px;
	color: white;
	font-family: Poppins;
	font-size: 24px;
	text-decoration: none;
	margin: 0 7px;
	padding: 2px 10px;
}
.router-link:hover {
	background-color: var(--fg);
	border-radius: 9px;
}
.router-link-active, .router-link-active:hover {
	background-color: hsl(var(--hue), 64%, 68%);
}
.task-select > select {
	background-color: var(--bg);
	color: white;
	font-family: Poppins;
	font-size: 20px;
	border: none;
	border-radius: 10px;
	padding: 0 5px;
}
.task-select > select:focus {
	background-color: none;
	outline: none;
}
.clock {
	font-family: "Azeret Mono";
	font-size: 50px;
	color: white;
	margin: 20px 0;
}
.stopwatch {
	background-color: var(--fg);
	width: 400px;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 10px;
	padding: 15px 45px;
}
.timer {
	background-color: var(--fg);
	color: white;
	width: 400px;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 10px;
	padding: 15px 45px;
}
.timer .reset-icon {
	font-size: 20px;
	width: 30px;
	color: var(--colored-icon);
}
.timer .reset-icon:hover {
	color: var(--colored-icon-hover);
	transition: 0.5s color;
}
.stopwatch, .timer {
	background-color: var(--fg);
}
.clock-buttons {
	display: flex;
	justify-content: center;
}
.clock-button {
	background-color: white;
	color: var(--bg);
	font-size: 25px;
	border: none;
	border-radius: 10px;
	margin: 0 10px;
	padding: 5px 35px;
	font-family: Poppins;
	width: 200px;
}
button:hover {
	background-color: hsl(0, 0%, 95%);
	transition: 0.1s background-color;
}
button:active {
	background-color: hsl(0, 0%, 85%);
	transition: 0.1s background-color;
}
.clock-button:disabled {
	color: var(--disabled-button-text);
	background-color: white;
}
.timer-inputs {
	display: flex;
	width: fit-content;
	justify-content: center;
	align-items: center;
	margin: 10px 0;
}
.timer-input {
	width: 45px;
	margin: 0 5px;
	font: Poppins;
	font-size: 20px;
	background-color: var(--bg);
	color: white;
	border: none;
	border-radius: 3px;
}
.timer-input:disabled {
	color: var(--disabled-input-text);
}
.task-container .editing input[type="text"]{
	color: var(--text-on-white);
}
.tasks {
	border-radius: 10px;
	margin: auto;
	width: fit-content;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10px;
	background-color: var(--fg);
}
.tasks button {
	background-color: white;
	color: var(--text-on-white);
	font-size: 20px;
	font-family: Poppins;
	font-weight: 500;
	margin: 10px 0;
	border: none;
	border-radius: 5px;
}
.add-task input[type="text"] {
	font-size: 20px;
	font-family: Poppins;
	background-color: var(--bg);
	color: white;
	border-radius: 5px;
	border: none;
	outline: none;
	padding: 0 9px;
}
.add-task input[type="text"]::placeholder {
	color: var(--input-placeholder);
}
.hue-changer input[type="number"] {
	border: none;
	border-radius: 5px;
	font-family: Poppins;
	color: var(--text-on-white);
	font-size: 40px;
}
.task .task-name {
	color: white;
}
.icons > i {
	color: var(--colored-icon);
}
.icons > i:hover {
	color: var(--colored-icon-hover);
}

</style>
