<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Settings</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container">
        <ion-button @click="logout()" color="danger" expand="block">
          Uitloggen
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Settings',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton },
  methods: {
    logout() {
        // await this.authService.logout();
        // this.navCtrl.navigateRoot("/login")
        console.log('Log out');
    }
  }
})
</script>