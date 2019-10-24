<template>
	<div class="container movies-container" id="movies">
		<div class="row justify-content-center" v-if="this.$store.getters.movies.length !== 0">
			<Movie class="movie" v-for="movie in this.$store.getters.movies" v-bind="movie" :key="movie.id" />
		</div>

		<div class="row justify-content-center" v-else>
			<Card additional-card-class="border-warning bg-warning empty-movie" title="Aucun film trouvé 😕">
				<img src="../assets/img/clapper.png" alt="Aucun film disponible" title="Aucun film disponible" />
			</Card>
		</div>

		<div class="row">
			<div class="col-12">
				<ul class="pagination pagination-lg justify-content-center">
					<li class="page-item disabled"><a class="page-link" href="#">&laquo;</a></li>
					<li class="page-item" :class="{active: page === 1}"><a class="page-link" @click="onPageClicked">1</a></li>
					<li class="page-item" :class="{active: page === 2}"><a class="page-link" @click="onPageClicked">2</a></li>
					<li class="page-item" :class="{active: page === 3}"><a class="page-link" @click="onPageClicked">3</a></li>
					<li class="page-item" :class="{active: page === 4}"><a class="page-link" @click="onPageClicked">4</a></li>
					<li class="page-item" :class="{active: page === 5}"><a class="page-link" @click="onPageClicked">5</a></li>
					<li class="page-item"><a class="page-link" href="#">&raquo;</a></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import Movie from "./Movie";
import Card from "./Card";

export default {
	name: "MoviesContainer",
	created() {
		this.page = this.initPage;
		this.updateMoviesPage();
	},
	components: { Movie, Card },
	data() {
		return {
			// Index begins with 1
			page: 1,
		};
	},
	props: {
		// Index begins with 1
		initPage: {
			type: Number,
			required: false,
			default: 1,
		}
	},
	methods: {
		onPageClicked(event) {
			let p = parseInt(event.target.text);
			if (!isNaN(p)) {
				this.page = p;
				this.updateMoviesPage();
			}
			document.getElementById("movies").scrollIntoView({behavior: "smooth"});
		},
		updateMoviesPage() {
			this.$store.dispatch("fetchMovies", this.page);
		}
	},
};
</script>

<style scoped lang="scss">
@import "../assets/css/bootstrap.min.css";

.movie {
	display: inline-block;
}

.page-item a {
	text-decoration: none;
}
</style>
