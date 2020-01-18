<template>
	<div class="container movies-container" id="movies">
		<div class="row justify-content-center" v-if="this.nbMovies !== 0">
			<Movie class="movie" v-for="movie in movies" v-bind="movie" :key="movie.id" />
		</div>

		<div class="row justify-content-center" v-else>
			<Card v-if="this.$store.getters.searchValue !== ''" additional-card-class="border-warning bg-warning empty-movie" title="Aucun film trouvé 😕">
				<img src="../assets/img/clapper.png" alt="Aucun film disponible" title="Aucun film disponible" />
			</Card>
			<Card v-else additional-card-class="border-warning bg-warning empty-movie" title="Chargement ⏳">
				<img src="../assets/img/clapper.png" alt="Chargement..." title="Chargement..." />
			</Card>
		</div>

		<div class="row">
			<div class="col-12">
				<Pagination :max-pages="nbPages" @page-clicked="pageClicked"/>
			</div>
		</div>
	</div>
</template>

<script>
import Movie from "./Movie";
import Card from "./Card";
import Pagination from "./Pagination";

export default {
	name: "MoviesContainer",
	components: { Pagination, Movie, Card },
	created() {
        this.$store.dispatch("fetchFavorites");
        this.$store.dispatch("fetchMovies");
		this.$store.dispatch("fetchMaxMoviesPages");
	},
	methods: {
		pageClicked() {
			// Fetch new movies
			this.$store.dispatch("fetchMovies");
			
			console.log(`Number of movies fetched: length=${this.movies.length}, nbMovies=${this.nbMovies}`);
			
			// Scroll at the top of the page
			document.getElementById("movies").scrollIntoView({behavior: "smooth"});
		},
	},
	computed: {
		movies() {
			return this.$store.getters.movies;
		},
		nbMovies() {
			return this.$store.getters.movies.length;
		},
		nbPages() {
			let pages = this.$store.getters.maxMoviesPages;
			if (pages == null)
				return 10;
			return pages;
		},
	},
};
</script>

<style scoped lang="scss">
.movie {
	display: inline-block;
}
</style>
