import { ForumPost } from './posts.model';
import axios from 'axios';

export interface State {
	entities: { [id: number]: ForumPost };
	byTopic: {
		[topicId: number]: {
			ids: number[];
			isMoreAvailable: boolean;
		};
	};
}

const state = () =>
	({
		entities: {},
		byTopic: {},
	} as State);

export const POSTS_PER_LOAD = 10;

function getLimit(unread: number, limit: number) {
	if (unread > limit - 3) {
		return unread + 3;
	} else {
		return limit;
	}
}

const getters = {
	getAllPosts(state: any) {
		return state.entities;
	},
	getByTopic(state: any) {
		return state.byTopic;
	},
};

const actions = {
	async loadPosts(
		{
			commit,
			state,
			rootGetters,
		}: { commit: Function; state: any; rootGetters: any },
		payload: { topicId: number; reset: boolean }
	) {
		const unread = rootGetters['topics/getSelectedId']
			? rootGetters['topics/getSelectedTopic'].ongelezen
			: 0;
		const offset = payload.reset ? 0 : rootGetters['topics/getLength'] || 0;
		const limit = getLimit(unread, POSTS_PER_LOAD);

		const response = await axios.get<{ data: ForumPost[] }>(
			`${process.env.VUE_APP_SITE_URL}/forum/onderwerp/${payload.topicId}?offset=${offset}&limit=${limit}`
		);
		commit('saveAllPosts', {
			topicId: payload.topicId,
			posts: response.data,
			reset: payload.reset,
		});
	},
};

const mutations = {
	saveAllPosts(
		state: any,
		payload: { topicId: number; posts: ForumPost[]; reset: boolean }
	) {
		const topicId = payload.topicId;
		const postIds = payload.posts.map((post) => post.post_id);
		const postEntities = payload.posts.reduce(
			(entities: { [id: number]: ForumPost }, post) => {
				return { ...entities, [post.post_id]: post };
			},
			{}
		);

		state.entities = payload.reset
			? postEntities
			: { ...state.entities, ...postEntities };
		state.byTopic = {
			...state.byTopic,
			[topicId]: {
				ids:
					state.byTopic[topicId] !== undefined && !payload.reset
						? [...postIds, ...state.byTopic[topicId].ids]
						: postIds,
				isMoreAvailable: payload.posts.length === POSTS_PER_LOAD,
			},
		};
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
