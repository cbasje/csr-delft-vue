<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Login</ion-title>
			</ion-toolbar>
		</ion-header>
		
		<ion-content class="ion-padding">
			<div class="container">
				<form @submit.prevent="login" method="post">
					<p>
						Gebruik je lidnummer en wachtwoord van de stek om in te
						loggen.
					</p>
					<div class="form-group">
						<ion-item>
							<ion-label position="floating">Lidnummer</ion-label>
							<ion-input
								v-model="username"
								type="username"
							></ion-input>
						</ion-item>
						<div
							v-for="error of v$.username.$errors"
							class="errors"
							:key="error.$uid"
						>
							<span class="error-msg">{{ error.$message }}</span>
						</div>
						<ion-item>
							<ion-label position="floating"
								>Wachtwoord</ion-label
							>
							<ion-input
								v-model="password"
								type="password"
							></ion-input>
						</ion-item>
						<div
							v-for="error of v$.password.$errors"
							class="errors"
							:key="error.$uid"
						>
							<span class="error-msg">{{ error.$message }}</span>
						</div>
					</div>

					<ion-button type="submit" expand="block">
						Inloggen
					</ion-button>
				</form>
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
	IonItem,
	IonLabel,
	IonButton,
	IonInput,
} from '@ionic/vue';
import { defineComponent } from 'vue';

import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import { Storage } from '@capacitor/storage';

export default defineComponent({
	name: 'Login',
	components: {
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonPage,
		IonItem,
		IonLabel,
		IonButton,
		IonInput,
	},
	methods: {
		async login() {
			await Storage.set({
				key: 'isAuthenticated',
				value: 'true',
			});

			// this.$router.push({ name: 'tabs/forum', params: { topicId } })
			this.$router.push('/tabs/forum');
		},
	},
	setup() {
		// const ionRouter = useIonRouter();
		return { v$: useVuelidate() };
	},
	data() {
		return {
			username: '',
			password: '',
		};
	},
	validations() {
		return {
			username: {
				required: helpers.withMessage('Lidnummer is vereisd', required),
				$autoDirty: true,
			},
			password: {
				required: helpers.withMessage(
					'Wachtwoord is vereisd',
					required
				),
				$autoDirty: true,
			},
		};
	},
});
</script>

<style scoped>
.form-group {
	border-radius: 4px;
	overflow: hidden;
	margin-bottom: 17px;
}

.errors {
	font-size: small;
	color: #fff;
	background: var(--ion-color-danger);
	padding-left: 15px;
	padding-top: 2px;
	padding-bottom: 5px;
}
</style>
