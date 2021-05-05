import { Member, MemberDetail } from '@/models/member';
import axios from 'axios';

const state = () => ({
	allMembers: [],
	selectedMember: null,
});

const getters = {
	allMembers(state: any) {
		return state.allMembers;
	},
	memberById(state: any) {
		return (id: string) => {
			return state.allMembers.find((m: Member) => m.id == id);
		};
	},
	selectedMember(state: any) {
		return state.selectedMember;
	},
	searchMembers(state: any) {
		return (query: string) => {
			if (!query) {
				return state.allMembers;
			}

			const queryText = query.toLowerCase().replace(/,|\.|-/g, ' ');
			if (queryText.length === 0) {
				return state.allMembers;
			}

			return state.allMembers.filter((member: Member) => {
				const mid = member.tussenvoegsel
					? member.tussenvoegsel + ' '
					: '';
				const search = `${member.id} ${member.voornaam} ${mid}${member.achternaam}`.toLowerCase();

				return search.indexOf(queryText) !== -1;
			});
		};
	},
};

const actions = {
	async getMembers({ commit }: { commit: Function }) {
		const response = await axios.get(
			`${process.env.VUE_APP_SITE_URL}/leden`
		);
		commit('saveAllMembers', response.data);
	},
	async getSelectedMember({ commit }: { commit: Function }, id: number) {
		const response = await axios.get(
			`${process.env.VUE_APP_SITE_URL}/leden/${id}`
		);
		commit('saveSelectedMember', response.data);
	},
};

const mutations = {
	saveAllMembers(state: any, payload: Member[]) {
		state.allMembers = payload;
	},
	saveSelectedMember(state: any, payload: MemberDetail) {
		state.selectedMember = payload;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
