<template>
	<div class="container movies-container">
		<div class="row justify-content-center">
			<Movie class="movie" title="Test 1" />
			<Movie class="movie" title="Test 2" />
			<Movie class="movie" title="Test 3" />
			<Movie class="movie" title="Test 4" />
			<Movie class="movie" title="Test 5" />
			<Movie class="movie" title="Test 6" />
			<Movie class="movie" />
			<Movie class="movie" />
			<Movie class="movie" />
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
