import { ForumPost } from './posts.model';
import apiService from '@/services/api.service';

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
		{ commit, rootGetters }: { commit: Function; rootGetters: any },
		payload: { topicId: number; reset: boolean }
	) {
		const unread = rootGetters['topics/getSelectedTopic']
			? rootGetters['topics/getSelectedTopic'].ongelezen
			: 0;
		const offset = payload.reset ? 0 : rootGetters['getSelectedTopicPostsLength'] || 0;
		const limit = getLimit(unread, POSTS_PER_LOAD);

		const response = await apiService.getForumTopic(
			payload.topicId,
			offset,
			limit
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
