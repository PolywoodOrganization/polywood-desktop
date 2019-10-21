<template>
	<div class="container movies-container">
		<div class="row justify-content-center" v-if="this.$store.getters.movies.length !== 0">
			<Movie class="movie" v-for="movie in this.$store.getters.movies" v-bind="movie" :key="movie.id"/>
		</div>
		<div class="row justify-content-center" v-else>
			<Card additional-card-class="border-warning bg-warning empty-movie" title="Aucun film trouvé 😕">
				<img src="../assets/img/clapper.png" alt="Aucun film disponible" title="Aucun film disponible"/>
			</Card>
		</div>
	</div>
</template>

<script>
import Movie from "./Movie";
import Card from "./Card";

export default {
	name: "MoviesContainer",
	created() {
		this.$store.dispatch("fetchMovies");
	},
	components: { Movie, Card },
};
</script>

<style scoped lang="scss">
@import "../assets/css/bootstrap.min.css";

.movie {
	display: inline-block;
}
</style>
