<template>
	<Card v-if="title !== ''" :title="title" :cover="cover">
		<p class="card-text"><b>Genre :</b> <Badge v-for="g in parseGenre" @onBadgeClicked="onGenreClicked" :title="g" :label-color="getGenreColorType(g)" :key="g"/></p>
		<p class="card-text"><b>Sortie :</b> {{releaseyear}}</p>
		<p class="card-text"><b>Acteurs :</b> <span v-html="parseActors"></span></p>
		<p class="card-text"><b>Directeurs :</b> <span v-html="parseDirectors"></span></p>
	</Card>
	<Card v-else additional-card-class="border-warning bg-warning empty-movie">
		<img src="../assets/img/clapper.png" alt="Aucun film disponible" title="Aucun film disponible"/>
	</Card>
</template>

<script>
import Card from "./Card";
import Badge from "./Badge";

export default {
	name: "Movie",
	components: { Badge, Card },
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
		cover: {
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
	methods: {
		onGenreClicked(g) {
			if (g !== undefined)
				this.$store.dispatch("onSearchValueChanged", g);
		},
		getGenreColorType(genre) {
			switch (genre.toLowerCase()) {
				case "drama":
				case "horror":
					return "purple";
				case "romance":
					return "pink";
				case "thriller":
				case "mystery":
					return "brown";
				case "action":
					return "danger";
				case "crime":
				case "history":
					return "secondary";
				case "sci-fi":
				case "scifi":
					return "warning";
				case "adventure":
				case "biography":
					return "info";
				case "fantasy":
					return "yellow";
				case "comedy":
					return "success";
				default:
					return "primary";
			}
		},
	},
	computed: {
		parseActors() {
			return this.actors.replace(/\s*\|\s*/g, ", ");
		},
		parseDirectors() {
			return this.directors.replace(/\s*\|\s*/g, ", ");
		},
		parseGenre() {
			return this.genre.split(/\s*\|\s*/);
		},
	},
};
</script>

<style lang="scss">
@import "../assets/css/more-badges";

.badge-genre {
	margin-right: 5px;
}
</style>
