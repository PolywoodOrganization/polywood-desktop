<template>
	<div class="container">
		<div class="row">
			<p><a href="#" @click.prevent="onBackClicked">&lt; {{this.backText}}</a></p>
		</div>
		
		<div class="row">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "DialogBox",
	props: {
		backText: {
			type: String,
			default: 'Retour',
			required: false,
		},
	},
	methods: {
		onBackClicked() {
			this.$emit("closed");
		},
	},
};
</script>

<style scoped lang="scss">

</style>
