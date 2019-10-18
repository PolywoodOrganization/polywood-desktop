<template>
	<div class="container movies-container">
		<div class="row justify-content-center" v-if="this.$store.getters.movies.length !== 0">
			<Movie class="movie" v-for="movie in this.$store.getters.movies" v-bind="movie" :key="movie.id"/>
		</div>
		<div class="row justify-content-center" v-else>
			<p>Aucun film trouvé 😕</p>
		</div>
	</div>
</template>

<script>
import Movie from "./Movie";
export default {
	name: "MoviesContainer",
	components: { Movie },
};
</script>

<style scoped lang="scss">
@import "../assets/css/bootstrap.min.css";

.movie {
	display: inline-block;
}
</style>
