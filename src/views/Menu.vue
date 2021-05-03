<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Menu</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container">
        <ion-button @click="logout" color="danger">
          Uitloggen
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

import { Storage } from '@capacitor/storage';

export default defineComponent({
  name: 'Menu',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton },
  methods: {
    async logout() {
        await Storage.set({
          key: 'isAuthenticated',
          value: 'false',
        });
        
        // this.$router.push({ name: 'tabs/forum', params: { topicID } })
        this.$router.push('/login')
    }
  }
})
</script>