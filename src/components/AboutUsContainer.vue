<template>
	<div class="container">
		<div class="row">
			<h2 class="col-12">À propos de Polywood</h2>
			
			<div class="jumbotron col-12">
				<h1 class="display-4">Polywood</h1>
				<p class="lead">Le meilleur du cinéma Polywoodien!</p>
				<hr class="my-4"/>
				<p>
					Polywood est une filiale de Polytech Corporation. Son but est d'oeuvrer pour une meilleure qualité
					cinématographie, et de combattre le spoil, un problème qui fait encore plusieurs milliers de
					victimes chaques années. Luttons contre le spoil! Dites <b>NON</b> aux "<i>résumés rapides</i>" du
					dernier épisode de votre série du moment de la part de votre collègue à la machine à café!
				</p>
			</div>
			
			<div class="jumbotron col-12">
				<h1 class="display-4">Polytech Corporation&reg;</h1>
				<p class="lead">Le leader mondial en terme d'éducation et d'ingénierie</p>
				<hr class="my-4"/>
				<p>
					Polytech Corp est la multinationale française dont l'expértise en éducation et ingénierie reste
					encore inégalée.
				</p>
			</div>
		</div>
		
		<div class="row justify-content-center">
			<h2 class="col-12">À propos de l'équipe Polywood</h2>
			
			<Card
				v-for="developer in this.$store.getters.developers"
				:title="developer.name"
				:cover="developer.image"
				:cover-alt="developer.name"
				:key="developer.id"
				:additional-card-class="['col-lg-5', 'col-md-10', 'border-' + developer.colorLabel]"
				additional-cover-style="max-width: 200px;"
				additional-cover-class="align-self-center">
				<p><b>Jobs:</b> <span
					v-for="(job, index) in developer.jobs"
					:class="['badge', {'badge-primary' : index === 0}, badgeColorClass(developer, index)]"
					:key="index">{{job}}</span>
				</p>
			</Card>
		</div>
		
		<div class="row raw-text">
			<h2 class="col-12">Code Source</h2>
			
			<p class="col-12">Les logiciels de Polywood sont Open Source, et disponible sur <img src="../assets/img/github/GitHub-Mark-Light-32px.png" style="height: 1em;" alt="GitHub Logo"/> GitHub :</p>
			<ul class="col-12">
				<li>Code Source du site web Polywood: <a href="https://github.com/PolywoodOrganization/polywood-desktop" target="_blank"><img src="../assets/img/github/GitHub-Mark-Light-32px.png" alt="GitHub Logo"/> GitHub - polywood-desktop</a></li>
				<li>Code Source de Polywood sur mobile: <a href="https://github.com/PolywoodOrganization/polywood-mobile" target="_blank"><img src="../assets/img/github/GitHub-Mark-Light-32px.png" alt="GitHub Logo"/> GitHub - polywood-mobile</a></li>
				<li>Code Source du webservice des films: <a href="https://github.com/PolywoodOrganization/polywood-film-service" target="_blank"><img src="../assets/img/github/GitHub-Mark-Light-32px.png" alt="GitHub Logo"/> GitHub - polywood-film-service</a></li>
				<li>Code Source du webservice des acteurs: <a href="https://github.com/PolywoodOrganization/polywood-actor-service" target="_blank"><img src="../assets/img/github/GitHub-Mark-Light-32px.png" alt="GitHub Logo"/> GitHub - polywood-actor-service</a></li>
				<li>Page GitHub de Polywood: <a href="https://github.com/PolywoodOrganization/" target="_blank"><img src="../assets/img/github/GitHub-Mark-Light-32px.png" alt="GitHub Logo"/> GitHub - Polywood Organization</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
import Card from "./Card";
export default {
	name: "AboutUsContainer",
	components: { Card },
	methods: {
		badgeColorClass(developer, index) {
			if (index === 0)
				return '';
			else
				return `badge-${developer.colorLabel}`;
		}
	}
};
</script>

<style scoped lang="scss">
h1, h2, h3, h4, h5, h6 {
	display: block;
}
h2 {
	margin-bottom: 20px;
}

.row {
	margin-bottom: 50px;
}

.jumbotron {
	h1, h2, h3, h4, h5, h6 {
		color: white;
	}
}

.badge {
	margin-right: 5px;
}

li img {
	height: 1em;
}

p, li {
	font-size: 14pt;
}

.raw-text {
	margin: 0 100px;
}
</style>
