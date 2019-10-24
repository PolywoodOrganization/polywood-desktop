async function getImageUrl(movie) {
	fetch(`http://localhost:8081/movies/image/${movie["id"]}`)
		.then(response => response.text())
		.then(url => {
			movie["cover"] = url;
			return null;
		});
}

/**
 * Boolean that indicates if the movies are already fetched
 */
let lastMoviesFetch = {
	page: null,
	size: null,
};

const WEBSERVICE_MOVIES_ADDRESS = "localhost";
const WEBSERVICE_MOVIES_PORT = 8081;
const WEBSERVICE_ACTORS_ADDRESS = "localhost";
const WEBSERVICE_ACTORS_PORT = 8082;

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

	movies: [],

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
	sortingOrder(state) {
		return state.sortingOrder;
	},
	movies(state) {
		let list = null;

		// Function that check if the given field from `movie` is not undefined and contains the search value
		let checkField = function(field, state) {
			if (field !== undefined) {
				try {
					return field
						.toString()
						.toLowerCase()
						.includes(state.searchValue.toLowerCase());
				} catch (e) {
					return false;
				}
			} else return false;
		};

		// Filter according to searchValue
		if (state.searchValue === "") list = state.movies;
		else
			list = state.movies.filter(movie => {
				let result = false;
				result = result || checkField(movie.title, state);
				result = result || checkField(movie.releaseyear, state);
				result = result || checkField(movie.releasedate, state);
				result = result || checkField(movie.genre, state);
				result = result || checkField(movie.writer, state);
				result = result || checkField(movie.actors, state);
				result = result || checkField(movie.directors, state);
				return result;
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
	/**
	 * Fetch the movie from the database and store the result in the state.
	 * @param toolkit The Vuex toolkit.
	 * @param page The page to fetch. The index starts from 0. Default value is 0.
	 * @param size The number of movies to fetch from the databse. Default value is 20.
	 */
	fetchMovies(toolkit, page = 0, size = 20) {
		if (lastMoviesFetch.page !== page || lastMoviesFetch.size !== size) {
			fetch(
				`http://${WEBSERVICE_MOVIES_ADDRESS}:${WEBSERVICE_MOVIES_PORT}/movies?page=${page}&size=${size}&sort=title`
			)
				.then(response => response.json())
				.then(movie_entries => {
					return movie_entries.map(movie_entry => {
						let movie = {
							id: movie_entry.movieid,
							title: movie_entry.title,
							cover: "",
							releaseyear: parseInt(movie_entry.releaseyear),
							releasedate: movie_entry.releasedate,
							genre: movie_entry.genre,
							writer: movie_entry.writer,
							actors: movie_entry.actors,
							directors: movie_entry.directors,
						};
						getImageUrl(movie);
						return movie;
					});
				})
				.then(movies => {
					lastMoviesFetch["page"] = page;
					lastMoviesFetch["size"] = size;
					return toolkit.commit("setMovies", movies);
				});
		}
	},
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
