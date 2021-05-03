<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ledenlijst</ion-title>
      </ion-toolbar>
      <!-- If not iOS, show the searchbar in the main header -->
      <ion-toolbar v-if="!ios">
        <ion-searchbar
            placeholder="Zoek op naam of lidnummer"
            inputmode="search"
            autocomplete="name"
            autocorrect="off"
            enterkeyhint="search"
            animated
            v-model="searchQuery"
            @ionInput="search($event)">
            <!-- @ionBlur="stopSearchSoft()"
            @ionCancel="stopSearch()"> -->
          </ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Ledenlijst</ion-title>
        </ion-toolbar>
        <ion-toolbar v-if="ios">
          <ion-searchbar
            placeholder="Zoek op naam of lidnummer"
            inputmode="search"
            autocomplete="name"
            autocorrect="off"
            enterkeyhint="search"
            cancelButtonText="Annuleer"
            showCancelButton="focus"
            animated
            v-model="searchQuery"
            @ionInput="search($event)">
          </ion-searchbar>
        </ion-toolbar>
      </ion-header>
      
      <ExploreContainer name="Members page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonSearchbar, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent } from 'vue';

import { isPlatform } from '@ionic/vue';

export default defineComponent({
  name: 'Members',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonSearchbar, IonContent, IonPage },
  data () {
    return {
      searchQuery: "",
      ios: isPlatform('ios')
    }
  },
  methods: {
    search(event: Event) {
      const query = (event.target as HTMLInputElement).value;
      console.log(query);
      
      // this.store.dispatch(new members.SearchAction(query));
    }
  }
})
</script>