<template>
  <div class="pool-banner">
    <div class="pool-banner-flex">
      <img src="/icons/newDashboardCurrency.svg" class="first-image" />
      <div class="pool-banner-text">
        <p class="pool-banner-text-title">Current pool amount</p>
        <p>{{ formatSymbolAmount(+competitionInfo?.current_pool_prize) }}</p>
      </div>
    </div>
    <div class="pool-banner-flex">
      <button @click="openModal">Put money in the pool</button>
      <img src="/icons/newPool.svg" class="second-image" />
    </div>
  </div>
    <CustomModal v-if="showModal" @close="closeModal">
    <PaymentForm />
  </CustomModal>
</template>

<script setup lang="ts">
import { useFixturesStore } from "@/store/fixturesStore";
import { formatSymbolAmount } from "../../helpers/moneyformatter";

const route = useRoute();

const fixtureStore = useFixturesStore();
const leagueFixture = ref(`${route.params.slug}`);

let competitions = fixtureStore.getters.getCompetitions as Record<string, any>;
let competitionInfo = ref({
  current_pool_prize: "0",
});
const showModal = ref(false);


watch(competitions, (newValue) => {
  competitionInfo.value = newValue?.find((e: any) => e.slug === leagueFixture.value);
});

const openModal = () => {
  showModal.value = true;
  document.body.classList.add("block-modal");
};

const closeModal = () => {
  showModal.value = false;
  document.body.classList.remove("block-modal");
};
</script>

<style lang="scss" scoped src="./PoolBanner.scss"></style>
