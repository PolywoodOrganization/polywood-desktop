import axios from "axios";

async function getImageUrl(movie) {
	fetch(`http://localhost:8081/movies/image/${movie["id"]}`)
		.then(response => response.text())
		.then(url => {
			if (url != null) movie["cover"] = url;
			return null;
		});
}

// Function that check if the given field from `movie` is not undefined and contains the search value
let checkField = function(searchValue, field, state) {
	if (field !== undefined) {
		try {
			return field
				.toString()
				.toLowerCase()
				.includes(searchValue.toLowerCase());
		} catch (e) {
			return false;
		}
	} else return false;
};

/**
 * Boolean that indicates if the movies are already fetched
 */
let lastMoviesFetch = {
	page: undefined,
	size: undefined,
};

/**
 * Boolean that indicates if the actors are already fetched
 */
let lastActorsFetch = {
	page: undefined,
	size: undefined,
};

const apiConnection = axios.create({
	baseURL: `http://localhost:8083/`,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	timeout: 3000,
});

export const state = {
	/**
	 * 0: MoviesContainer
	 * 1: ActorsContainer
	 * 2: AboutUsContainer
	 */
	navigationId: 0,

	/**
	 * Tell if the dialog box for casting must be displayed or not
	 */
	isCastingBoxDisplayed: false,

	/**
	 * Tell if the dialog box for a specific movie must be displayed or not
	 */
	isMovieBoxDisplayed: false,
	currentMovieDisplayed: null,

	/**
	 * Tell if the dialog box for filmography must be displayed or not
	 */
	isFilmographyBoxDisplayed: false,

	/**
	 * Buffer that contains all actors to display when displaying the casting dialog box.
	 */
	castingActors: [],

	/**
	 * Buffer that contains all movies to display when displaying the filmography dialog box.
	 */
	filmographyMovies: [],

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

	actors: [],

	favorites: [],

	/**
	 * The number of pages for `movies`, according to the `batchSize`.
	 */
	maxMoviesPages: undefined,

	/**
	 * The number of pages for `actors`, according to the `batchSize`.
	 */
	maxActorsPages: undefined,

	/**
	 * Current page in the pagination for the movies and actors. One-indexed number. If `null`, then no pagination is
	 * used.
	 */
	currentPageNumber: 1,

	/**
	 * Number of movies/actors to display in a page. If `null`, then no pagination is used.
	 */
	batchSize: 20,

	/**
	 * Information about the developers that coded this webapp.
	 */
	developers: [
		{
			id: 0,
			name: "Léa CHEMOUL",
			image:
				"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/emojidex/112/female-student-type-3_1f469-1f3fc-200d-1f393.png",
			jobs: ["Full Stack Developer", "Executive Manager (Junior)"],
			colorLabel: "warning",
		},
		{
			id: 1,
			name: "Philippine CLUNIAT",
			image:
				"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/emojione/211/female-student-type-3_1f469-1f3fc-200d-1f393.png",
			jobs: ["Front-End mobile developer", "Designer"],
			colorLabel: "info",
		},
		{
			id: 2,
			name: "Anthony BACCUET",
			image:
				"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/whatsapp/224/male-student_1f468-200d-1f393.png",
			jobs: ["Back-end developer", "Artiste Soubassophone"],
			colorLabel: "danger",
		},
		{
			id: 3,
			name: "Valentin BERGER",
			image:
				"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/emojione/211/male-student_1f468-200d-1f393.png",
			jobs: ["Front-end developer", "README writer"],
			colorLabel: "success",
		},
	],

	api: apiConnection,

	/**
	 * Username, given when logged in (to receive the token).
	 */
	username: undefined,

	/**
	 * Authentication token
	 */
	authToken: undefined,
};

export const getters = {
	navigationId(state) {
		return state.navigationId;
	},
	isCastingBoxDisplayed(state) {
		return state.isCastingBoxDisplayed;
	},
	isMovieBoxDisplayed(state) {
		return state.isMovieBoxDisplayed;
	},
	currentMovieDisplayed(state) {
		return state.currentMovieDisplayed;
	},
	isFilmographyBoxDisplayed(state) {
		return state.isFilmographyBoxDisplayed;
	},
	castingActors(state) {
		return state.castingActors;
	},
	filmographyMovies(state) {
		return state.filmographyMovies;
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
		return state.movies;
	},
	actors(state) {
		return state.actors;
	},
	maxMoviesPages(state) {
		return state.maxMoviesPages;
	},
	maxActorsPages(state) {
		return state.maxActorsPages;
	},
	currentPageNumber(state) {
		return state.currentPageNumber;
	},
	batchSize(state) {
		return state.batchSize;
	},
	developers(state) {
		return state.developers;
	},
	api(state) {
		return state.api;
	},
	username(state) {
		return state.username;
	},
	authToken(state) {
		return state.authToken;
	},
	favorites(state) {
		return state.favorites;
	},
};

export const actions = {
	onNavigationIdChanged(toolkit, payload) {
		toolkit.commit("setNavigationId", payload);
	},
	showCastingBox(toolkit, _) {
		toolkit.commit("setIsCastingBoxDisplayed", true);
	},
	hideCastingBox(toolkit, _) {
		toolkit.commit("setIsCastingBoxDisplayed", false);
	},
	showMovieBox(toolkit, _) {
		toolkit.commit("setIsMovieBoxDisplayed", true);
	},
	hideMovieBox(toolkit, _) {
		toolkit.commit("setIsMovieBoxDisplayed", false);
	},
	setCurrentMovie(toolkit, payload) {
		toolkit.commit("setCurrentMovieDisplayed", payload);
	},
	onCastingActorsChanged(toolkit, payload) {
		toolkit.commit("setCastingActors", payload);
	},
	fetchCastingActors(toolkit, movieId) {
		apiConnection
			.get(`/movies/casting/${movieId}`, { headers: { Authorization: `Bearer ${toolkit.getters.authToken}` } })
			.then(response => {
				let actor_entries = response.data;
				return actor_entries.map(actor_entry => {
					return {
						id: actor_entry.actorid,
						name: actor_entry.name,
						moviecount: parseInt(actor_entry.moviecount),
						rating: parseInt(actor_entry.ratingsum),
						googlehits: parseInt(actor_entry.googlehits),
						googleRating: parseInt(actor_entry.normalizedgooglerank),
						imdbRating: parseInt(actor_entry.normalizedmovierank),
						globalRating: parseInt(actor_entry.normalizedrating),
					};
				});
			})
			.then(actors => {
				return toolkit.commit("setCastingActors", actors);
			});
	},
	onFilmographyMoviesChanged(toolkit, payload) {
		toolkit.commit("setFilmographyMovies", payload);
	},
	fetchFilmographyMovies(toolkit, actorId) {
		apiConnection
			.get(`/actors/filmography/${actorId}`, {
				headers: { Authorization: `Bearer ${toolkit.getters.authToken}` },
			})
			.then(response => {
				let movie_entries = response.data;
				let movies = [];
				movie_entries.forEach(movie_entry => {
					let found = false;
					for (let m in toolkit.getters.movies) {
						m = toolkit.getters.movies[m];
						if (m.id.toLowerCase() === movie_entry.movieid.toLowerCase()) {
							movies.push(m);
							found = true;
							break;
						}
					}
					if (!found) {
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
						movies.push(movie);
					}
				});
				return movies;
			})
			.then(movies => {
				return toolkit.commit("setFilmographyMovies", movies);
			});
	},
	fetchMoviesOfDirector(toolkit, director) {
		apiConnection
			.get(`/movies/director/${director}`, {
				headers: { Authorization: `Bearer ${toolkit.getters.authToken}` },
			})
			.then(response => {
				let movie_entries = response.data;
				let movies = [];
				movie_entries.forEach(movie_entry => {
					let found = false;
					for (let m in toolkit.getters.movies) {
						m = toolkit.getters.movies[m];
						if (m.id.toLowerCase() === movie_entry.movieid.toLowerCase()) {
							movies.push(m);
							found = true;
							break;
						}
					}
					if (!found) {
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
						movies.push(movie);
					}
				});
				return movies;
			})
			.then(movies => {
				return toolkit.commit("setFilmographyMovies", movies);
			});
	},
	showFilmographyBox(toolkit, _) {
		toolkit.commit("setIsFilmographyBoxDisplayed", true);
	},
	hideFilmographyBox(toolkit, _) {
		toolkit.commit("setIsFilmographyBoxDisplayed", false);
	},
	onSearchValueChanged(toolkit, payload) {
		toolkit.commit("setSearchValue", payload);
		toolkit.commit("setCurrentPageNumber", 1);
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
	 * @param args Arguments: "page": The page to fetch. The index starts from 0. Default value is 0. "size": The number
	 * of movies to fetch from the databse. Default value is 20.
	 */
	fetchMovies(toolkit, args) {
		let page = (args != null && args.hasOwnProperty("page") ? args.page : toolkit.getters.currentPageNumber) - 1;
		let size = args != null && args.hasOwnProperty("size") ? args.size : toolkit.getters.batchSize;
		if (lastMoviesFetch.page !== page || lastMoviesFetch.size !== size) {
			let request = "/movies?";
			if (page !== null && size !== null) request += `page=${page}&size=${size}&`;
			request += `sort=title`;

			apiConnection
				.get(request, { headers: { Authorization: `Bearer ${toolkit.getters.authToken}` } })
				.then(response => {
					let movie_entries = response.data;
					return movie_entries.map(movie_entry => {
						let movie = {
							id: movie_entry.movieid,
							title: movie_entry.title,
							cover: "../assets/svg/no-image.svg",
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
					lastMoviesFetch.page = page;
					lastMoviesFetch.size = size;
					return toolkit.commit("setMovies", movies);
				});
		}
	},
	onMoviesChanged(toolkit, payload) {
		toolkit.commit("setMovies", payload);
	},
	fetchActors(toolkit, args) {
		let page = (args != null && args.hasOwnProperty("page") ? args.page : toolkit.getters.currentPageNumber) - 1;
		let size = args != null && args.hasOwnProperty("size") ? args.size : toolkit.getters.batchSize;
		if (lastActorsFetch.page !== page || lastActorsFetch.size !== size) {
			let request = "/actors";
			if (page !== null && size !== null) request += `?page=${page}&size=${size}`;

			apiConnection
				.get(request, { headers: { Authorization: `Bearer ${toolkit.getters.authToken}` } })
				.then(response => {
					let actor_entries = response.data;
					return actor_entries.map(actor_entry => {
						return {
							id: actor_entry.actorid,
							name: actor_entry.name,
							moviecount: parseInt(actor_entry.moviecount),
							rating: parseInt(actor_entry.ratingsum),
							googlehits: parseInt(actor_entry.googlehits),
							googleRating: parseInt(actor_entry.normalizedgooglerank),
							imdbRating: parseInt(actor_entry.normalizedmovierank),
							globalRating: parseInt(actor_entry.normalizedrating),
						};
					});
				})
				.then(actors => {
					lastActorsFetch["page"] = page;
					lastActorsFetch["size"] = size;
					return toolkit.commit("setActors", actors);
				});
		}
	},
	fetchMaxMoviesPages(toolkit, size = null) {
		size = size != null ? size : toolkit.getters.batchSize;
		apiConnection
			.get(`/movies/maxPage?size=${size}`, {
				headers: { Authorization: `Bearer ${toolkit.getters.authToken}` },
			})
			.then(response => {
				return response.data;
			})
			.then(number => {
				toolkit.commit(`setMaxMoviesPages`, number);
			});
	},
	fetchMaxActorsPages(toolkit, size = null) {
		size = size != null ? size : toolkit.getters.batchSize;
		apiConnection
			.get(`/actors/maxPage?size=${size}`, {
				headers: { Authorization: `Bearer ${toolkit.getters.authToken}` },
			})
			.then(response => {
				return response.data;
			})
			.then(number => {
				toolkit.commit(`setMaxActorsPages`, number);
			});
	},
	fetchFavorites(toolkit, _) {
		let request = "/favorites";

		apiConnection
			.get(request, { headers: { Authorization: `Bearer ${toolkit.getters.authToken}` } })
			.then(response => {
				return response.data;
			})
			.then(favorites => {
				return toolkit.commit("setFavorites", favorites);
			});
	},
	fetchMovieById(toolkit, id) {
		let request = `/movies/${id}`;

		return apiConnection
			.get(request, { headers: { Authorization: `Bearer ${toolkit.getters.authToken}` } })
			.then(response => {
				return response.data;
			});
	},
	addNewFavorite(toolkit, toAdd) {
		let request = "/favorites";

		return apiConnection
			.post(request, toAdd, { headers: { Authorization: `Bearer ${toolkit.getters.authToken}` } })
			.then(response => {
				return response.data;
			})
			.then(fav => {
				return toolkit.commit("addFavorite", fav);
			});
	},
	removeMovieFavorite(toolkit, idMovie) {
		let request = "/favorites/movie/" + idMovie;

		return apiConnection
			.delete(request, { headers: { Authorization: `Bearer ${toolkit.getters.authToken}` } })
			.then(response => {
				return response.data;
			})
			.then(toolkit.commit("removeMovieFromFavorite", idMovie));
	},
	removeSpecificFavorite(toolkit, idFav) {
		let request = "/favorites/" + idFav;

		return apiConnection
			.delete(request, { headers: { Authorization: `Bearer ${toolkit.getters.authToken}` } })
			.then(response => {
				return response.data;
			})
			.then(toolkit.commit("removeFavorite", idFav));
	},
	updateFavorite(toolkit, { token, toUpdate }) {
		let request = "/favorites";

		return apiConnection
			.post(request, toUpdate, { headers: { Authorization: `Bearer ${toolkit.getters.authToken}` } })
			.then(response => {
				return response.data;
			})
			.then(fav => {
				return toolkit.commit("changeFavorite", fav);
			});
	},
	onActorsChanged(toolkit, payload) {
		toolkit.commit("setActors", payload);
	},
	onFavoritesChanged(toolkit, payload) {
		toolkit.commit("setFavorites", payload);
	},
	onNewFavorite(toolkit, payload) {
		toolkit.commit("addFavorite", payload);
	},
	onCurrentPageNumberChanged(toolkit, payload) {
		toolkit.commit("setCurrentPageNumber", payload);
	},
	onBatchSizeChanged(toolkit, payload) {
		toolkit.commit("setBatchSize", payload);
	},
	login(toolkit, payload) {
		return apiConnection
			.post("/login", payload)
			.then(response => {
				/* User is stored in `response.data.user`
				 * Example :
				 * {
				 *     "token": "eyJ0eXAiOiJKV",
				 *     "user": {
				 *         "iduser": 0,
				 *         "login": "MyLogin",
				 *         "password": "hgsushgo",
				 *         "firstname": "Hello",
				 *         "lastname": "World"
				 *     }
				 * }
				 * */
				toolkit.commit("setAuthToken", response.data.token);
				toolkit.commit("setUsername", payload.login);
				return true;
			})
			.catch(error => {
				console.log(error);
				return false;
			});
	},
	logout(toolkit, _) {
		toolkit.commit("setAuthToken", null);
		toolkit.commit("setUsername", null);
	},
	onAuthTokenChanged(toolkit, payload) {
		toolkit.commit("setAuthToken", payload);
	},
};

export const mutations = {
	setNavigationId(state, payload) {
		state.navigationId = payload;
	},
	setIsCastingBoxDisplayed(state, payload) {
		state.isCastingBoxDisplayed = payload;
	},
	setIsMovieBoxDisplayed(state, payload) {
		state.isMovieBoxDisplayed = payload;
	},
	setCurrentMovieDisplayed(state, payload) {
		state.currentMovieDisplayed = JSON.parse(JSON.stringify(payload));
	},
	setIsFilmographyBoxDisplayed(state, payload) {
		state.isFilmographyBoxDisplayed = payload;
	},
	setCastingActors(state, payload) {
		state.castingActors = payload;
	},
	setFilmographyMovies(state, payload) {
		state.filmographyMovies = payload;
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
	setMaxMoviesPages(state, payload) {
		state.maxMoviesPages = payload;
	},
	setMaxActorsPages(state, payload) {
		state.maxActorsPages = payload;
	},
	setFavorites(state, payload) {
		state.favorites = payload;
	},
	addFavorite(state, payload) {
		state.favorites.push(payload);
	},
	removeMovieFromFavorite(state, payload) {
		let index = state.favorites.findIndex(fav => fav.idmovie === payload);
		if (index >= 0) state.favorites.splice(index, 1);
	},
	removeFavorite(state, payload) {
		let index = state.favorites.findIndex(fav => fav.idfavorite === payload);
		if (index >= 0) state.favorites.splice(index, 1);
	},
	changeFavorite(state, payload) {
		let index = state.favorites.findIndex(fav => fav.idfavorite === payload);
		state.favorites.set(index, payload);
	},
	setTotalNumberOfActorsWithSearch(state, payload) {
		state.totalNumberOfActorsWithSearch = payload;
	},
	setCurrentPageNumber(state, payload) {
		let p = payload;
		if (typeof p !== "number") p = parseInt(p);

		if (!isNaN(p)) state.currentPageNumber = p;
	},
	setBatchSize(state, payload) {
		let p = payload;
		if (typeof p !== "number") p = parseInt(p);

		if (!isNaN(p)) state.batchSize = p;
	},
	setUsername(state, payload) {
		state.username = payload;
	},
	setAuthToken(state, payload) {
		state.authToken = payload;
	},
};
