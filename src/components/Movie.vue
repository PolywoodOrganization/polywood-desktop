<template>
	<div class="card border-secondary shadow-sm col-lg-3 col-md-2" v-if="title !== ''" @mouseover="isHoveringCard = true" @mouseout="isHoveringCard = false" :class="{shadow: isHoveringCard}">
		<div class="card-header">{{title}}</div>
		<div class="card-body">
			<p class="card-text">Sortie : {{releaseyear}}</p>
			<p class="card-text">Genre : {{genre}}</p>
			<p class="card-text">Acteurs : {{actors}}</p>
			<p class="card-text">Directeurs : {{directors}}</p>
		</div>
	</div>
	<div class="card border-warning bg-warning shadow-sm col-lg-3 col-md-2 col-sm-2 col-xs-2 empty-movie"  v-else  @mouseover="isHoveringCard = true" @mouseout="isHoveringCard = false" :class="{shadow: isHoveringCard}">
		<div class="card-body">
			<img src="../assets/img/clapper.png" alt="Aucun film disponible" title="Aucun film disponible"/>
		</div>
	</div>
</template>

<script>
export default {
	name: "Movie",
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
