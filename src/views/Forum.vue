<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Forum</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Forum</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <ExploreContainer name="Forum page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Forum',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
})
</script>