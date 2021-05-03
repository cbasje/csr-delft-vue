<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="forum" href="/tabs/forum">
          <ion-icon :icon="chatbubbles" />
          <ion-label>Forum</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="events" href="/tabs/events">
          <ion-icon :icon="calendar" />
          <ion-label>Agenda</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="members" href="/tabs/members">
          <ion-icon :icon="people" />
          <ion-label>Leden</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="lustrum" href="/tabs/lustrum" style="--color-selected: red">
          <ion-icon :icon="hourglass" />
          <ion-label>Lustrum</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="menu" href="/tabs/menu">
          <ion-icon :icon="menu" />
          <ion-label>Meer...</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { chatbubbles, calendar, people, menu, hourglass } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      chatbubbles,
      calendar,
      people,
      menu,
      hourglass
    }
  }
})
</script>