<template>
	<ul>
		<li @click="onNavClicked(0)" :class="{active: this.$store.getters.navigationId === 0}">Films</li>
		<li @click="onNavClicked(1)" :class="{active: this.$store.getters.navigationId === 1}">Acteurs</li>
		<li @click="onNavClicked(2)" :class="{active: this.$store.getters.navigationId === 2}">Se déconnecter</li>
		<li @click="onNavClicked(3)" :class="{active: this.$store.getters.navigationId === 3}">A propos de Polywood</li>
	</ul>
</template>

<script>
export default {
	name: "NavBar",
	methods: {
		onNavClicked(index) {
			if (index === 2) {
				if (confirm("Voulez-vous vous déconnecter ?"))
					this.$store.dispatch("logout");
			}
			else
				this.$store.dispatch("onNavigationIdChanged", index);
		},
	},
};
</script>

<style scoped lang="scss">
@import "../assets/css/colors";

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
	transition: all ease-in .2s;
}

li a {
	text-align: center;
	text-decoration: none;
}

li:hover {
	background-color: $primaryDarkColor;
}

.active {
	background-color: var(--blue);
	transition: all ease-in .2s;
}
.active:hover {
	background-color: #456187;
}
</style>
