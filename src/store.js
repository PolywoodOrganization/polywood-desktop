export const state = {
	navigationId: 0,
	searchValue: "",
	sortingMethod: 0,
	movies: [
		{
			id: "1",
			title: "Title 1",
			releaseyear: "",
			releasedate: "",
			genre: "",
			writer: "",
			actors: "",
			directors: "",
		},
		{
			id: "2",
			title: "Title 2",
			releaseyear: "",
			releasedate: "",
			genre: "",
			writer: "",
			actors: "",
			directors: "",
		},
		{
			id: "3",
			title: "Title 3",
			releaseyear: "",
			releasedate: "",
			genre: "",
			writer: "",
			actors: "",
			directors: "",
		},
		{
			id: "4",
			title: "Title 4",
			releaseyear: "",
			releasedate: "",
			genre: "",
			writer: "",
			actors: "",
			directors: "",
		},
		{
			id: "5",
			title: "Title 5",
			releaseyear: "",
			releasedate: "",
			genre: "",
			writer: "",
			actors: "",
			directors: "",
		},
		{
			id: "6",
			title: "Title 6",
			releaseyear: "",
			releasedate: "",
			genre: "",
			writer: "",
			actors: "",
			directors: "",
		},
		{
			id: "7",
			title: "",
			releaseyear: "",
			releasedate: "",
			genre: "",
			writer: "",
			actors: "",
			directors: "",
		},
		{
			id: "8",
			title: "",
			releaseyear: "",
			releasedate: "",
			genre: "",
			writer: "",
			actors: "",
			directors: "",
		},
		{
			id: "9",
			title: "",
			releaseyear: "",
			releasedate: "",
			genre: "",
			writer: "",
			actors: "",
			directors: "",
		},
	],
	actors: [],
};

export const getters = {
	navigationId(state) {
		return state.navigationId;
	},
	searchValue(state) {
		return state.searchValue;
	},
	sortingMethod(state) {
		return state.sortingMethod;
	},
	movies(state) {
		if (state.searchValue === "") return state.movies;
		else
			return state.movies.filter(movie => {
				return (
					movie.title.toLowerCase().includes(state.searchValue.toLowerCase()) ||
					movie.releaseyear
						.toString()
						.toLowerCase()
						.includes(state.searchValue.toLowerCase()) ||
					movie.releasedate
						.toString()
						.toLowerCase()
						.includes(state.searchValue.toLowerCase()) ||
					movie.genre
						.toString()
						.toLowerCase()
						.includes(state.searchValue.toLowerCase()) ||
					movie.writer
						.toString()
						.toLowerCase()
						.includes(state.searchValue.toLowerCase()) ||
					movie.actors
						.toString()
						.toLowerCase()
						.includes(state.searchValue.toLowerCase()) ||
					movie.directors
						.toString()
						.toLowerCase()
						.includes(state.searchValue.toLowerCase())
				);
			});
	},
	actors(state) {
		return state.actors;
	},
};

export const actions = {
	onNavigationIdChanged(toolkit, payload) {
		toolkit.commit("setNavigationId", payload);
	},
	onSearchValueChanged(toolkit, payload) {
		toolkit.commit("setSearchValue", payload);
	},
	onSortingMethod(toolkit, payload) {
		toolkit.commit(toolkit, payload);
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
	setSearchValue(state, payload) {
		state.searchValue = payload;
	},
	setSortingMethod(state, payload) {
		state.sortingMethod = payload;
	},
	setMovies(state, payload) {
		state.movies = payload;
	},
	setActors(state, payload) {
		state.actors = payload;
	},
};
