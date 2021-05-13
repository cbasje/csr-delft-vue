<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>EventCalendar</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true" class="ion-padding">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">EventCalendar</ion-title>
				</ion-toolbar>
			</ion-header>

			<div class="container">
				<!-- <FullCalendar options="calendarOptions" /> -->
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
} from '@ionic/vue';
import { defineComponent } from 'vue';

// import FullCalendar from '@fullcalendar/vue'
// import dayGridPlugin from '@fullcalendar/daygrid'

export default defineComponent({
	name: 'EventCalendar',
	components: {
		// FullCalendar,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonPage,
	},
});
</script>
