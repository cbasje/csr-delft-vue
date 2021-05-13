<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Menu</ion-title>
			</ion-toolbar>
		</ion-header>
		
		<ion-content :fullscreen="true" class="ion-padding">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Menu</ion-title>
				</ion-toolbar>
			</ion-header>

			<div class="container">
				<ion-list>
					<ion-item-group>
						<ion-list-header>
							<ion-label>
								<h2>Contact</h2>
							</ion-label>
						</ion-list-header>
					</ion-item-group>

					<ion-item-group>
						<ion-list-header>
							<ion-label>
								<h2>Profiel</h2>
							</ion-label>
						</ion-list-header>

						<ion-item button>
							<ion-avatar slot="start">
								<img src="" />
							</ion-avatar>
							<ion-label>
								Am. Benjamins
							</ion-label>
						</ion-item>

						<ion-item button>
							<ion-icon :icon="cog" slot="start"></ion-icon>
							<ion-label>
								Instellingen
							</ion-label>
						</ion-item>

						<ion-item button @click="logout">
							<ion-icon
								:icon="logOut"
								slot="start"
								color="danger"
							></ion-icon>
							<ion-label>
								<ion-text color="danger">
									Uitloggen
								</ion-text>
							</ion-label>
						</ion-item>
					</ion-item-group>
				</ion-list>
				<!-- <ion-button @click="logout" color="danger">
          Uitloggen
        </ion-button> -->
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
	IonList,
	IonItemGroup,
	IonListHeader,
	IonItem,
	IonAvatar,
	IonIcon,
	IonLabel,
	IonText,
} from '@ionic/vue';
import { logOut, cog } from 'ionicons/icons';
import { defineComponent } from 'vue';

import { Storage } from '@capacitor/storage';

export default defineComponent({
	name: 'Menu',
	components: {
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonPage,
		IonList,
		IonItemGroup,
		IonListHeader,
		IonItem,
		IonAvatar,
		IonIcon,
		IonLabel,
		IonText,
	},
	setup() {
		return {
			logOut,
			cog,
		};
	},
	methods: {
		async logout() {
			await Storage.set({
				key: 'isAuthenticated',
				value: 'false',
			});

			// this.$router.push({ name: 'tabs/forum', params: { topicId } })
			this.$router.push('/login');
		},
	},
});
</script>
