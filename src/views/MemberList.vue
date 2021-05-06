<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Ledenlijst</ion-title>
			</ion-toolbar>
			<!-- If not iOS, show the searchbar in the main header -->
			<ion-toolbar v-if="!ios">
				<ion-searchbar
					placeholder="Zoek op naam of lidnummer"
					inputmode="search"
					autocomplete="name"
					autocorrect="off"
					enterkeyhint="search"
					animated
					@ionInput="search($event)"
				>
					<!-- @ionBlur="stopSearchSoft()"
            @ionCancel="stopSearch()"> -->
				</ion-searchbar>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Ledenlijst</ion-title>
				</ion-toolbar>
				<ion-toolbar v-if="ios">
					<ion-searchbar
						placeholder="Zoek op naam of lidnummer"
						inputmode="search"
						autocomplete="name"
						autocorrect="off"
						enterkeyhint="search"
						cancelButtonText="Annuleer"
						showCancelButton="focus"
						animated
						@ionInput="search($event)"
					>
					</ion-searchbar>
				</ion-toolbar>
			</ion-header>

			<!-- TODO: Do we want alphabet scroll? -->
			<!-- <csr-alphabet-scroll ion-fixed></csr-alphabet-scroll> -->

			<div class="container">
				<!-- <div *ngIf="members$ | async as members"> -->

				<ion-list class="member-list" v-if="members.length > 0">
					<!-- <ion-item-group
						v-for="group in members"
						:key="group.name"
						:class="'scroll-letter-' + group.name"
					> -->
					<ion-item-group
						v-for="group in groups"
						:key="group.name"
						:class="'scroll-letter-' + group.name"
					>
						<ion-item-divider sticky>
							<strong>{{ group.name }}</strong>
						</ion-item-divider>

						<ion-item
							button
							detail
							v-for="member in group.elements"
							:key="member.id"
							@click="goToMemberDetail(member)"
						>
							<ion-label>
								{{ member.voornaam }}
								<strong>
									{{ member.tussenvoegsel }}
									{{ member.achternaam }}
								</strong>
							</ion-label>
						</ion-item>
					</ion-item-group>
				</ion-list>

				<template v-if="members.length == 0">
					<div class="loading">
						<ion-spinner></ion-spinner>
					</div>
				</template>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonSearchbar,
	IonContent,
	IonList,
	IonItemGroup,
	IonItemDivider,
	IonItem,
	IonLabel,
	IonSpinner,
} from '@ionic/vue';
import { defineComponent } from 'vue';

import { isPlatform } from '@ionic/vue';
import { Member } from '@/store/members/members.model';
import { mapActions, mapGetters } from 'vuex';

export interface Group {
	name: string;
	elements: any[];
}

export interface Grouped {
	[key: string]: Group;
}

function groupBy(member: Member) {
	return member.achternaam.replace(/[a-z ']/g, '')[0];
}

export default defineComponent({
	name: 'Members',
	components: {
		IonHeader,
		IonToolbar,
		IonTitle,
		IonSearchbar,
		IonContent,
		IonPage,
		IonList,
		IonItemGroup,
		IonItemDivider,
		IonItem,
		IonLabel,
		IonSpinner,
	},
	data() {
		return {
			searchQuery: '',
			ios: isPlatform('ios'),
		};
	},
	async mounted() {
		await this.loadMembers();
	},
	methods: {
		search(event: Event) {
			const query = (event.target as HTMLInputElement).value;

			this.searchAction(query);
		},
		goToMemberDetail(member: Member) {
			const memberID = member.id;

			this.$router.push({ path: `/tabs/members/${memberID}` });
			// this.$router.push({ name: 'forum', params: { topicID } })
		},
		...mapActions('members', {
			loadMembers: 'loadMembers',
			searchAction: 'search'
		}),
	},
	computed: {
		groups() {
			const elements = this.members;

			if (!elements) {
				return null;
			}

			const grouped: Grouped = elements.reduce(
				(groups: Grouped, element: any) => {
					const key = groupBy(element);
					if (!groups[key]) {
						groups[key] = {
							name: key,
							elements: [],
						};
					}
					groups[key].elements.push(element);
					return groups;
				},
				{}
			);

			return Object.keys(grouped).map((key) => grouped[key]);
		},
		...mapGetters('members', {
			members: 'getQueryResults'
		}),
	},
});
</script>
