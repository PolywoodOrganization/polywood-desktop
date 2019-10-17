<template>
	<div class="container" id="footer-container">
		<div class="row">
			<div class="col-4">
				<p>Polywood est une filiale de Polytech Corporation&reg;</p>
			</div>
			
			<div class="col-4">
				<p><b>Adresse:</b></p>
				<p><a href="https://goo.gl/maps/jzi1dvntwvKcU1118" target="_blank">15 Boulevard André Latarjet, 69100 Villeurbanne</a></p>
				
				<br/>
				
				<p><b>Une question ?</b></p>
				<p>Voir <a href="#" @click="onContactUsClicked">Contacter nous</a></p>
			</div>
			
			<div class="col-4">
				<p><b>Réseaux Sociaux</b></p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "FooterBanner",
	methods: {
		onContactUsClicked() {
			this.$store.dispatch("onNavigationIdChanged", 2);
		},
	}
};
</script>

<style scoped lang="scss">
@import "../assets/css/colors";
@import "../assets/css/bootstrap.min.css";

#footer-container {
	width: 100%;
	max-width: 100%;
	margin: 50px 0 0;
	padding: 50px 20px;
	background-color: $primaryDarkColor;
}
</style>
