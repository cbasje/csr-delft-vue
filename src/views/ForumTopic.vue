<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button
						defaultHref="/tabs/forum"
					></ion-back-button>
				</ion-buttons>
				<ion-title v-if="topic">{{ topic.titel }}</ion-title>
				<ion-title v-else>Forum {{ topicId }}</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="viewExternal()">
						<ion-icon slot="icon-only" :icon="open"></ion-icon>
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>

		<ion-content ref="ionContent" scrollEvents="true">
			<div class="container">
				<ion-infinite-scroll
					@ionInfinite="doInfinite($event)"
					:disabled="!moreAvailable"
					position="top"
				>
					<ion-infinite-scroll-content></ion-infinite-scroll-content>
				</ion-infinite-scroll>

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
	IonInfiniteScroll,
	IonInfiniteScrollContent,
	IonList,
	IonItemGroup,
	IonItemDivider,
	IonItem,
	IonAvatar,
	IonLabel,
	IonSpinner,
} from '@ionic/vue';
import { open } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';

import { useRoute } from 'vue-router';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import ForumMessage from '@/components/ForumMessage.vue';

import dateFormat from '@/mixins/dateFormat';

import urlService from '../services/url.service';

interface InfiniteEvent {
	target: {
		complete: Function;
		disabled: boolean;
	};
}

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
		IonInfiniteScroll,
		IonInfiniteScrollContent,
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
		const { topicId } = route.params;

		const ionContent = ref();

		return {
			topicId,
			open,
			ionContent,
		};
	},
	data() {
		return {
			imageUrl: '',
			unread: 5,
		};
	},
	async mounted() {
		this.selectTopic(this.topicId);
		await this.loadPosts({ topicId: this.topicId, reset: true });

		this.scrollToUnread();
	},
	mixins: [dateFormat],
	methods: {
		async viewExternal() {
			const url =
				process.env.VUE_APP_SITE_URL +
				`/forum/onderwerp/${this.topicId}#ongelezen`;
			urlService.open(url);
		},
		doInfinite(event: InfiniteEvent) {
			this.loadPosts({ topicId: this.topicId, reset: false }).then(() => {
				console.log('Loaded data');
				event.target.complete();
				event.target.disabled = !this.moreAvailable;
			});
		},
		scrollToUnread() {
			const unreadEl = document.querySelector('.js-unread-post');

			if (!unreadEl) {
				this.ionContent.$el.scrollToBottom();
				return;
			}

			const rect = unreadEl.getBoundingClientRect();
			console.log(rect.top);
			
			this.ionContent.$el.scrollToPoint(null, rect.top + window.innerHeight);
		},
		...mapActions('posts', {
			loadPosts: 'loadPosts',
		}),
		...mapMutations('topics', {
			selectTopic: 'selectTopic',
		}),
	},
	computed: {
		...mapGetters('posts', {
			byTopic: 'getByTopic',
		}),
		...mapGetters('topics', {
			topic: 'getSelectedTopic',
		}),
		...mapGetters({
			posts: 'getSelectedTopicPostsAll',
			moreAvailable: 'getSelectedTopicMorePostsAvailable',
		}),
	},
});
</script>
