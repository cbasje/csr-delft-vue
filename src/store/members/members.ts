import { Member, MemberDetail } from './members.model';
import axios from 'axios';

export interface State {
	ids: string[];
	entities: { [id: string]: Member };
	detailIds: string[];
	detailEntities: { [id: string]: MemberDetail };
	query: string | null;
	selectedMemberId: string | null;
}

// const state = () => (<State>{
// 	allMembers: [],
// 	selectedMember: null,
// });
const state = () => ({
	ids: [],
	entities: {},
	detailIds: [],
	detailEntities: {},
	query: null,
	selectedMemberId: null
} as State);

const getters = {
	getAllMembers(state: any) {
		return state.entities;
	},
	getSelectedMember(state: any) {
		return (state.selectedMemberId && state.entities[state.selectedMemberId]) || null;
		// return (id: string) => {
		// 	return state.entities.find((m: Member) => m.id == id);
		// };
	},
	getSelectedMemberDetail(state: any) {
		return (state.selectedMemberId && state.detailEntities[state.selectedMemberId]) || null;
	},
	getQueryResults(state: any) {
		const allMembers = state.ids.map((id: string) => state.entities[id]);
		const query = state.query;

		if (!query) {
			return allMembers;
		}

		const queryText = query.toLowerCase().replace(/,|\.|-/g, ' ');
		if (queryText.length === 0) {
			return allMembers;
		}

		return allMembers.filter((member: Member) => {
			const mid = member.tussenvoegsel
				? member.tussenvoegsel + ' '
				: '';
			const search = `${member.id} ${member.voornaam} ${mid}${member.achternaam}`.toLowerCase();

			return search.indexOf(queryText) !== -1;
		});
	},
};

const actions = {
	async loadMembers({ commit }: { commit: Function }) {
		const response = await axios.get(
			`${process.env.VUE_APP_SITE_URL}/leden`
		);
		commit('saveAllMembers', response.data);
	},
	async loadSelectedMember(context: any) {
		const response = await axios.get(
			`${process.env.VUE_APP_SITE_URL}/leden/${context.state.selectedMemberId}`
		);
		context.commit('saveSelectedMember', response.data);
	},
	selectMember({ commit }: { commit: Function }, id: number) {
		commit('saveSelectMember', id);
	},
	search({ commit }: { commit: Function }, query: string) {
		commit('saveSearchQuery', query);
	}
};

const mutations = {
	saveAllMembers(state: any, payload: Member[]) {
		const loadedMembers = payload;

		const memberIds = loadedMembers.map(member => member.id);
		const memberEntities = loadedMembers.reduce(
			(entities: { [id: string]: Member }, member: Member) => {
				return { ...entities, [member.id]: member };
			},
			{}
		);

		state.ids = memberIds;
		state.entities = memberEntities;
	},
	saveSelectedMember(state: any, payload: MemberDetail) {
		const member = payload;

		state.detailIds = [...state.detailIds, member.id];
		state.detailEntities = {
			...state.detailEntities,
			[member.id]: member
		}
	},
	saveSelectMember(state: any, id: number) {
		state.selectedMemberId = id;
	},
	saveSearchQuery(state: any, query: string) {
		state.query = query;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
