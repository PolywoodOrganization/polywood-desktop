<template>
	<Card v-if="title !== ''" :title="title" :cover="cover" additional-card-class=" col-xl-3 col-lg-3 col-md-5 col-sm-12 border-secondary">
		<p class="card-text"><b>Genre :</b> <Badge v-for="g in parseGenre" @onBadgeClicked="onGenreClicked" :title="g" :label-color="getGenreColorType(g)" :key="g"/></p>
		<p class="card-text"><b>Sortie :</b> {{releaseyear}}</p>
		<p class="card-text"><b>Acteurs :</b> <span v-html="parseActors"></span></p>
		<p class="card-text"><b>Directeurs :</b> <span v-html="parseDirectors"></span></p>
		<button v-if="this.displayCastingButton" class="btn btn-primary" @click="onCastingClicked">Voir casting</button>
		<button class="fav-heart" v-if="isUserFavorite" @click="removeFromFavorites">❤️</button>
		<button class="fav-heart" v-else  @click="addToFavorite">❤</button>
	</Card>
	<Card v-else additional-card-class="border-warning bg-warning empty-movie col-lg-3 col-md-2">
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
		displayCastingButton: {
			type: Boolean,
			default: true,
			required: false,
		},
	},
	methods: {
		onGenreClicked(g) {
			if (g !== undefined)
				this.$store.dispatch("onSearchValueChanged", g);
		},
        addToFavorite(){
            let favToAdd = {
                idmovie: this.id,
                commentary: "",
                added:  new Date(),
            };

            this.$store.dispatch("addNewFavorite", { token: this.$store.getters.authToken , toAdd: favToAdd});

        },
        removeFromFavorites(){
            this.$store.dispatch("removeMovieFavorite", { token: this.$store.getters.authToken , idMovie: this.id});

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
		onCastingClicked() {
			this.$store.dispatch("fetchCastingActors", this.id);
			this.$store.dispatch("showCastingBox");
		},
	},
	computed: {
        isUserFavorite(){
            return this.$store.getters.favorites.filter(fav => fav.idmovie === this.id).length !== 0;
        },
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

.fav-heart {
    position: absolute;
    top: 15px;
    right: 0;
	background-color: transparent;
	border: none;
}
</style>
