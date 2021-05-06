import { createStore } from 'vuex';

import membersModule from './members/members';
import topicsModule from './topics/topics';

const store = createStore({
	modules: {
		// events: eventsModule,
		members: membersModule,
		// posts: postsModule,
		topics: topicsModule
	},
});

export default store;
