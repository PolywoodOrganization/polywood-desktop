<template>
	<ul>
		<li><a>Films</a></li>
		<li><a>Acteurs</a></li>
		<li><a>A propos de Polywood</a></li>
	</ul>
</template>

<script>
export default {
	name: "NavBar",
};
</script>

<style scoped lang="scss">
@import "../assets/colors";

ul {
	width: 100%;
	text-align: center;
	list-style-type: none;
	padding: 0;
	overflow: hidden;
	background-color: $primaryColor;
}

li {
	width: 200px;
	padding: 14px 16px;
	display: inline-block;
	cursor: pointer;
}

li a {
	text-align: center;
	text-decoration: none;
}

li:hover {
	background-color: $primaryDarkColor;
}

.active {
	background-color: #4CAF50;
}
</style>
