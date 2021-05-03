<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button
						defaultHref="/tabs/forum"
					></ion-back-button>
				</ion-buttons>
				<ion-title>Forum {{ topicID }}</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="viewExternal()">
						<ion-icon slot="icon-only" :icon="open"></ion-icon>
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>

		<ion-content>
			<div class="container"></div>
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
} from '@ionic/vue';
import { open } from 'ionicons/icons';
import { defineComponent } from 'vue';

import { useRoute } from 'vue-router';

import { Browser } from '@capacitor/browser';

export default defineComponent({
	name: 'ForumTopic',
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
	},
	setup() {
		const route = useRoute();
		const { topicID } = route.params;
		return {
			topicID,
			open,
		};
	},
	methods: {
		async viewExternal() {
			console.log(process.env.VUE_APP_STEK_URL);
			const url =
				process.env.VUE_APP_STEK_URL +
				`/forum/onderwerp/${this.topicID}#ongelezen`;
			// FIXME
			// this.urlService.open(url);
			await Browser.open({
				url: url,
				toolbarColor: '#FF0000',
				presentationStyle: 'popover'
			});
		},
	},
});
</script>
