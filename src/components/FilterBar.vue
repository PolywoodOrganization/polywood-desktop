<template>
	<div class="container">
		<form class="row" @submit.prevent="search">
			<input type="text" class="form-control col-4 offset-1" placeholder="Rechercher" @input="onSearchFieldChanged" :value="searchValue"/>
			<select class="form-control col-3" @change="onSortingFieldChanged">
				<option value="0" :selected="sortingMethod === 0">Ranger dans l'ordre alphabétique</option>
				<option v-if="this.$store.getters.navigationId === 0" value="1" :selected="sortingMethod === 1">Ranger par date de sortie</option>
				<option v-if="this.$store.getters.navigationId === 1" value="2" :selected="sortingMethod === 2">Ranger par nombre de films</option>
				<option v-if="this.$store.getters.navigationId === 1" value="3" :selected="sortingMethod === 3">Ranger par note</option>
				<option v-if="this.$store.getters.navigationId === 1" value="4" :selected="sortingMethod === 4">Ranger par Google hits</option>
			</select>
			<input type="submit" class="btn btn-primary col-2" value="Rechercher"/>
			<button type="reset" class="btn btn-outline-primary col-1" @click="clear">&times;</button>
		</form>
	</div>
</template>

<script>
export default {
	name: "FilterBar",
	methods: {
		onSearchFieldChanged(event) {
			this.$store.dispatch("onSearchValueChanged", event.target.value);
		},
		onSortingFieldChanged(event) {
			this.$store.dispatch("onSortingMethodChanged", parseInt(event.target.value));
		},
		search() {
			// If searching through movies
			if (this.$store.getters.navigationId === 0) {
				this.$store.dispatch("fetchFavorites");
				this.$store.dispatch("fetchMovies");
			}
			// If searching through actors
			else if (this.$store.getters.navigationId === 1) {
				this.$store.dispatch("fetchActors");
			}
		},
		clear() {
			this.$store.dispatch("onSearchValueChanged", '');
			this.$store.dispatch("onSortingMethodChanged", 0);
			this.search();
		},
	},
	computed: {
		searchValue() {
			return this.$store.getters.searchValue;
		},
		sortingMethod() {
			return this.$store.getters.sortingMethod;
		},
	},
};
</script>

<style scoped lang="scss">
@import "../assets/css/bootstrap.min.css";

select {
	margin: 0 5px;
}

option {
	color: black;
}

input[type="reset"], button[type="reset"] {
	color: white;
	width: 37px !important;
	max-width: 37px !important;
}
</style>
