import { createStore } from 'vuex';
import membersModule from './modules/members';

const store = createStore({
	modules: {
		// events: eventsModule,
		members: membersModule,
		// posts: postsModule,
		// topics: topicsModule
	},
});

export default store;
