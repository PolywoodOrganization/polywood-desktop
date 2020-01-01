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
import LoginContainer from "./components/LoginContainer";

export default {
	name: "app",
	components: {
		FilterBar,
		FooterBanner,
		AboutUsContainer,
		ActorsContainer,
		MoviesContainer,
		LoginContainer,
		PolywoodBanner,
		NavBar,
	},
	computed: {
		view() {
			switch (this.$store.getters.navigationId) {
				case 0:
					return MoviesContainer;
				case 1:
					return ActorsContainer;
				case 2:
					return LoginContainer;
				default:
					return AboutUsContainer;
			}
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
