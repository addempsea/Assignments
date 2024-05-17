<template>
  <div>
    <div class="prediction__week__card">
      <div class="prediction__week__card--flex">
        <div class="prediction__week__card--flex__left">
          <p class="fl">Total prize this week</p>
        </div>
        <div class="prediction__week__card--flex__right">
          <p class="fr">{{ homeState.weekPrice }}</p>
        </div>
      </div>
      <div class="prediction__week__card--flex middle">
        <div class="prediction__week__card--flex__left">
          <p class="fr">{{ homeState.weekStake }} stakes.</p>
        </div>
        <div class="prediction__week__card--flex__right">
          <p class="fl">Total stakes</p>
        </div>
      </div>
      <div class="prediction__week__card--flex">
        <div class="prediction__week__card--flex__left">
          <p class="fl">Prediction deadline</p>
        </div>
        <div class="prediction__week__card--flex__right">
          <p class="fr">{{ homeState.weekDeadline }}.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const homeState: HomeState = {
  weekPrice: 5000000.00,
  weekStake: 16,
  weekDeadline: '1pm, Thursday, June 2023'
}

</script>

<style lang="scss" src="./PredictionStats.scss"></style>