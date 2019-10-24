<template>
	<a @click="this.$emit('onBadgeClicked', this.title)"><span :class="['badge', 'badge-' + this.labelColor]">{{title}}</span></a>
</template>

<script>
export default {
	name: "Badge",
	props: {
		title: {
			type: String,
			required: true,
		},
		labelColor: {
			type: String,
			required: false,
			default: "primary",
		}
	},
};
</script>

<style scoped>
.badge {
	margin-right: 5px;
}
</style>
