<template>
	<div class="container" id="footer-container">
		<div class="row">
			<div class="col-4">
				<p>Polywood est une filiale de Polytech Corporation&reg;</p>
			</div>
			
			<div class="col-4">
				<h3>Adresse:</h3>
				<p><a href="https://goo.gl/maps/jzi1dvntwvKcU1118" target="_blank">15 Boulevard André Latarjet, 69100 Villeurbanne</a></p>
				
				<br/>
				
				<h3>Une question ?</h3>
				<p>Voir <a href="#" @click="onContactUsClicked">Contacter nous</a></p>
			</div>
			
			<div class="col-4">
				<h3>Réseaux Sociaux</h3>
				<p><a href="https://github.com/PolywoodOrganization/" target="_blank"><img src="../assets/img/github/GitHub-Mark-Light-32px.png" alt="GitHub Logo"/></a></p>
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

h1, h2, h3, h4, h5, h6 {
	font-size: 16pt;
	color: white;
	font-weight: bold;
}

p {
	margin-bottom: 5px;
	text-align: center;
	font-size: 12pt;
}
</style>
