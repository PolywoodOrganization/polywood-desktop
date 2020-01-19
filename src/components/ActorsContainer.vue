<template>
	<div class="container actors-container" id="actors">
		<div class="row justify-content-center" v-if="this.nbActors !== 0">
			<Actor class="actor" v-for="actor in this.$store.getters.actors" v-bind="actor" :key="actor.id"/>
		</div>
		
		<div class="row justify-content-center" v-else>
			<Card v-if="this.$store.getters.searchValue !== ''" additional-card-class="border-warning bg-warning empty-movie" title="Aucun acteur trouvé 😕">
				<img src="../assets/img/director-chair.png" alt="Aucun acteur disponible" title="Aucun acteur disponible"/>
			</Card>
			<Card v-else additional-card-class="border-warning bg-warning empty-movie" title="Chargement ⏳">
				<img src="../assets/img/director-chair.png" alt="Chargement..." title="Chargement..." />
			</Card>
		</div>
		
		<div class="row">
			<div class="col-12">
				<Pagination :max-pages="nbPages" @page-clicked="pageClicked"/>
			</div>
		</div>
	</div>
</template>

<script>
import Actor from "./Actor";
import Card from "./Card";
import Pagination from "./Pagination";
export default {
	name: "ActorsContainer",
	components: { Pagination, Actor, Card },
	created() {
		this.$store.dispatch("fetchActors");
	},
	methods: {
		pageClicked() {
			// Fetch new actors
			this.$store.dispatch("fetchActors");
			
			// Scroll at the top of the page
			document.getElementById("actors").scrollIntoView({behavior: "smooth"});
		},
	},
	computed: {
		nbActors() {
			return this.$store.getters.actors.length;
		},
		nbPages() {
			let pages = this.$store.getters.maxActorsPages;
			if (pages == null)
				return 10;
			return pages;
		},
	},
};
</script>

<style scoped lang="scss">
.actor {
	display: inline-block;
}
</style>
