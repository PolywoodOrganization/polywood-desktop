<template>
	<div class="container">
		<form class="row">
			<input type="text" class="form-control col-4 offset-1" placeholder="Rechercher" @input="onSearchFieldChanged" :value="searchValue"/>
			<select class="form-control col-3" @change="onSortingFieldChanged">
				<option value="0" :selected="sortingMethod === 0">Ranger dans l'ordre alphabétique</option>
				<option v-if="this.$store.getters.navigationId === 0" value="1" :selected="sortingMethod === 1">Ranger par date de sortie</option>
				<option v-if="this.$store.getters.navigationId === 1" value="2" :selected="sortingMethod === 2">Ranger par nombre de films</option>
				<option v-if="this.$store.getters.navigationId === 1" value="3" :selected="sortingMethod === 3">Ranger par note</option>
				<option v-if="this.$store.getters.navigationId === 1" value="4" :selected="sortingMethod === 4">Ranger par Google hits</option>
			</select>
			<select class="form-control col-2" @change="onOrderFieldChanged">
				<option value="0" :selected="sortingOrder === 0">Ascendant</option>
				<option value="1" :selected="sortingOrder === 1">Descendant</option>
			</select>
			<input type="reset" class="btn btn-outline-primary col-1" value="Effacer" @click="onResetClicked"/>
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
		onOrderFieldChanged(event) {
			this.$store.dispatch("onSortingOrderChanged", parseInt(event.target.value))
		},
		onResetClicked() {
			this.$store.dispatch("onSearchValueChanged", "");
			this.$store.dispatch("onSortingMethodChanged", 0);
			this.$store.dispatch("onSortingOrderChanged", 0);
		}
	},
	computed: {
		searchValue() {
			return this.$store.getters.searchValue;
		},
		sortingMethod() {
			return this.$store.getters.sortingMethod;
		},
		sortingOrder() {
			return this.$store.getters.sortingOrder;
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

input[type="reset"] {
	color: white;
}
</style>
