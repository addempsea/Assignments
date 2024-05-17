<template>
  <div>
    <div class="prediction-card">
        <div class="prediction-card__teams">
            <p class="prediction-card__teams--heading">Enter your prediction</p>
            <div class="prediction-card__teams--body">
                <div class="team-input__a">
                    <div class="team-input__a__color logo"></div>
                    <p>{{ matchData.home_team }}</p>
                </div>
                <div class="team-prediction">
                    <div class="team-input__a__prediction">
                        <div v-if="homeTeamPredictionActive">
                            <input type="text">
                        </div>
                        <div v-else class="plus" @click="signupToPredict">
                            <svgo-prediction-plus />
                        </div>
                    </div>
                    <p class="column">:</p>
                    <div class="team-input__b__prediction">
                        <div v-if="awayTeamPredictionActive">
                            <input type="text">
                        </div>
                        <div v-else class="plus" @click="signupToPredict">
                            <svgo-prediction-plus />
                        </div>
                    </div>
                </div>
                <div class="team-input__b">
                    <div class="team-input__b__color logo"></div>
                    <p>{{ matchData.away_team }}</p>
                </div>
            </div>
        </div>
        <div class="points">
            4pts
        </div>
        <div class="prediction-card__stats">
            <div class="prediction-card__stats--left">
                <p class="top">Top predictions</p>
                <div class="scores">
                    <div>
                        <p class="score">2-1</p>
                        <p class="percent">30%</p>
                    </div>
                    <div>
                        <p class="score">2-1</p>
                        <p class="percent">30%</p>
                    </div>
                    <div>
                        <p class="score">2-1</p>
                        <p class="percent">30%</p>
                    </div>
                </div>
            </div>
            <div class="prediction-card__stats--right">
                <p class="kick-off">Kick off</p>
                <p class="date">{{ dateFormatter(matchData.kickoff_time) }}</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dateFormatter } from "../../helpers/dataFormatter";

const router = useRouter();
// const dayjs = useDayjs();
// const date = dayjs('2023-01-01')

interface ImatchDatas {
    matchData: ImatchDatasObject
}

interface ImatchDatasObject {
    away_team: String
    away_team_color?: String
    away_team_score?: String
    competition_slug?: String
    has_finished?: Boolean
    home_team: String
    home_team_color?: String
    home_team_score?: String
    id?: Number
    kickoff_time: String

}

const homeTeamPredictionActive = ref(false);
const awayTeamPredictionActive = ref(false);

const signupToPredict = () => {
  router.push({ path: "/login" });
}

// defineProps<ImatchDatas>()
defineProps({
  matchData: {
    type: Object,
    required: true,
  },
});

</script>

<style lang="scss" scoped src="./PredictionCard.scss"></style>