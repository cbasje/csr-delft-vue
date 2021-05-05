<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Forum Recent</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Forum Recent</ion-title>
				</ion-toolbar>
			</ion-header>

			<div class="container">
				<!-- <div *ngIf="topics$ | async as topics"> -->

				<ion-list v-if="topics.length > 0">
					<ion-item
						button
						detail
						v-for="topic in topics"
						:key="topic.id"
						@click="goToTopicDetail(topic)"
					>
						<ion-icon
							:icon="star"
							v-if="topic.belangrijk"
						></ion-icon>
						<ion-icon
							:icon="lockClosed"
							v-if="topic.gesloten"
						></ion-icon>
						<ion-label class="ion-text-wrap">
							<h2>{{ topic.titel }}</h2>
							<p>
								<strong
									>{{ topic.laatsteWijzigingNaam }}:
								</strong>
								<!-- <ion-text class="ion-text-wrap" [innerHTML]="topic.laatste_post.tekst | bbStrip"></ion-text> -->
								<ion-text
									v-html="topic.laatstePost.tekst"
								></ion-text>
							</p>
						</ion-label>
						<ion-text
							slot="end"
							:color="topic.ongelezen > 0 ? 'primary' : null"
						>
							{{ formattedDate(topic.laatstGewijzigd.date) }}
						</ion-text>
						<ion-badge slot="end" v-if="topic.ongelezen > 0">{{
							topic.ongelezen
						}}</ion-badge>
					</ion-item>
				</ion-list>

				<template v-if="topics.length == 0">
					<div class="loading">
						<ion-spinner></ion-spinner>
					</div>
				</template>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { ForumTopic } from '@/models/forum-topic';
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonList,
	IonItem,
	IonIcon,
	IonLabel,
	IonText,
	IonBadge,
	IonSpinner,
} from '@ionic/vue';
import { star, lockClosed } from 'ionicons/icons';
import { defineComponent } from 'vue';

import dateFormat from '@/mixins/dateFormat';

export default defineComponent({
	name: 'Forum',
	components: {
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonPage,
		IonList,
		IonItem,
		IonIcon,
		IonLabel,
		IonText,
		IonBadge,
		IonSpinner,
	},
	setup() {
		return {
			star,
			lockClosed,
		};
	},
	data() {
		return {
			topics: [
				{
					id: 0,
					belangrijk: false,
					gesloten: false,
					ongelezen: 17,
					titel: 'Titel',
					laatsteWijzigingNaam: 'Ama. Lid',
					laatstePost: {
						tekst: 'Hoi',
					},
					laatstGewijzigd: {
						date: '2018-04-04T16:00:00.000Z'
					}
				},
			],
		};
	},
    mixins: [dateFormat],
	methods: {
		goToTopicDetail(topic: ForumTopic) {
			// console.log(topic.titel);
			const topicID = topic.draad_id;
			this.$router.push({ path: `/tabs/forum/${topicID}` });
			// this.$router.push({ name: 'forum', params: { topicID } })
		},
		formattedDate(dateString: string): string {
            // From the mixin
            return this.formatDate(dateString);
        }
	}
});
</script>
