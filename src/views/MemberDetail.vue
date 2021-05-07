<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button
						defaultHref="/tabs/members"
					></ion-back-button>
				</ion-buttons>

				<!-- While memberDetail is loading, show the data loaded in MemberList.vue -->
				<ion-title v-if="memberDetail">
					{{ memberDetail.naam.voornaam }}
					{{ memberDetail.naam.tussenvoegsel }}
					{{ memberDetail.naam.achternaam }}
				</ion-title>
				<ion-title v-else-if="member">
					{{ member.voornaam }}
					{{ member.tussenvoegsel }}
					{{ member.achternaam }}
				</ion-title>
				<ion-title v-else> Lid {{ memberId }} </ion-title>

				<!-- Show this or the FAB depending on platform but never on web -->
				<ion-buttons slot="end" v-if="ios">
					<ion-button
						v-if="memberDetail"
						@click="saveContact(memberDetail)"
					>
						<ion-icon slot="icon-only" :icon="personAdd"></ion-icon>
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>

		<ion-content>
			<div class="container">
				<ion-list v-if="memberDetail">
					<!-- <ion-list v-if="memberDetail"> -->
					<ion-item>
						<ion-avatar
							slot="start"
							@click="openImage(memberDetail)"
						>
							<img :src="imageUrl + memberDetail.pasfoto" />
						</ion-avatar>
						<ion-label>
							<h3>{{ memberDetail.naam.formeel }}</h3>
							<p>{{ memberDetail.id }}</p>
						</ion-label>
					</ion-item>

					<ion-item
						button
						:href="getSafeUrl('mailto', memberDetail.email)"
						detail="false"
					>
						<ion-label>
							<p>e-mail</p>
							<h2>{{ memberDetail.email }}</h2>
						</ion-label>
						<ion-icon
							:icon="mail"
							color="primary"
							slot="end"
						></ion-icon>
					</ion-item>

					<ion-item detail="false">
						<ion-label>
							<p>mobiel</p>
							<h2>{{ memberDetail.mobiel }}</h2>
						</ion-label>
						<ion-buttons slot="end">
							<ion-button
								:href="getSafeUrl('sms', memberDetail.mobiel)"
							>
								<ion-icon
									:icon="text"
									slot="icon-only"
									color="primary"
								></ion-icon>
							</ion-button>
							<ion-button
								:href="getSafeUrl('tel', memberDetail.mobiel)"
							>
								<ion-icon
									:icon="call"
									slot="icon-only"
									color="primary"
								></ion-icon>
							</ion-button>
						</ion-buttons>
					</ion-item>

					<ion-item
						button
						v-mapsHref="
							memberDetail.huis.adres +
								', ' +
								memberDetail.huis.woonplaats
						"
						target="_blank"
						detail="false"
					>
						<ion-label>
							<p>{{ memberDetail.huis.naam || 'adres' }}</p>
							<h2>
								{{ memberDetail.huis.adres }}<br />
								{{ memberDetail.huis.postcode }}
								{{ memberDetail.huis.woonplaats }}<br />
								{{ memberDetail.huis.land }}
							</h2>
						</ion-label>
						<ion-icon
							:icon="map"
							color="primary"
							slot="end"
						></ion-icon>
					</ion-item>

					<ion-item>
						<ion-label>
							<p>verjaardag</p>
							<h2>
								{{ formattedDate(memberDetail.geboortedatum) }}
							</h2>
						</ion-label>
					</ion-item>

					<ion-item>
						<ion-label>
							<p>lichting</p>
							<h2>{{ memberDetail.lichting }}</h2>
						</ion-label>
					</ion-item>

					<ion-item>
						<ion-label>
							<p>verticale</p>
							<h2>{{ memberDetail.verticale }}</h2>
						</ion-label>
					</ion-item>

					<ion-item>
						<ion-label>
							<p>studie</p>
							<h2>
								{{ memberDetail.studie.naam }} ({{
									memberDetail.studie.sinds
								}})
							</h2>
						</ion-label>
					</ion-item>
				</ion-list>

				<template v-if="!memberDetail">
					<div class="loading">
						<ion-spinner></ion-spinner>
					</div>
				</template>

				<!-- Only show on Android -->
				<ion-fab
					v-if="android"
					vertical="bottom"
					horizontal="end"
					slot="fixed"
				>
					<ion-fab-button
						v-if="memberDetail"
						@click="saveContact(memberDetail)"
					>
						<ion-icon :icon="personAdd"></ion-icon>
					</ion-fab-button>
				</ion-fab>
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
	IonContent,
	IonButtons,
	IonBackButton,
	IonButton,
	IonIcon,
	IonList,
	IonItem,
	IonAvatar,
	IonLabel,
	IonSpinner,
	IonFab,
	IonFabButton,
} from '@ionic/vue';
import { mail, text, call, map, personAdd } from 'ionicons/icons';
import { defineComponent } from 'vue';

import { mapActions, mapGetters, mapMutations } from 'vuex';
import { useRoute } from 'vue-router';

import { isPlatform } from '@ionic/vue';

import dateFormat from '@/mixins/dateFormat';
import mapsHref from '@/mixins/directives/mapsHref';

import { MemberDetail } from '@/store/members/members.model';

import contactService from '@/services/contact.service';

export default defineComponent({
	name: 'Members',
	components: {
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonPage,
		IonButtons,
		IonBackButton,
		IonButton,
		IonIcon,
		IonList,
		IonItem,
		IonAvatar,
		IonLabel,
		IonSpinner,
		IonFab,
		IonFabButton,
	},
	setup() {
		const route = useRoute();
		const { memberId } = route.params;
		return {
			memberId,
			open,
		};
	},
	data() {
		return {
			ios: isPlatform('ios'),
			android: isPlatform('android'),
			imageUrl: '',
			mail,
			text,
			call,
			map,
			personAdd,
		};
	},
	async mounted() {
		await this.selectMember(this.memberId);
		await this.loadSelectedMember();
	},
	mixins: [dateFormat, mapsHref],
	methods: {
		getSafeUrl(scheme: string, target: string): any {
			const url = scheme + ':' + encodeURIComponent(target);
			// return this.sanitizer.bypassSecurityTrustUrl(url);
			return url;
		},
		async saveContact(member: MemberDetail) {
			await contactService.save(member);
		},
		openImage(member: MemberDetail) {
			const url =
				this.imageUrl + member.pasfoto.replace('.vierkant.png', '.jpg');

			if (isPlatform('mobile')) {
				// FIXME
				// this.photoViewer.show(url, member.naam.formeel, {
				// 	share: false,
				// 	closeButton: true,
				// 	copyToReference: false,
				// 	headers: '',
				// 	piccasoOptions: { }
				// });
			} else {
				window.open(url, '_blank');
			}
		},
		formattedDate(dateString: string): string {
			// From the mixin
			return this.formatDate(dateString);
		},
		...mapActions('members', {
			loadSelectedMember: 'loadSelectedMember',
		}),
		...mapMutations('members', {
			selectMember: 'selectMember',
		})
	},
	computed: {
		...mapGetters('members', {
			member: 'getSelectedMember',
			memberDetail: 'getSelectedMemberDetail',
		}),
	},
});
</script>
