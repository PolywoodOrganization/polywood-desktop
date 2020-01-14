<template>
	<div id="app">
		<PolywoodBanner :enable-parallax="false" />
		<div class="component-separator"></div>
		
		<LoginContainer v-if="this.authToken === undefined || this.authToken === null"/>
		
		<DialogBox v-else-if="isCastingBoxDisplayed" @closed="hideCastingBox">
			<Actor class="actor" v-for="actor in this.$store.getters.castingActors" v-bind="actor" :key="actor.id" :display-filmography-button="false"/>
		</DialogBox>
		<DialogBox v-else-if="isMovieBoxDisplayed && currentMovieIsNotNull" @closed="hideMovieBox">
			<MovieInfo class="movie-description" v-bind="this.$store.getters.currentMovieDisplayed" :key="this.$store.getters.currentMovieDisplayed.id" :movie="this.$store.getters.currentMovieDisplayed"/>
		</DialogBox>
		<DialogBox v-else-if="isFilmographyBoxDisplayed" @closed="hideFilmographyBox">
			<Movie class="movie" v-for="movie in this.$store.getters.filmographyMovies" v-bind="movie" :key="movie.id" :display-casting-button="false" :display-director-button="false"/>
		</DialogBox>
		<div v-else>
			<NavBar/>
			
			<div class="component-separator"></div>
			
			<FilterBar v-if="this.$store.getters.navigationId !== 2 && this.$store.getters.navigationId !== 4"/>
			
			<div class="component-separator"></div>
			
			<transition name="component-fade" mode="out-in">
				<ElementContainer v-if="this.$store.getters.navigationId === 0" element-name="Movie" :element-list="this.$store.getters.movies" :call-fetch-elements="function() {this.$store.dispatch('fetchFavorites');this.$store.dispatch('fetchMovies');}" :max-pages="20" loading-image="../assets/img/clapper.png" no-elements-found="Aucun film trouvé 😕"/>
				<ElementContainer v-else-if="this.$store.getters.navigationId === 1" element-name="Actor" :element-list="this.$store.getters.actors" :call-fetch-elements="this.$store.dispatch('fetchActors')" :max-pages="20" loading-image="../assets/img/director-chair.png" no-elements-found="Aucun acteur trouvé 😕"/>
				<FavoritesContainer v-else-if="this.$store.getters.navigationId === 4"/>
				<AboutUsContainer v-else/>
			</transition>
		</div>
		
		<FooterBanner/>
	</div>
</template>

<script>
import PolywoodBanner from "./components/PolywoodBanner";
import NavBar from "./components/NavBar";
import MoviesContainer from "./components/MoviesContainer";
import ActorsContainer from "./components/ActorsContainer";
import FavoritesContainer from "./components/FavoritesContainer";
import AboutUsContainer from "./components/AboutUsContainer";
import FooterBanner from "./components/FooterBanner";
import FilterBar from "./components/FilterBar";
import LoginContainer from "./components/LoginContainer";
import DialogBox from "./components/DialogBox";
import Actor from "./components/Actor";
import Movie from "./components/Movie";
import MovieInfo from "./components/MovieInfo";
import ElementContainer from "./components/ElementsContainer";

export default {
	name: "app",
	components: {
		ElementContainer,
		Movie,
		Actor,
		DialogBox,
		FilterBar,
		FooterBanner,
		AboutUsContainer,
		FavoritesContainer,
		LoginContainer,
		PolywoodBanner,
		NavBar,
		MovieInfo
	},
	methods: {
		showCastingBox() {
			this.$store.dispatch("showCastingBox");
		},
		hideCastingBox() {
			this.$store.dispatch("hideCastingBox");
		},
		showMovieBox() {
			this.$store.dispatch("showMovieBox");
		},
		hideMovieBox() {
			this.$store.dispatch("hideMovieBox");
			this.$store.dispatch("setCurrentMovie", null)
		},
		showFilmographyBox() {
			this.$store.dispatch("showFilmographyBox");
		},
		hideFilmographyBox() {
			this.$store.dispatch("hideFilmographyBox");
		},
	},
	computed: {
		authToken() {
			return this.$store.getters.authToken;
		},
		isCastingBoxDisplayed() {
			return this.$store.getters.isCastingBoxDisplayed;
		},
		isMovieBoxDisplayed() {
			return this.$store.getters.isMovieBoxDisplayed;
		},
		currentMovieIsNotNull() {
			return this.$store.getters.currentMovieDisplayed != null;
		},
		isFilmographyBoxDisplayed() {
			return this.$store.getters.isFilmographyBoxDisplayed;
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
	.movie-description{
		width: 100%;
		text-align: center;
		align-content: center;
		font-size: 12pt;
		font-family: "Open Sans Condensed", Helvetica, Verdana, Arial, sans-serif;
	}
</style>
