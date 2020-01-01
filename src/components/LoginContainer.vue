<template>
	<div class="container" id="login-container">
		<div v-if="this.authToken === undefined || this.authToken === null">
			<form class="row" @submit.prevent="onLoginClicked">
				<label for="login-username" class="col-12">Pseudonyme</label>
				<input type="text" class="form-control col-12" id="login-username" name="login-username" placeholder="Nom d'utilisateur" v-model="username"/>
				
				<label for="login-password"  class="col-12">Mot de passe</label>
				<input type="password" class="form-control col-12" id="login-password" name="login-password" placeholder="Entrer le mot de passe" v-model="password"/>
				
				<input type="submit" value="Se connecter" class="btn btn-primary col-12" :class="{'disabled': username === '' || password === ''}"/>
			</form>
		</div>
		<div v-else class="row">
			<p class="col-12">You're logged in, {{this.$store.getters.username}}</p>
			<button class="btn btn-primary col-12" @click="onLogoutClicked" type="button">Log out</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "LoginContainer",
	data() {
		return {
			username: "",
			password: "",
		};
	},
	methods: {
		onLoginClicked() {
			if (this.authToken === undefined || this.authToken === null)
				this.$store.dispatch("login", { login: this.username, password: this.password });
		},
		onLogoutClicked() {
			this.$store.dispatch("logout");
		},
	},
	computed: {
		authToken() {
			return this.$store.getters.authToken;
		},
	},
};
</script>

<style scoped lang="scss">
#login-container {
	display: flex;
	justify-content: center;
	
	.row {
		label {
			margin-top: 10px;
			margin-bottom: 0;
			padding: 0;
		}
		
		input[type="submit"], input[type="button"], button {
			margin-top: 10px;
		}
	}
}
</style>
