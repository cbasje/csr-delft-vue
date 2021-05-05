<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button
						defaultHref="/tabs/members"
					></ion-back-button>
				</ion-buttons>
				<ion-title v-if="member">
					{{ member.naam.voornaam }} {{ member.naam.tussenvoegsel }}
					{{ member.naam.achternaam }}
				</ion-title>
				<ion-title v-else> Lid {{ memberID }} </ion-title>
				<!-- Show this or the FAB depending on platform but never on web -->
				<ion-buttons slot="end" v-if="ios">
					<ion-button v-if="member" @click="saveContact(member)">
						<ion-icon slot="icon-only" name="person-add"></ion-icon>
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>

		<ion-content>
			<div class="container">
				<ion-list v-if="member">
					<!-- <ion-list v-if="member"> -->
					<ion-item>
						<ion-avatar slot="start" @click="openImage(member)">
							<img :src="imageUrl + member.pasfoto" />
						</ion-avatar>
						<ion-label>
							<h3>{{ member.naam.formeel }}</h3>
							<p>{{ member.id }}</p>
						</ion-label>
					</ion-item>

					<ion-item
						button
						:href="getSafeUrl('mailto', member.email)"
						detail="false"
					>
						<ion-label>
							<p>e-mail</p>
							<h2>{{ member.email }}</h2>
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
							<h2>{{ member.mobiel }}</h2>
						</ion-label>
						<ion-buttons slot="end">
							<ion-button
								:href="getSafeUrl('sms', member.mobiel)"
							>
								<ion-icon
									:icon="text"
									slot="icon-only"
									color="primary"
								></ion-icon>
							</ion-button>
							<ion-button
								:href="getSafeUrl('tel', member.mobiel)"
							>
								<ion-icon
									:icon="call"
									slot="icon-only"
									color="primary"
								></ion-icon>
							</ion-button>
						</ion-buttons>
					</ion-item>

					<!-- FIXME -->
					<ion-item
						button
						v-mapsHref="
							member.huis.adres + ', ' + member.huis.woonplaats
						"
						target="_blank"
						detail="false"
					>
						<ion-label>
							<p>{{ member.huis.naam || 'adres' }}</p>
							<h2>
								{{ member.huis.adres }}<br />
								{{ member.huis.postcode }}
								{{ member.huis.woonplaats }}<br />
								{{ member.huis.land }}
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
								{{ formattedDate(member.geboortedatum) }}
							</h2>
						</ion-label>
					</ion-item>

					<ion-item>
						<ion-label>
							<p>lichting</p>
							<h2>{{ member.lichting }}</h2>
						</ion-label>
					</ion-item>

					<ion-item>
						<ion-label>
							<p>verticale</p>
							<h2>{{ member.verticale }}</h2>
						</ion-label>
					</ion-item>

					<ion-item>
						<ion-label>
							<p>studie</p>
							<h2>
								{{ member.studie.naam }} ({{
									member.studie.sinds
								}})
							</h2>
						</ion-label>
					</ion-item>
				</ion-list>

				<template v-if="!member">
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
					<ion-fab-button v-if="member" @click="saveContact(member)">
						<ion-icon :icon="person - add"></ion-icon>
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
import { mail, text, call, map } from 'ionicons/icons';
import { defineComponent } from 'vue';

import { isPlatform } from '@ionic/vue';

import dateFormat from '@/mixins/dateFormat';
import mapsHref from '@/mixins/mapsHref';
import { mapActions, mapGetters } from 'vuex';
import { useRoute } from 'vue-router';

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
		const { memberID } = route.params;
		return {
			memberID,
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
		};
	},
	async mounted() {
		console.log(this.memberID);

		await this.getSelectedMember(this.memberID);
	},
	mixins: [dateFormat, mapsHref],
	methods: {
		getSafeUrl(pre: string, url: string) {
			return `${pre}:${url}`;
		},
		openImage() {
			// TODO
		},
		saveContact() {
			// TODO
		},
		formattedDate(dateString: string): string {
			// From the mixin
			return this.formatDate(dateString);
		},
		...mapActions('members', {
			getSelectedMember: 'getSelectedMember',
		}),
	},
	computed: {
		...mapGetters('members', {
			member: 'selectedMember',
			memberById: 'memberById',
		}),
	},
});
</script>
