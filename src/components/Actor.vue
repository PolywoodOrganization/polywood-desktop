<template>
	<div class="card border-secondary shadow-sm col-lg-3 col-md-2" v-if="name !== ''" @mouseover="isHoveringCard = true" @mouseout="isHoveringCard = false" :class="{shadow: isHoveringCard}">
		<div class="card-header">{{name}}</div>
		<div class="card-body">
			<p class="card-text">Nombre de films : {{moviecount}}</p>
			<p class="card-text">Note : {{rating}}</p>
			<p class="card-text">Google hits : {{googlehits}}</p>
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
	},
};
</script>

<style scoped lang="scss">
@import "../assets/css/card-style";
</style>
