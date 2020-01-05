<template>
	<div class="description-movie">
		<div>
			<h2 class="card-text">{{movie.title}}</h2>
			<br>
			<h3 class="card-text"> <span>Description</span></h3>
			<div class="row content">
				<img v-if="this.movie.cover !== ''" class="img-thumbnail" :src="this.movie.cover"/>
				<div class="content">
					<p class="card-text"><b>Genre :</b>
						<Badge v-for="g in parseGenre" :title="g" :label-color="getGenreColorType(g)" :key="g"/>
					</p>
					<br>
					<p class="card-text"><b>Sortie :</b> {{movie.releaseyear}}</p>
					<br>
					<p class="card-text"><b>Acteurs :</b> <span v-html="parseActors"></span></p>
					<br>
					<p class="card-text"><b>Directeurs :</b> <span v-for="director in directorsArray" v-bind:key="director">{{director}}</span></p>
					<br>
				</div>
			</div>
			
			<h3 class="card-text"><span>Casting</span></h3>
			<div class="row content">
				<Actor class="actor" v-for="actor in this.$store.getters.castingActors" v-bind="actor" :key="actor.id" :display-filmography-button="false"/>
			</div>
		</div>
	</div>
</template>

<script>
	import Actor from "./Actor";
	import Badge from "./Badge";
	
	export default {
		name: "MovieInfo",
		components: { Actor, Badge },
		props: {
			movie: {},
		},
		created() {
			this.$store.dispatch("fetchCastingActors", this.movie.id);
		},
		methods: {
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
				return this.movie.actors.replace(/\s*\|\s*/g, ", ");
			},
			parseDirectors() {
				return this.movie.directors.replace(/\s*\|\s*/g, ", ");
			},
			parseGenre() {
				return this.movie.genre.split(/\s*\|\s*/);
			},
			directorsArray() {
				return this.parseDirectors.split(",");
			},
		},
	};
</script>

<style lang="scss">
	@import "../assets/css/more-badges";

	$color-c: #0b3456;
	$color-w: #dee199;

	.description-movie {
		position: relative;
		.content {
			padding: 20px 20px;
			position: relative;
			z-index: 20;
			text-align: center;
			justify-content: center;
		}
		h3{
			display: block;
			height: 50px;
			position: relative;
			span {
				color: $color-c;
				background: $color-w;
				border: 5px solid;
				border-radius: 30px;
				display: block;
				margin: 0 0 0 50px;
				padding: 10px 30px 5px;
				position: absolute;
				text-transform: uppercase;
				top: 50%;
				transform-origin: top left;
				z-index: 30;
			}
			&:before {
				content: "";
				height: 5px;
				left: -5%;
				position: absolute;
				top: 50%;
				transform-origin: top left;
				width: 110%;
				z-index: 30;
			}
			&:nth-child(4n+1){
				span {
					right: 0;
					top: 0;
					border-color: $color-c;
					transform: rotate(-6deg);
				}
				&:before {
					background: $color-c;
					transform: translateY(100%);
					transform-origin: bottom left;
				}
			}
			&:nth-child(4n+3) {
				span {
					border-color: $color-c;
					transform: rotate(3deg) translateY(-50%);
				}
				&:before {
					background: $color-c;
					transform: translateY(100%);
					transform-origin: bottom left;
				}
			}
		}
	}
	
</style>
