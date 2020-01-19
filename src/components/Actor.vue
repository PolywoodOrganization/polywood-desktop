<template>
	<div class="card border-secondary shadow-sm col-xl-3 col-lg-3 col-md-5 col-sm-12" v-if="name !== ''" @mouseover="isHoveringCard = true" @mouseout="isHoveringCard = false" :class="{shadow: isHoveringCard}">
		<div class="card-header">{{name}}</div>
		<div class="card-body">
			<p class="card-text">Nombre de films : {{moviecount}}</p>
			<p class="card-text">Note : {{rating}}</p>
			<p class="card-text">Google hits : {{googlehits}}</p>
			<p class="card-text" v-if="googleRating">Note google : <span v-for="(n, index) in googleRating" v-bind:key="index">⭐</span></p>
			<p class="card-text" v-else>Note google : 0 </p>
			<p class="card-text">Note imdb : <span v-for="(n, index) in imdbRating" v-bind:key="index">⭐</span></p>
			<p class="rank">{{globalRating}} /10 </p>
			<button v-if="this.displayFilmographyButton" class="btn btn-primary" @click="onFilmographyClicked">Voir filmographie</button>
		</div>
	</div>
	<div class="card border-warning bg-warning shadow-sm col-lg-3 col-md-2 col-sm-2 col-xs-2 empty-movie"  v-else  @mouseover="isHoveringCard = true" @mouseout="isHoveringCard = false" :class="{shadow: isHoveringCard}">
		<div class="card-body">
			<img src="../assets/img/director-chair.png" alt="Aucun acteur disponible" title="Aucun acteur disponible"/>
		</div>
	</div>
</template>

<script>
export default {
	name: "Actor",
	data() {
		return {
			isHoveringCard: false,
		};
	},
	props: {
		id: {
			type: Number,
		},
		name: {
			type: String,
		},
		moviecount: {
			type: Number,
		},
		rating: {
			type: Number,
		},
		googlehits: {
			type: Number,
		},
		googleRating: {
			type: Number,
		},
		imdbRating: {
			type: Number,
		},
		globalRating: {
			type: Number,
		},
		displayFilmographyButton: {
			type: Boolean,
			default: true,
			required: false,
		},
	},
	methods: {
		onFilmographyClicked() {
			this.$store.dispatch("fetchFilmographyMovies", this.id);
			this.$store.dispatch("showFilmographyBox");
		},
	},
};
</script>

<style scoped lang="scss">
@import "../assets/css/card-style";
	
	.rank{
		background-color: #ecba2e;
		padding: 8px;
		font-weight: bold;
		color: white;
		position: absolute;
		right: 0;
		top: 5px;
		border-radius: 20px;
	}
</style>
