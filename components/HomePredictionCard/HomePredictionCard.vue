<template>
  <div>
    <div class="prediction-card">
      <div class="prediction-card_feedback" v-if="showToast">
        <div class="prediction-card_feedback_icon" v-if="hasPredicted">
          <img src="/icons/whiteCheck.svg" />
        </div>
        <p>{{ toastMessage }}</p>
      </div>
      <p class="prediction-card__teams--heading" v-if="!hasPredicted">
        {{
          matchData?.has_finished
            ? "Match Ended"
            : hasMatchStarted
            ? "Match Started"
            : homeTeamScore !== null
            ? "Edit your prediction"
            : "Enter your prediction"
        }}
      </p>
      <div v-else class="prediction-card__teams--hasPredicted">
        <img src="/icons/ArchiveBox.svg" />
        <p>Prediction saved!</p>
      </div>
      <div class="prediction-card__teams">
        <div class="prediction-card__teams--body">
          <div class="team-input__a">
            <div
              class="team-input__a__color logo"
              :style="{
                background: matchData?.home_team_color,
              }"
            ></div>
            <p>{{ matchData?.home_team }}</p>
          </div>
          <div class="team-prediction">
            <div class="team-input__a__prediction">
              <div class="plus" @click="handleShowInput">
                <input
                  type="tel"
                  v-if="showInput"
                  v-model="homeInputValue"
                  @blur="handleBlur(matchData.id)"
                  ref="homeInput"
                  :disabled="hasMatchStarted || matchData?.has_finished"
                />
                <img src="/icons/plus.svg" v-else />
              </div>
            </div>
            <p class="column">-</p>
            <div class="team-input__b__prediction">
              <div class="plus" @click="handleShowInput">
                <input
                  type="tel"
                  v-if="showInput"
                  v-model="awayInputValue"
                  @blur="handleBlur(matchData.id)"
                  :disabled="hasMatchStarted || matchData?.has_finished"
                />
                <img src="/icons/plus.svg" v-else />
              </div>
            </div>
          </div>
          <div class="team-input__b">
            <div
              class="team-input__b__color logo"
              :style="{
                background: matchData?.away_team_color,
              }"
            ></div>
            <p>{{ matchData?.away_team }}</p>
          </div>
        </div>
      </div>
      <div class="prediction-card__stats">
        <div class="prediction-card__stats--left">
          <p class="top">Top predictions</p>
          <div class="scores" v-if="matchData?.top_predictions.length > 0">
            <div v-for="(prediction, index) in matchData.top_predictions" :key="index">
              <p class="score">{{ prediction.score }}</p>
              <p class="percent">{{ +prediction.percent }}%</p>
            </div>
          </div>
          <p v-else class="predict-helper">Be the first to predict!</p>
        </div>
        <div class="prediction-card__stats--middle">
          <p class="match-ended">
            {{
              currentDate < matchDate
                ? "Kick Off"
                : matchData?.has_finished
                ? "Match Ended"
                : "Live Score"
            }}
          </p>
          <p class="score">
            {{
              currentDate < matchDate
                ? formattedDate
                : (matchData?.home_team_score || 0) + " - " + (matchData?.away_team_score || 0)
            }}
          </p>
        </div>
        <div class="prediction-card__stats--right">
          <p class="kick-off">Points earned</p>
          <div
            class="points"
            :class="{
              'points-lemon': pointsEarned === 6,
              'points-orange': pointsEarned > 0 && pointsEarned < 6,
            }"
          >
            <p>
              {{
                pointsEarned === 1
                  ? "1pt"
                  : pointsEarned === null
                  ? 0 + "pts"
                  : pointsEarned + "pts"
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { dateFormatter } from "../../helpers/dataFormatter";
import { predictMatch } from "../../services/Prediction";

const route = useRoute();
const showInput = ref(false);
const showToast = ref(false);
const isLoading = ref(false);
const showIcon = ref(false);
const hasPredicted = ref(false);
const homeInput = ref<HTMLInputElement | null>(null);
const homeInputValue = ref("");
const awayInputValue = ref("");
const toastMessage = ref("");

const props = defineProps({
  matchData: {
    type: Object,
    required: true,
  },
});

const currentDate = new Date();
let matchDate = new Date(props.matchData.kickoff_time);
let pointsEarned = currentDate < matchDate ? 0 : props.matchData?.score;
let homeTeamScore = props.matchData.predicted_home_team_score;
let awayTeamScore = props.matchData.predicted_away_team_score;
let hasMatchStarted = currentDate >= matchDate;

let formattedDate = dateFormatter(matchDate);

const handleShowInput = () => {
  if (hasMatchStarted) return;
  if (showInput.value === true) return;
  showInput.value = true;
  nextTick(() => {
    if (homeInput.value) {
      homeInput.value.focus();
    }
  });
};

const handleHideInput = () => (showInput.value = false);

const handleSubmit = async (id: number) => {
  try {
    isLoading.value = true;
    showToast.value = true;
    toastMessage.value = "Predicting...";
    const payload = {
      home_team_score: +homeInputValue.value,
      away_team_score: +awayInputValue.value,
    };
    const slug = `${route.params.slug}`;
    await predictMatch(slug, id, payload);
    toastMessage.value = "Prediction Saved";
    showIcon.value = true;
    isLoading.value = false;
    hasPredicted.value = true;
    setTimeout(() => {
      showToast.value = false;
      showIcon.value = false;
    }, 3000);
  } catch (error) {
    toastMessage.value = "An error occurred";
    isLoading.value = false;
  }
};

const handleBlur = (id: number) => {
  if (!homeInputValue.value && !awayInputValue.value) {
    toastMessage.value = "Prediction Cleared";
    showToast.value = true;
    handleHideInput();
    return setTimeout(() => {
      showToast.value = false;
    }, 3000);
  }
  if (homeInputValue.value && !awayInputValue.value) {
    toastMessage.value = "Predict Away Outcome";
    showToast.value = true;
    return setTimeout(() => {
      showToast.value = false;
    }, 3000);
  }

  if (!homeInputValue.value && awayInputValue.value) {
    toastMessage.value = "Predict Home Outcome";
    showToast.value = true;
    return setTimeout(() => {
      showToast.value = false;
    }, 3000);
  }
  handleSubmit(id);
};

watch(
  () => props.matchData,
  (newVal) => {
    if (newVal) {
      homeTeamScore = newVal?.predicted_home_team_score;
      awayTeamScore = newVal?.predicted_away_team_score;
      matchDate = new Date(newVal?.kickoff_time);
      hasMatchStarted = currentDate >= matchDate;
      pointsEarned = currentDate < matchDate ? 0 : newVal?.score;
      hasPredicted.value = false;
      formattedDate = dateFormatter(matchDate);
      if (newVal?.predicted_home_team_score !== null) {
        homeInputValue.value = newVal.predicted_home_team_score;
        awayInputValue.value = newVal.predicted_away_team_score;
        return (showInput.value = true);
      }
      homeInputValue.value = "";
      awayInputValue.value = "";
      showInput.value = false;
    }
  }
);

onMounted(() => {
  if (homeTeamScore !== null && Number(homeTeamScore) >= 0) {
    homeInputValue.value = homeTeamScore;
    awayInputValue.value = awayTeamScore;
    showInput.value = true;
  }
});
</script>

<style lang="scss" scoped src="./HomePredictionCard.scss"></style>
