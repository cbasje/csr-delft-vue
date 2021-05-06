<template>
	<div v-html="text"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ForumMessage',
	props: {
		text: String,
	},
});
</script>
