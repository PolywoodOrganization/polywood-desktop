<template>
	<Card v-if="title !== ''" :title="title" cover="https://m.media-amazon.com/images/M/MV5BNDJmMWIwY2EtNWE1NS00NDQ0LTliODYtZTczZmY0MDVmNGIxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_UY268_CR8,0,182,268_AL_.jpg">
		<p class="card-text"><b>Genre :</b> <span v-html="parseGenre"></span></p>
		<p class="card-text"><b>Sortie :</b> {{releaseyear}}</p>
		<p class="card-text"><b>Acteurs :</b> <span v-html="parseActors"></span></p>
		<p class="card-text"><b>Directeurs :</b> {{directors}}</p>
	</Card>
	<Card v-else additional-card-class="border-warning bg-warning empty-movie">
		<img src="../assets/img/clapper.png" alt="Aucun film disponible" title="Aucun film disponible"/>
	</Card>
</template>

<script>
import Card from "./Card";

function getGenreColorType(genre) {
	switch (genre.toLowerCase()) {
		case "drama":
		case "thriller":
		case "action":
			return "danger";
		case "horror":
		case "crime":
		case "history":
			return "secondary";
		case "romance":
		case "sci-fi":
		case "scifi":
			return "warning";
		case "adventure":
		case "biography":
			return "info";
		case "mystery":
		case "fantasy":
			return "light";
		case "comedy":
			return "success";
		default:
			return "primary";
	}
}

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
	},
	computed: {
		parseActors() {
			return this.actors.replace(/ \| /g, ", ");
		},
		parseGenre() {
			let html = '';
			this.genre.split(" | ").forEach(g => {
				html += `<span class="badge badge-${getGenreColorType(g)} badge-genre">${g}</span>`
			});
			return html;
		}
	},
};
</script>

<style lang="scss">
@import "../assets/css/card-style";

.badge-genre {
	margin-right: 5px;
}
</style>
