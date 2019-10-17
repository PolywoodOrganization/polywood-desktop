<template>
	<div id="app">
		<PolywoodBanner :enable-parallax="false" />
		<NavBar />
		
		<MoviesContainer v-if="this.$store.getters.navigationId === 0"/>
		<ActorsContainer v-if="this.$store.getters.navigationId === 1"/>
		<AboutUs v-if="this.$store.getters.navigationId === 2"/>
		
		<FooterBanner/>
	</div>
</template>

<script>
import PolywoodBanner from "./components/PolywoodBanner";
import NavBar from "./components/NavBar";
import MoviesContainer from "./components/MoviesContainer";
import ActorsContainer from "./components/ActorsContainer";
import AboutUs from "./components/AboutUsContainer";
import FooterBanner from "./components/FooterBanner";

export default {
	name: "app",
	components: {
		FooterBanner,
		AboutUs,
		ActorsContainer,
		MoviesContainer,
		PolywoodBanner,
		NavBar,
	},
};
</script>

<style lang="scss">
@import "assets/css/style";

#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

p {
	margin: 0 20%;
	font-size: 20pt;
}
</style>
