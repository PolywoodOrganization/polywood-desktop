<template>
	<div class="card border-secondary col-lg-3 col-md-2 col-sm-2 col-xs-2" v-if="title !== ''">
		<div class="card-header">{{title}}</div>
		<div class="card-body">
			<p class="card-text">Release: {{releaseyear}}</p>
			<p class="card-text">Genre: {{genre}}</p>
			<p class="card-text">Actors: {{actors}}</p>
			<p class="card-text">Directors: {{directors}}</p>
		</div>
	</div>
	<div class="card border-danger col-lg-3 col-md-2 col-sm-2 col-xs-2 empty-movie" v-else>
		<div class="card-body">
			<img src="../assets/img/clapper.png" alt="Aucun film disponible" title="Aucun film disponible"/>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Movie",
		props: {
			id: {
				type: String,
			},
			title: {
				type: String,
				default: "",
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
@import "../assets/css/colors";

.card {
	margin: 10px;
	padding: 0;
}

.card-header {
	font-size: 14pt;
	font-weight: bold;
}

.card-body {
	p {
		font-size: 12pt;
	}
}

.card-body img {
	width: 100%;
	height: 100%;
}

.card.empty-movie {
	background-color: $accentColor;
}
</style>
