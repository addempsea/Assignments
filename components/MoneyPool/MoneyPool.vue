<template>
  <div class="money-pool">
    <div class="container">
      <h3 class="money-pool__heading">
        Ascend our leaderboard, <br />
        and earn bragging rights!
      </h3>
      <p class="money-pool__text">Get a chance to win fantastic rewards along the way!</p>
      <button type="submit" class="money-pool__button" @click="handleClick">Predict</button>
    </div>
    <div>
      <img class="money-pool__image" src="/icons/pool.svg" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const handleClick = () => {
  const token = process.client ? localStorage.getItem("userToken") : "";
  router.push(token ? '/dashboard/competitions' : '/register');
};
</script>

<style lang="scss" scoped src="./MoneyPool.scss"></style>
