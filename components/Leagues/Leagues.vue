<template>
  <div class="leagues">
    <div class="leagues-title">
      <p>Football Leagues</p>
      <div class="leagues-title-border"></div>
    </div>
    <Spinner v-if="isLoading" isCenter />
    <div class="leagues-grid" v-else>
      <div
        class="leagues-card"
        v-for="(league, index) in leagueItems"
        :key="index"
        :class="{ 'leagues-card-disabled': !league.is_active }"
      >
        <div class="leagues-card-top">
          <div class="leagues-card-top-flex custom-margin-28">
            <div class="leagues-card-top-logo">
              <img :src="league?.logo ? league?.logo : '/icons/plLogo.png'" />
            </div>
            <div class="leagues-card-top-meta">
              <p class="leagues-card-top-meta-status">
                {{
                  checkActiveLeague(league.start_date) && league.is_active
                    ? "Active"
                    : league.is_active
                    ? `Starts in ${getStartDate(league.start_date)}`
                    : ""
                }}
              </p>
              <p class="leagues-card-top-meta-name">{{ league?.name }}</p>
              <p class="leagues-card-top-meta-country">{{ league?.tag }}</p>
            </div>
          </div>
          <div class="leagues-card-top-flex">
            <div class="leagues-card-top-desc">
              <p class="leagues-card-top-desc-title">Pool prize</p>
              <div class="leagues-card-top-flex">
                <div class="leagues-card-top-desc-icon">
                  <img src="/icons/Trophy.svg" />
                </div>
                <p class="leagues-card-top-desc-num">
                  {{ formatAmount(league?.current_pool_prize) }}
                </p>
              </div>
            </div>
            <div class="leagues-card-top-desc">
              <p class="leagues-card-top-desc-title">Participants</p>
              <div class="leagues-card-top-flex">
                <div class="leagues-card-top-desc-icon">
                  <img src="/icons/Medal.svg" />
                </div>
                <p class="leagues-card-top-desc-num">
                  {{
                    league?.current_position !== null && +league?.current_position !== 0
                      ? league?.current_position + "/"
                      : ""
                  }}{{ league?.player_count }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="leagues-card-bottom">
          <div v-if="!league?.is_active" class="leagues-card-bottom-button">Coming Soon</div>
          <button
            v-else
            @click="
              league?.current_position !== null
                ? router.push(`/dashboard/competitions/${league?.slug}`)
                : openModal(league)
            "
            class="leagues-card-bottom-button"
          >
            {{ league?.current_position !== null ? "Predict" : "Join competition" }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <CustomModal v-if="showModal" @close="closeModal">
    <TeamSelect :singleLeague="singleLeague" />
  </CustomModal>
</template>

<script setup>
import { ref } from "vue";
import { useFixturesStore } from "@/store/fixturesStore";
import { formatAmount } from "../../helpers/moneyformatter";
import { daysDifference } from "../../helpers/dataFormatter";

const fixtureStore = useFixturesStore();
const router = useRouter();

const showModal = ref(false);
const isLoading = ref(true);
const singleLeague = ref({});
const currentDate = new Date();

onMounted(async () => {
  await fixtureStore.action.fetchCompetitions();
  isLoading.value = false;
});

const openModal = (league) => {
  showModal.value = true;
  singleLeague.value = league;
  document.body.classList.add("block-modal");
};

const closeModal = () => {
  showModal.value = false;
  document.body.classList.remove("block-modal");
};

const leagueItems = fixtureStore.getters.getCompetitions;

const getStartDate = (startDate) => {
  const leagueStartDate = new Date(startDate);
  const timeDifference = leagueStartDate - currentDate;
  const diff = daysDifference(timeDifference);
  return `${diff} ${diff === 1 ? "day" : "days"}`;
};

const checkActiveLeague = (startDate) => {
  const leagueStartDate = new Date(startDate);
  const timeDifference = leagueStartDate - currentDate;
  if (timeDifference <= 0) return true;
  return false;
};
</script>

<style lang="scss" scoped src="./Leagues.scss"></style>
