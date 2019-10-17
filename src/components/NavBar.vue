<template>
	<ul>
		<li><a>Accueil</a></li>
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
	list-style-type: none;
	margin: 0 20%;
	padding: 0;
	overflow: hidden;
	background-color: $primaryColor;
}

li {
	float: left;
}

li a {
	display: block;
	color: white;
	padding: 14px 16px;
	text-align: center;
	text-decoration: none;
	cursor: pointer;
}

li a:hover {
	background-color: $primaryDarkColor;
}

.active {
	background-color: #4CAF50;
}
</style>
