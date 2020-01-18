<template>
	<ul class="pagination pagination-lg justify-content-center">
		<li class="page-item" :class="{disabled: currentPageNumber === 1}"><a class="page-link" @click="onPageClicked">&laquo;</a></li>
		<li class="page-item" v-for="p in generatePaginationRange(pageBounds[0], pageBounds[1])" :class="{active: currentPageNumber === p}" :key="p"><a class="page-link" @click="onPageClicked">{{p}}</a></li>
		<li class="page-item" :class="{disabled: currentPageNumber === this.maxPages}"><a class="page-link" @click="onPageClicked">&raquo;</a></li>
	</ul>
</template>

<script>
export default {
	name: "Pagination",
	props: {
		maxPages: {
			type: Number,
			required: true,
		},
	},
	methods: {
		onPageClicked(event) {
			let p = parseInt(event.target.text);
			
			if (event.target.text === '«')
				p = 1;
			if (event.target.text === '»')
				p = this.maxPages;
			
			if (!isNaN(p))
				this.$store.dispatch("onCurrentPageNumberChanged", p);
			
			this.$emit("page-clicked");
		},
		generatePaginationRange(min, max, step = 1) {
			let range = [];
			for (let i = min; i <= max; i += step)
				range.push(i);
			return range;
		},
	},
	computed: {
		currentPageNumber() {
			return this.$store.getters.currentPageNumber;
		},
		batchSize() {
			return this.$store.getters.batchSize;
		},
		pageBounds() {
			let lowerPage = Math.max(this.currentPageNumber - 2, 1);
			let upperPage = Math.min(this.currentPageNumber + 2, this.maxPages);
			let delta = upperPage - lowerPage;
			// If the number of maximum page available is not matched, add the other pages
			if (delta < 4) {
				if (lowerPage === 1) {
					// Add more page in upperPage
					upperPage += Math.min(4, this.maxPages-1) - delta
				}
				else {
					// Add more page in lowerPage
					lowerPage -= 4 - delta
				}
			}
			return [lowerPage, upperPage];
		},
	},
};
</script>

<style scoped lang="scss">
@import "../assets/css/bootstrap.min.css";
@import "../assets/css/colors";

.page-item a {
	text-decoration: none;
}

.pagination {
	margin-top: 20px;
}

.page-link {
	background-color: $yellow;
	transition: all ease-in .2s;
	color: #000000ad !important;
}
.page-link:hover {
	background-color: $yellowLight;
}
.page-item.active .page-link {
	background-color: $yellowLight;
}
.page-item.disabled .page-link {
	background-color: $yellowDark;
}
</style>
