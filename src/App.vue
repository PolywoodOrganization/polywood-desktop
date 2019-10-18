<template>
	<div id="app">
		<PolywoodBanner :enable-parallax="false" />
		<div class="component-separator"></div>
		<NavBar/>
		
		<div class="component-separator"></div>
		
		<FilterBar v-if="this.$store.getters.navigationId !== 2"/>
		
		<div class="component-separator"></div>
		
		<transition name="component-fade" mode="out-in">
			<component v-bind:is="view"></component>
		</transition>
		
		<FooterBanner/>
	</div>
</template>

<script>
import PolywoodBanner from "./components/PolywoodBanner";
import NavBar from "./components/NavBar";
import MoviesContainer from "./components/MoviesContainer";
import ActorsContainer from "./components/ActorsContainer";
import AboutUsContainer from "./components/AboutUsContainer";
import FooterBanner from "./components/FooterBanner";
import FilterBar from "./components/FilterBar";

export default {
	name: "app",
	components: {
		FilterBar,
		FooterBanner,
		AboutUsContainer,
		ActorsContainer,
		MoviesContainer,
		PolywoodBanner,
		NavBar,
	},
	computed: {
		view() {
			if (this.$store.getters.navigationId === 0)
				return MoviesContainer;
			else if (this.$store.getters.navigationId === 1)
				return ActorsContainer;
			else
				return AboutUsContainer;
		},
	},
};
</script>

<style lang="scss">
@import "assets/css/style";

.component-separator {
	height: 30px;
}

.component-fade-enter-active, .component-fade-leave-active {
	transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
	/* .component-fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>
