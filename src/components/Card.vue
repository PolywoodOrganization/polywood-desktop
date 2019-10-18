<template>
	<div class="card border-secondary shadow-sm col-lg-3 col-md-2" @mouseover="isHoveringCard = true" @mouseout="isHoveringCard = false" :class="[{shadow: isHoveringCard}, this.additionalCardClass]">
		<div class="card-header" :class="this.additionalCardHeaderClass" v-if="title !== ''">{{title}}</div>
		<div class="card-body" :class="this.additionalCardBodyClass">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "Card",
	data() {
		return {
			isHoveringCard: false,
		};
	},
	props: {
		title: {
			type: String,
			required: false,
			default: '',
		},
		additionalCardClass: {
			type: String,
			required: false,
			default: '',
		},
		additionalCardHeaderClass: {
			type: String,
			required: false,
			default: '',
		},
		additionalCardBodyClass: {
			type: String,
			required: false,
			default: '',
		},
	},
};
</script>

<style scoped lang="scss">
@import "../assets/css/card-style";
</style>
