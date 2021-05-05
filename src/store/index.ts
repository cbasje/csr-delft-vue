import { createStore } from 'vuex';

//
// @see https://github.com/vuejs/vuex/tree/v4.0.0-rc.1
//
const store = createStore({
	state() {
		return {
			count: 1,
		};
	},

	// ACTIONS (asynchronous)
	actions: {
		up({ commit }) {
			commit('up');
		},
		down({ commit }) {
			commit('down');
		},
		changeTo({ commit }, payload) {
			commit('changeTo', payload);
		},
	},

	// MUTATIONS ( set the state )
	mutations: {
		up(state: any) {
			state.count = state.count + 1;
		},
		down(state: any) {
			state.count = state.count - 1;
		},
		changeTo(state: any, payload: { value: number }) {
			state.count = payload.value;
		},
	},
});

export default store;
