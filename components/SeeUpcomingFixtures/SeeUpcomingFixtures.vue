<template>
  <div class="see-upcoming-fixtures-container">
    <div class="see-upcoming-fixtures">
        <div class="see-upcoming-fixtures__header">
          <h1>See Upcoming Fixtures.</h1>
          <p>Make your predictions, rack up points.</p>
        </div>
    </div>
    <div class="prediction-cards">
      <div class="prediction-cards__child" v-for="(fixture, index) in matchData" :key="index">
        <PredictionCard :matchData="fixture"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const matchData = ref([
  {
    id: 11,
    home_team: "Aston Villa",
    home_team_score: null,
    away_team: "Everton",
    away_team_score: null,
    has_finished: false,
    kickoff_time: new Date(),
    competition_slug: "epl",
    home_team_color: null,
    away_team_color: null,
    top_predictions: [],
  },
  {
    id: 12,
    home_team: "Crystal Palace",
    home_team_score: null,
    away_team: "Arsenal",
    away_team_score: null,
    has_finished: false,
    kickoff_time: new Date(),
    competition_slug: "epl",
    home_team_color: null,
    away_team_color: null,
    top_predictions: [],
  },
  {
    id: 13,
    home_team: "Fulham",
    home_team_score: null,
    away_team: "Brentford",
    away_team_score: null,
    has_finished: false,
    kickoff_time: new Date(),
    competition_slug: "epl",
    home_team_color: null,
    away_team_color: null,
    top_predictions: [],
  },
]);
</script>

<style lang="scss" scoped src="./SeeUpcomingFixtures.scss"></style>
