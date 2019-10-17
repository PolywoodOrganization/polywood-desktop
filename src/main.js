import Vue from "vue";
import Vuex from "vuex";

import App from "./App.vue";
import { state, getters, actions, mutations } from "./store";

// Install Vuex in the webapp
Vue.use(Vuex);

Vue.config.productionTip = false;

new Vue({
	store: new Vuex.Store({ state, getters, actions, mutations }),
	render: h => h(App),
}).$mount("#app");
