<template>
	<div class="container">
		<form class="row">
			<input type="text" class="form-control col-4 offset-2" placeholder="Rechercher" @input="onSearchFieldChanged"/>
			<select class="form-control col-3" @change="onSortingFieldChanged">
				<option>Ranger dans l'ordre alphabétique</option>
				<option v-if="this.$store.getters.navigationId === 0">Ranger par date de sortie</option>
				<option v-if="this.$store.getters.navigationId === 1">Ranger par nombre de films</option>
				<option v-if="this.$store.getters.navigationId === 1">Ranger par note</option>
				<option v-if="this.$store.getters.navigationId === 1">Ranger par Google hits</option>
			</select>
			<input type="reset" class="btn btn-outline-primary col-1" value="Effacer"/>
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
			this.$store.dispatch("onSortingMethod", event.target.value);
		},
	}
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
