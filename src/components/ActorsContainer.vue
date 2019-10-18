<template>
	<div class="container movies-container">
		<div class="row justify-content-center" v-if="this.$store.getters.actors.length !== 0">
			<Actor class="actor" v-for="actor in this.$store.getters.actors" v-bind="actor" :key="actor.id"/>
		</div>
		<div class="row justify-content-center" v-else>
			<p>Aucun acteur trouvé 😕</p>
		</div>
	</div>
</template>

<script>
	import Actor from "./Actor";
	export default {
		name: "ActorsContainer",
		components: { Actor },
	};
</script>

<style scoped>

</style>
