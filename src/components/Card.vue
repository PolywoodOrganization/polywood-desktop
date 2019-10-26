<template>
	<div
		class="card shadow-sm"
		@mouseover="isHoveringCard = true"
		@mouseout="isHoveringCard = false"
		:class="[{shadow: isHoveringCard}, additionalCardClass]"
		:style="additionalCardStyle">
		
		<div
			v-if="title !== ''"
			class="card-header"
			:class="additionalCardHeaderClass"
			:style="additionalCardHeaderStyle">
			{{title}}
		</div>
		
		<img
			v-if="cover !== ''"
			class="card-img-top"
			:src="cover"
			:alt="coverAlt"
			:title="coverAlt"
			:class="additionalCoverClass"
			:style="additionalCoverStyle"/>
		
		<div
			class="card-body"
			:class="additionalCardBodyClass"
			:style="additionalCardBodyStyle">
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
		cover: {
			type: String,
			required: false,
			default: '',
		},
		coverAlt: {
			type: String,
			required: false,
			default: '',
		},
		additionalCardClass: {
			type: String,
			required: false,
			default: '',
		},
		additionalCardStyle: {
			type: String,
			required: false,
			default: '',
		},
		additionalCardHeaderClass: {
			type: String,
			required: false,
			default: '',
		},
		additionalCardHeaderStyle: {
			type: String,
			required: false,
			default: '',
		},
		additionalCardBodyClass: {
			type: String,
			required: false,
			default: '',
		},
		additionalCardBodyStyle: {
			type: String,
			required: false,
			default: '',
		},
		additionalCoverClass: {
			type: String,
			required: false,
			default: '',
		},
		additionalCoverStyle: {
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
