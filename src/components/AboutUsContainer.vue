<template>
	<div class="container">
		<div class="row justify-content-center">
			<h2>À propos de l'équipe Polywood</h2>
		</div>
		<div class="row justify-content-center">
			<Card
				v-for="developer in this.$store.getters.developers"
				:title="developer.name"
				:cover="developer.image"
				:cover-alt="developer.name"
				:key="developer.id"
				:additional-card-class="['col-lg-5', 'col-md-10', 'border-' + developer.colorLabel]"
				additional-cover-style="max-width: 200px;"
				additional-cover-class="align-self-center">
				<p><b>Nom:</b> {{developer.name}}</p>
				<p><b>Jobs:</b> <span
					v-for="(job, index) in developer.jobs"
					:class="['badge', {'badge-primary' : index === 0}, badgeColorClass(developer, index)]"
					:key="index">{{job}}</span>
				</p>
			</Card>
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
.badge {
	margin-right: 5px;
}
</style>
