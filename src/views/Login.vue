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
	loadingController,
} from '@ionic/vue';
import { defineComponent } from 'vue';

import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import authService from '@/services/auth.service';

import { Dialog } from '@capacitor/dialog';
import { mapActions, mapMutations } from 'vuex';

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
			const loading = await loadingController.create({
				message: 'Inloggen...',
			});

			await loading.present();

			authService
				.login({
					username: this.username,
					password: this.password,
				})
				.then((tokens) => {
					this.setAuthenticated(true);
					this.setTokens(tokens);

					// this.$router.push({ name: 'tabs/forum', params: { topicId } })
					this.$router.push('/tabs/forum').then(() => {
						loading.dismiss();
					});
				})
				.catch(async (error) => {
					loading.dismiss();

					await Dialog.alert({
						title: 'Inloggen mislukt',
						message: `Pff, die verplicht ingewikkelde wachtwoorden ook... \
            Het kan zijn dat je even moet wachten voor je een nieuwe poging mag wagen. Omdat: \
			${error}`,
						buttonTitle: 'Probeer het nog eens',
					});
				});
		},
		...mapActions('auth', {
			setTokens: 'setTokens',
		}),
		...mapMutations('auth', {
			setAuthenticated: 'setAuthenticated',
		}),
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
