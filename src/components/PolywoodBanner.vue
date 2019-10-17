<template>
	<div id="banner-container">
		<img src="../assets/img/polywood-banner-background.png" id="background" alt="Background"/>
		<img src="../assets/img/polywood-banner-sun.png" id="sun" alt="Sun" class="superposed-img" :style="{transform: `translate3d(0, ${offset}px, 0)`}"/>
		<img src="../assets/img/polywood-banner-clouds.png" id="clouds" alt="Clouds" class="superposed-img" :style="{transform: `translate3d(0, ${offset}px, 0)`}"/>
		<img src="../assets/img/polywood-banner-mountain.png" id="mountain" alt="Mountain" class="superposed-img"/>
	</div>
</template>

<script>
export default {
	name: "PolywoodBanner",
	props: {
		factor: {
			default: 0.25,
			type: Number
		},
		enableParallax: {
			default: true,
			type: Boolean
		}
	},
	data() {
		return {
			parallax: {
				width: 0,
				height: 0,
				scrollFactor: 0
			}
		};
	},
	mounted() {
		this.computeParallax();
		
		const eventHandler = () => requestAnimationFrame(this.computeParallax);
		window.addEventListener("resize", eventHandler);
		window.addEventListener("scroll", eventHandler);
		
		this.$on(`hook:destroyed`, () => {
			window.removeEventListener("resize", eventHandler);
			window.removeEventListener("scroll", eventHandler);
		})
	},
	methods: {
		computeParallax() {
			const containerRect = this.$el.getBoundingClientRect();
			
			this.parallax.width = containerRect.width;
			this.parallax.height = containerRect.height;
			
			const viewportOffsetTop = containerRect.top;
			const viewportOffsetBottom = window.innerHeight - viewportOffsetTop;
			
			this.parallax.scrollFactor = viewportOffsetBottom / (window.innerHeight + this.parallax.height);
		}
	},
	computed: {
		offset() {
			if (this.enableParallax)
				return this.parallax.scrollFactor * this.parallax.height * this.factor - 75;
			else
				return 0;
		}
	}
};
</script>

<style scoped>
#banner-container {
	display: block;
	overflow: hidden;
}

#banner-container img {
	width: 100%;
	background-attachment: fixed;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}

.superposed-img {
	position: absolute;
	top: 0;
	left: 0;
}
</style>
