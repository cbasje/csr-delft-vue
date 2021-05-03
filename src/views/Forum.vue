<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Forum Recent</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Forum Recent</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div class="container">
      <!-- <div *ngIf="topics$ | async as topics"> -->

        <ion-list v-if="topics.length > 0">

          <ion-item button detail v-for="topic in topics" :key="topic.id" @click="goToTopicDetail(topic)">
            <ion-icon :icon="star" v-if="topic.belangrijk"></ion-icon>
            <ion-icon :icon="lockClosed" v-if="topic.gesloten"></ion-icon>
            <ion-label class="ion-text-wrap">
              <h2>{{ topic.titel }}</h2>
              <p>
                <strong>{{ topic.laatsteWijzigingNaam }}: </strong>
                <!-- <ion-text class="ion-text-wrap" [innerHTML]="topic.laatste_post.tekst | bbStrip"></ion-text> -->
                <ion-text v-html="topic.laatstePost.tekst"></ion-text>
              </p>
            </ion-label>
            <ion-text slot="end" :color="topic.ongelezen > 0 ? 'primary' : null">
              17:17
              <!-- {{ topic.laatst_gewijzigd.date | dateCalendar: { sameDay: 'HH:mm', lastDay: 'HH:mm', lastWeek: 'eeeeee ee', sameElse: 'dd-MM-yy' } }} -->
            </ion-text>
            <ion-badge slot="end" v-if="topic.ongelezen > 0">{{ topic.ongelezen }}</ion-badge>
          </ion-item>

        </ion-list>

        <div class="loading" v-if="topics.length == 0">
          <ion-spinner></ion-spinner>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonText, IonBadge, IonSpinner } from '@ionic/vue';
import { star, lockClosed } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Forum',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, IonItem, IonIcon, IonLabel, IonText, IonBadge, IonSpinner },
  setup() {
    return {
      star,
      lockClosed
    }
  },
  data () {
    return {
      topics: [
        {
          id: 0,
          belangrijk: false,
          gesloten: false,
          ongelezen: 17,
          titel: "Titel",
          laatsteWijzigingNaam: "Ama. Lid",
          laatstePost: {
            tekst: "Hoi"
          }
        }
      ]
    }
  },
  methods: {
    goToTopicDetail(topic: any) {
      console.log(topic.titel);
    }
  }
})
</script>