<template>
  <div>
    <div class="upcoming-fixtures">
        <div class="upcoming-fixtures__header">
          <h1>Upcoming Fixtures</h1>
          <p>Make your predictions, rack up points.</p>
        </div>
        <div class="upcoming-fixtures__tabs">
            <div class="upcoming-fixtures__tabs__tab english"
              :class="{'english__hover': premierLeagueIsHoverState, 'english__active': premierLeagueIsActiveState}"
              @mouseover="premierLeagueIsHoverState = true"
              @mouseleave="premierLeagueIsHoverState = false"
              @click="displayFixture('epl')">
              <div class="english_image">
                <img :src="premierBackgroundUrl" alt="">
              </div>
              <p>English Premier League</p>
            </div>
            <div
              class="upcoming-fixtures__tabs__tab champions"
              :class="{'champions__hover': championsLeagueIsHoverState, 'champions__active': championsLeagueIsActiveState}"
              @mouseover="championsLeagueIsHoverState = true"
              @mouseleave="championsLeagueIsHoverState = false"
              @click="displayFixture('cl')">
              <div class="champions_image">
                <img :src="championsBackgroundUrl" alt="">
              </div>
              <p>UEFA Champions League</p>
            </div>
        </div>
    </div>
    <DateScroll :events="events?.events" :matchRound="events?.current_round" @fetchCurrentMatchesSelected="fetchCurrentMatchesSelected"/>
    <div class="prediction-cards">
      <div class="prediction-cards__child" v-for="(fixture, index) in fixtures" :key="index">
        <PredictionCard :fixture="fixture"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useFixturesStore } from '@/store/fixturesStore'

const fixtureStore = useFixturesStore();

let premierLeagueIsActiveState = ref(true)
let premierLeagueIsHoverState = ref(false)
let championsLeagueIsActiveState = ref(false)
let championsLeagueIsHoverState = ref(false)

let championsBackgroundUrl = ref('/icons/champions-league-inactive.svg')
let premierBackgroundUrl = ref('/icons/england-flag.svg')

let leagueFixture = ref('epl')

const fixtures = fixtureStore.getters.getFixtures;
const events = fixtureStore.getters.getMatchEvents;


onMounted(async() => {
  try {
    const res = fixtureStore.action.fetchEvents(leagueFixture.value)
    res.then((res: any) => {
      if (res) {
        fixtureStore.action.fetchFixtures(leagueFixture.value, res?.current_round);
      }
    })
    
  } catch (error) {
    console.error(error)
    return error
  }
  
})

const fetchCurrentMatchesSelected = (round: string) => {
  fixtureStore.action.fetchFixtures(leagueFixture.value, round);
}

watch(championsLeagueIsHoverState, (val) => {
  if(val === true && !championsLeagueIsActiveState) {
    championsBackgroundUrl.value = '/icons/champions-league-hover.svg';
  } else (
    championsBackgroundUrl.value = '/icons/champions-league-inactive.svg'
  )
}, { immediate: true })

const displayFixture = (competition: string) => {
  if (competition === 'epl') {
    premierLeagueIsActiveState.value = true; 
    championsLeagueIsActiveState.value = false;
    leagueFixture.value = 'epl'
  } else if (competition === 'cl') {
    championsLeagueIsActiveState.value = true;
    premierLeagueIsActiveState.value = false;
    leagueFixture.value = 'cl'
  }
}

</script>

<style lang="scss" scoped src="./LandingUpcomingFixtures.scss"></style>