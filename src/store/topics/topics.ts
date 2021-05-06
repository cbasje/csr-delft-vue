import { ForumTopic } from './topics.model';
import axios from 'axios';

export interface State {
	entities: { [id: number]: ForumTopic };
	ids: number[];
	selectedId: number | null;
	isMoreAvailable: boolean;
}

const state = () => ({
    ids: [],
    entities: {},
    selectedId: null,
    isMoreAvailable: true,
} as State);

export const TOPICS_PER_LOAD = 10;

const getters = {
	getAllTopics(state: any) {
		return state.ids.map((id: string) => state.entities[id]);
	},
	getSelectedTopic(state: any) {
		return (state.selectedId && state.entities[state.selectedId]) || null;
		// return (id: string) => {
		// 	return state.entities.find((m: Member) => m.id == id);
		// };
	},
	getLength(state: any) {
		return state.ids.length;
	},
    isMoreAvailable(state: any) {
        return state.isMoreAvailable;
    }
};

const actions = {
	async loadTopics(context: any, payload: boolean) {
		const offset = payload ? 0 : context.state.ids.length;
		const limit = TOPICS_PER_LOAD;
		const response = await axios.get<{ data: ForumTopic[] }>(
			`${process.env.VUE_APP_SITE_URL}/forum/recent?offset=${offset}&limit=${limit}`
		);
		context.commit('saveAllTopics', {
			reset: payload,
			topics: response.data,
		});
	},
	selectTopic({ commit }: { commit: Function }, id: number) {
		commit('saveSelectTopic', id);
	},
	read({ commit }: { commit: Function }, payload: number) {
		commit('saveRead', payload);
	},
};

const mutations = {
	saveAllTopics(
		state: any,
		payload: { reset: boolean; topics: ForumTopic[] }
	) {
		const reset = payload.reset;
		const loadedTopics = payload.topics;

		const topicIds = loadedTopics.map(topic => topic.draad_id);
		const topicEntities = loadedTopics.reduce(
			(entities: { [id: string]: ForumTopic }, t: ForumTopic) => {
				return { ...entities, [t.draad_id]: t };
			},
			{}
		);

		state.ids = reset ? topicIds : [...state.ids, ...topicIds];
		state.entities = reset
			? topicEntities
			: { ...state.entities, ...topicEntities };
		state.isMoreAvailable = loadedTopics.length === TOPICS_PER_LOAD;
	},
	saveSelectTopic(state: any, id: number) {
		state.selectedId = id;
	},
	saveRead(state: any, payload: number) {
		state.entities = {
			...state.entities,
			[payload]: {
				...state.entities[payload],
				ongelezen: 0,
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
