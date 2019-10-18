export const state = {
	/**
	 * 0: MoviesContainer
	 * 1: ActorsContainer
	 * 2: AboutUsContainer
	 */
	navigationId: 0,

	searchValue: "",

	/**
	 * 0: Sort alphabetic
	 * 1: Sort release year
	 * 2: Sort movie count
	 * 3: Sort rating
	 * 4: Sort google hits
	 */
	sortingMethod: 0,

	/**
	 * 0: Ascending
	 * 1: Descending
	 */
	sortingOrder: 0,

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
	],

	actors: [
		{
			id: 1,
			name: "Acteur 1",
			moviecount: 25,
			rating: 4,
			googlehits: 580,
		},
		{
			id: 2,
			name: "Acteur 2",
			moviecount: 12,
			rating: 2,
			googlehits: 0,
		},
		{
			id: 3,
			name: "Acteur 3",
			moviecount: 102,
			rating: 7,
			googlehits: 15890,
		},
		{
			id: 4,
			name: "Acteur 4",
			moviecount: 0,
			rating: 0,
			googlehits: 0,
		},
	],
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
		let list = null;

		// Filter according to searchValue
		if (state.searchValue === "") list = state.movies;
		else
			list = state.movies.filter(movie => {
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

		// Sort according to sortingMethod
		// Sort alphabetically
		if (state.sortingMethod === 0) list = list.sort();
		// Sort by release year
		else if (state.sortingMethod === 1)
			list = list.sort((a, b) => {
				return a.releaseyear - b.releaseyear;
			});

		// If order is "Descending"
		if (state.sortingOrder === 1) list.reverse();

		return list;
	},
	actors(state) {
		let list = null;

		// Filter according to searchValue
		if (state.searchValue === "") list = state.actors;
		else
			list = state.actors.filter(movie => {
				return movie.name.toLowerCase().includes(state.searchValue.toLowerCase());
			});

		// Sort according to sortingMethod
		// Sort alphabetically
		if (state.sortingMethod === 0) list = list.sort();
		else if (state.sortingMethod === 2)
			list = list.sort((a, b) => {
				return a.moviecount - b.moviecount;
			});
		// Sort by rating
		else if (state.sortingMethod === 3)
			list = list.sort((a, b) => {
				return a.rating - b.rating;
			});
		// Sort by google hits
		else if (state.sortingMethod === 4)
			list = list.sort((a, b) => {
				return a.googlehits - b.googlehits;
			});

		// If order is "Descending"
		if (state.sortingOrder === 1) list.reverse();

		return list;
	},
};

export const actions = {
	onNavigationIdChanged(toolkit, payload) {
		toolkit.commit("setNavigationId", payload);
	},
	onSearchValueChanged(toolkit, payload) {
		toolkit.commit("setSearchValue", payload);
	},
	onSortingMethodChanged(toolkit, payload) {
		toolkit.commit("setSortingMethod", payload);
	},
	onSortingOrderChanged(toolkit, payload) {
		toolkit.commit("setSortingOrder", payload);
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
	setSortingOrder(state, payload) {
		state.sortingOrder = payload;
	},
	setMovies(state, payload) {
		state.movies = payload;
	},
	setActors(state, payload) {
		state.actors = payload;
	},
};
