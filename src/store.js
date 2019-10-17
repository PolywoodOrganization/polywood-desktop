export const state = {
	navigationId: 0,
	movies: [],
	actors: [],
};

export const getters = {
	navigationId(state) {
		return state.navigationId;
	},
	movies(state) {
		return state.movies;
	},
	actors(state) {
		return state.actors;
	},
};

export const actions = {
	onNavigationIdChanged(toolkit, payload) {
		toolkit.commit("setNavigationId", payload);
	},
	// fetchMovies(toolkit, _) {
	// 	throw new Error("Not implemented");
	// },
	onMoviesChanged(toolkit, payload) {
		toolkit.commit("setMovies", payload);
	},
	// fetchActors(toolkit, _) {
	// 	throw new Error("Not implemented");
	// },
	onActorsChanged(toolkit, payload) {
		toolkit.commit("setActors", payload);
	},
};

export const mutations = {
	setNavigationId(state, payload) {
		state.navigationId = payload;
	},
	setMovies(state, payload) {
		state.movies = payload;
	},
	setActors(state, payload) {
		state.actors = payload;
	},
};
