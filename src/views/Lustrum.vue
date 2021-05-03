<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Lustrum</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Lustrum</ion-title>
				</ion-toolbar>
			</ion-header>

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
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Lustrum',
	components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
});
</script>
