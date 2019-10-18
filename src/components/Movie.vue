<template>
	<Card v-if="title !== ''" :title="title">
		<p class="card-text">Sortie : {{releaseyear}}</p>
		<p class="card-text">Genre : {{genre}}</p>
		<p class="card-text">Acteurs : {{actors}}</p>
		<p class="card-text">Directeurs : {{directors}}</p>
	</Card>
	<Card v-else additional-card-class="border-warning bg-warning empty-movie">
		<img src="../assets/img/clapper.png" alt="Aucun film disponible" title="Aucun film disponible"/>
	</Card>
</template>

<script>
import Card from "./Card";
export default {
	name: "Movie",
	components: { Card },
	data() {
		return {
			isHoveringCard: false,
		};
	},
	props: {
		id: {
			type: String,
		},
		title: {
			type: String,
			default: '',
		},
		releaseyear: {
			type: Number,
		},
		releasedate: {
			type: String,
		},
		genre: {
			type: String,
		},
		writer: {
			type: String,
		},
		actors: {
			type: String,
		},
		directors: {
			type: String,
		},
	}
};
</script>

<style scoped lang="scss">
@import "../assets/css/card-style";
</style>
