import { createStore } from 'vuex';

import membersModule from './members/members';
import topicsModule from './topics/topics';
import postsModule from './posts/posts';

const store = createStore({
	modules: {
		// events: eventsModule,
		members: membersModule,
		topics: topicsModule,
		posts: postsModule,
	},
	// Getters for Topics and Posts relations
	getters: {
		getSelectedTopicPosts(state: any, getters: any) {
			const topicId = getters['topics/getSelectedId'];
			const posts = getters['posts/getByTopic'];

			return topicId && posts[topicId];
		},
		getSelectedTopicPostIds(state: any, getters: any) {
			const posts = getters['getSelectedTopicPosts'];
			
			return posts && posts.ids;
		},
		getSelectedTopicPostsAll(state: any, getters: any) {
			const ids = getters['getSelectedTopicPostIds'];
			const entities = getters['posts/getAllPosts'];

			return (ids && ids.map((id: string) => entities[id])) || [];
		},
		getSelectedTopicPostsLength(state: any, getters: any) {
			const postIds = getters['getSelectedTopicPostIds'];

			return postIds && postIds.length;
		},
		getSelectedTopicMorePostsAvailable(state: any, getters: any) {
			const posts = getters['getSelectedTopicPosts'];
			
			return (posts && posts.isMoreAvailable) || [];
		}
	}
});

export default store;
