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
					<li class="page-item" :class="{disabled: page === 1}"><a class="page-link" @click="onPageClicked">&laquo;</a></li>
					<li class="page-item" v-for="p in generatePaginationRange(this.lowerPage, this.upperPage)" :class="{active: page === p}" :key="p"><a class="page-link" @click="onPageClicked">{{p}}</a></li>
					<li class="page-item" :class="{disabled: page === this.maxPage}"><a class="page-link" @click="onPageClicked">&raquo;</a></li>
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
			maxPage: 285,
			lowerPage: 1,
			upperPage: 5,
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
			
			if (event.target.text === '«')
				p = 1;
			if (event.target.text === '»')
				p = this.maxPage;
			
			if (!isNaN(p)) {
				this.page = p;
				this.updateMoviesPage();
			}
			
			// Update the pagination
			this.lowerPage = Math.max(this.page - 2, 1);
			this.upperPage = Math.min(this.page + 2, this.maxPage);
			let delta = this.upperPage - this.lowerPage;
			// If the number of maximum page available is not matched, add the other pages
			if (delta < 4) {
				if (this.lowerPage === 1) {
					// Add more page in upperPage
					this.upperPage += 4 - delta
				}
				else {
					// Add more page in lowerPage
					this.lowerPage -= 4 - delta
				}
			}
			
			// Scroll at the top of the page
			document.getElementById("movies").scrollIntoView({behavior: "smooth"});
		},
		updateMoviesPage() {
			this.$store.dispatch("fetchMovies", this.page);
		},
		generatePaginationRange(min, max, step = 1) {
			let range = [];
			for (let i = min; i <= max; i += step)
				range.push(i);
			return range;
		},
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
