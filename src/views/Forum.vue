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
				<ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
					<ion-refresher-content></ion-refresher-content>
				</ion-refresher>

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
							<h3>{{ topic.titel }}</h3>
							<p>
								<strong>
									{{ topic.laatste_wijziging_naam }}:
								</strong>
								<!-- <ion-text class="ion-text-wrap" [innerHTML]="topic.laatste_post.tekst | bbStrip"></ion-text> -->
								<ion-text
									v-html="topic.laatste_post.tekst"
								></ion-text>
							</p>
						</ion-label>
						<ion-text
							slot="end"
							:color="topic.ongelezen > 0 ? 'primary' : null"
						>
							<!-- Date from the mixin -->
							{{ formatDate(topic.laatst_gewijzigd.date) }}
						</ion-text>
						<ion-badge slot="end" v-if="topic.ongelezen > 0">
							{{ topic.ongelezen }}
						</ion-badge>
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
import { ForumTopic } from '@/store/topics/topics.model';
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
	IonRefresher,
	IonRefresherContent
} from '@ionic/vue';
import { star, lockClosed } from 'ionicons/icons';
import { defineComponent } from 'vue';

import dateFormat from '@/mixins/dateFormat';

import { mapActions, mapGetters } from 'vuex';

interface RefreshEvent {
	target: {
		complete: Function;
	};
}

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
		IonRefresher,
		IonRefresherContent
	},
	setup() {
		return {
			star,
			lockClosed,
		};
	},
	async mounted() {
		await this.loadTopics(true);
	},
	mixins: [dateFormat],
	methods: {
		doInfinite() {
			this.loadTopics(false);
		},
		doRefresh(event: RefreshEvent) {
			this.loadTopics(true).then(() => {
				event.target.complete();
			});
		},
		goToTopicDetail(topic: ForumTopic) {
			const topicID = topic.draad_id;
			this.$router.push({ path: `/tabs/forum/${topicID}` });
		},
		...mapActions('topics', {
			loadTopics: 'loadTopics',
		}),
	},
	computed: {
		...mapGetters('topics', {
			topics: 'getAllTopics',
			moreAvailable: 'isMoreAvailable',
		}),
	},
});
</script>
