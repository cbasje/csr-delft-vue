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
			<div class="container">
				<!-- TODO: Infinite scroll -->
				<!-- <ion-infinite-scroll (ionInfinite)="$event.waitFor(doInfinite())" [class.hideinf]="(moreAvailable$ | async) === false" [enabled]="moreAvailable$ | async" position="top">
    <ion-infinite-scroll-content></ion-infinite-scroll-content>
  </ion-infinite-scroll> -->

				<ion-list class="post-list" v-if="posts.length > 0">
					<ion-item-group
						v-for="(post, index) in posts"
						:key="post.post_id"
					>
						<ion-item-divider
							v-if="
								posts.length - index === unread &&
									posts.length !== unread
							"
							class="js-unread-post"
						>
							{{ unread }}
							{{
								unread > 1
									? 'nieuwe berichten'
									: 'nieuw bericht'
							}}
						</ion-item-divider>

						<ion-item class="ion-text-wrap">
							<ion-avatar
								slot="start"
								@click="goToMemberDetail(post.uid)"
							>
								<img
									class="post-image"
									:src="imageUrl + post.uid + '.jpg'"
								/>
							</ion-avatar>
							<ion-label>
								<h3 class="post-author">
									{{ post.uid_naam }}
								</h3>
								<p class="post-date">
									<!-- Date from the mixin -->
									{{ formatDate(post.datum_tijd.date) }}
								</p>
							</ion-label>
						</ion-item>
						<ion-item>
							<ion-avatar slot="start"></ion-avatar>

							<ForumMessage :text="post.tekst"></ForumMessage>
						</ion-item>
					</ion-item-group>
				</ion-list>

				<template v-if="posts.length == 0">
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
	IonContent,
	IonButtons,
	IonBackButton,
	IonButton,
	IonIcon,
	IonList,
	IonItemGroup,
	IonItemDivider,
	IonItem,
	IonAvatar,
	IonLabel,
	IonSpinner,
} from '@ionic/vue';
import { open } from 'ionicons/icons';
import { defineComponent } from 'vue';

import { useRoute } from 'vue-router';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import ForumMessage from '@/components/ForumMessage.vue';

import dateFormat from '@/mixins/dateFormat';

import urlService from '../services/url.service';

export default defineComponent({
	name: 'ForumTopic',
	components: {
		ForumMessage,
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
		IonItemGroup,
		IonItemDivider,
		IonItem,
		IonAvatar,
		IonLabel,
		IonSpinner,
	},
	setup() {
		const route = useRoute();
		const { topicID } = route.params;
		return {
			topicID,
			open,
		};
	},
	data() {
		return {
			imageUrl: '',
			unread: 5,
		};
	},
	async mounted() {
		await this.loadPosts({ topicId: this.topicID, reset: true }).then(
			() => {
				this.selectTopic(this.topicID);
			}
		);
	},
	mixins: [dateFormat],
	methods: {
		async viewExternal() {
			const url =
				process.env.VUE_APP_SITE_URL +
				`/forum/onderwerp/${this.topicID}#ongelezen`;
			urlService.open(url);
		},
		...mapActions('posts', {
			loadPosts: 'loadPosts',
		}),
		...mapMutations('topics', {
			selectTopic: 'saveSelectTopic',
		}),
	},
	computed: {
		...mapGetters('posts', {
			byTopic: 'getByTopic',
		}),
		...mapGetters({
			topic: 'getSelectedTopic',
			posts: 'getSelectedTopicPostsAll',
			moreAvailable: 'getSelectedTopicMorePostsAvailable',
		}),
	},
});
</script>
