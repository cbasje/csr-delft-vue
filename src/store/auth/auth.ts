import { AccessTokenPayload, Identity, Tokens } from './auth.model';
import authService from '@/services/auth.service';

// eslint-disable-next-line @typescript-eslint/camelcase
import jwt_decode from 'jwt-decode';

import { Storage } from '@capacitor/storage';

export interface State {
	authenticated?: boolean;
	refreshing: boolean;
	tokens?: Tokens;
	identity?: Identity;
}

const state = () =>
	({
		authenticated: undefined,
		refreshing: false,
		tokens: undefined,
		identity: undefined,
	} as State);

const getters = {
	getAuthenticated(state: any) {
		return state.authenticated;
	},
	getRefreshing(state: any) {
		return state.refreshing;
	},
	getTokens(state: any) {
		return state.tokens;
	},
	getIdentity(state: any) {
		return state.identity;
	},
};

const actions = {
	async initialize({ commit, dispatch }: { commit: any; dispatch: any }) {
		const token = Storage.get({ key: 'id_token' });
		const refreshToken = Storage.get({ key: 'refresh_token' });

		const tokens =
			!!token && !!refreshToken ? { token, refreshToken } : undefined;

		if (tokens) {
			commit('setAuthenticated', true);
			dispatch('setTokens', tokens);
		} else {
			commit('setAuthenticated', false);
		}
	},
	refresh({ dispatch }: { dispatch: any }, payload: Tokens) {
		authService.refresh(payload.refreshToken).then(({ data }) => {
			dispatch('setTokens', {
				token: data.token,
				refreshToken: payload.refreshToken,
			});
		});
	},
	setTokens({ commit }: { commit: any }, payload: Tokens) {
		Storage.set({ key: 'id_token', value: payload.token });
		Storage.set({ key: 'refresh_token', value: payload.refreshToken });

		const tokenPayload = jwt_decode<AccessTokenPayload>(payload.token);
		commit('setIdentity', tokenPayload.data);
	},
};

const mutations = {
	setAuthenticated(state: any, payload: boolean) {
		state.authenticated = payload;
	},
	setIdentity(state: any, payload: Identity) {
		authService.userId = payload.userId;
	},
	logout(state: any) {
		Storage.remove({ key: 'userId' });
		Storage.remove({ key: 'id_token' });
		Storage.remove({ key: 'refresh_token' });

		state.authenticated = false;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
