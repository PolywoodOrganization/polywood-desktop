<template>
	<div class="container movies-container" id="movies">
		<div class="row justify-content-center" v-if="this.nbMovies !== 0">
			<Movie class="movie" v-for="movie in this.$store.getters.movies" v-bind="movie" :key="movie.id" />
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
				<ul class="pagination pagination-lg justify-content-center">
					<li class="page-item" :class="{disabled: currentPageNumber === 1}"><a class="page-link" @click="onPageClicked">&laquo;</a></li>
					<li class="page-item" v-for="p in generatePaginationRange(pageBounds[0], pageBounds[1])" :class="{active: currentPageNumber === p}" :key="p"><a class="page-link" @click="onPageClicked">{{p}}</a></li>
					<li class="page-item" :class="{disabled: currentPageNumber === this.maxPage}"><a class="page-link" @click="onPageClicked">&raquo;</a></li>
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
        this.$store.dispatch("fetchFavorites", {token: this.$store.getters.authToken});
        this.$store.dispatch("fetchMovies", { token: this.$store.getters.authToken });
	},
	components: { Movie, Card },
	methods: {
		onPageClicked(event) {
			let p = parseInt(event.target.text);
			
			if (event.target.text === '«')
				p = 1;
			if (event.target.text === '»')
				p = this.maxPage;
			
			if (!isNaN(p))
				this.$store.dispatch("onCurrentPageNumberChanged", p);
			
			// Scroll at the top of the page
			document.getElementById("movies").scrollIntoView({behavior: "smooth"});
		},
		generatePaginationRange(min, max, step = 1) {
			let range = [];
			for (let i = min; i <= max; i += step)
				range.push(i);
			return range;
		},
	},
	computed: {
		currentPageNumber() {
			return this.$store.getters.currentPageNumber;
		},
		batchSize() {
			return this.$store.getters.batchSize;
		},
		nbMovies() {
			if (this.$store.getters.searchValue === '') {
				return this.$store.getters.totalNumberOfMovies;
			}
			else {
				return this.$store.getters.totalNumberOfMoviesWithSearch;
			}
		},
		maxPage() {
			if (!isNaN(this.batchSize) && this.batchSize > 0)
				return Math.max(1, Math.ceil(this.nbMovies / this.batchSize));
			else
				return 1;
		},
		pageBounds() {
			let lowerPage = Math.max(this.currentPageNumber - 2, 1);
			let upperPage = Math.min(this.currentPageNumber + 2, this.maxPage);
			let delta = upperPage - lowerPage;
			// If the number of maximum page available is not matched, add the other pages
			if (delta < 4) {
				if (lowerPage === 1) {
					// Add more page in upperPage
					upperPage += Math.min(4, this.maxPage-1) - delta
				}
				else {
					// Add more page in lowerPage
					lowerPage -= 4 - delta
				}
			}
			return [lowerPage, upperPage];
		},
	},
};
</script>

<style scoped lang="scss">
@import "../assets/css/bootstrap.min.css";
@import "../assets/css/colors";

.movie {
	display: inline-block;
}

.page-item a {
	text-decoration: none;
}

.pagination {
	margin-top: 20px;
}

.page-link {
	background-color: $yellow;
	transition: all ease-in .2s;
	color: #000000ad !important;
}
.page-link:hover {
	background-color: $yellowLight;
}
.page-item.active .page-link {
	background-color: $yellowLight;
}
.page-item.disabled .page-link {
	background-color: $yellowDark;
}
</style>
