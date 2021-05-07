import { Member, MemberDetail } from './members.model';
import apiService from '@/services/api.service';

export interface State {
	ids: string[];
	entities: { [id: string]: Member };
	detailIds: string[];
	detailEntities: { [id: string]: MemberDetail };
	query: string | null;
	selectedId: string | null;
}

const state = () => ({
	ids: [],
	entities: {},
	detailIds: [],
	detailEntities: {},
	query: null,
	selectedId: null
} as State);

const getters = {
	getAllMembers(state: any) {
		return state.ids.map((id: string) => state.entities[id]);
	},
	getSelectedMember(state: any) {
		return (state.selectedId && state.entities[state.selectedId]) || null;
		// return (id: string) => {
		// 	return state.entities.find((m: Member) => m.id == id);
		// };
	},
	getSelectedMemberDetail(state: any) {
		return (state.selectedId && state.detailEntities[state.selectedId]) || null;
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
		const response = await apiService.getMemberList();
		commit('saveAllMembers', response.data);
	},
	async loadSelectedMember({ commit, state }: { commit: any; state: any }) {
		const response = await apiService.getMemberDetail(state.selectedId);
		commit('saveSelectedMember', response.data);
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
	selectMember(state: any, id: number) {
		state.selectedId = id;
	},
	search(state: any, query: string) {
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
