export const state = {
	navigationId: 0,
};

export const getters = {
	navigationId(state) {
		return state.navigationId;
	},
};

export const actions = {
	onNavigationIdChanged(toolkit, payload) {
		toolkit.commit("setNavigationId", payload);
	},
};

export const mutations = {
	setNavigationId(state, payload) {
		state.navigationId = payload;
	},
};
