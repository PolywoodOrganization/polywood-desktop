<template>
	<div class="container movies-container">
		<div class="row justify-content-center" v-if="this.$store.getters.actors.length !== 0">
			<Actor class="actor" v-for="actor in this.$store.getters.actors" v-bind="actor" :key="actor.id"/>
		</div>
		<div class="row justify-content-center" v-else>
			<Card additional-card-class="border-warning bg-warning empty-movie" title="Aucun acteur trouvé 😕">
				<img src="../assets/img/director-chair.png" alt="Aucun acteur disponible" title="Aucun acteur disponible"/>
			</Card>
		</div>
	</div>
</template>

<script>
	import Actor from "./Actor";
	import Card from "./Card";
	export default {
		name: "ActorsContainer",
		components: { Actor, Card },
	};
</script>

<style scoped>

</style>
