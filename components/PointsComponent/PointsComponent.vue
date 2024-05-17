<template>
  <div class="right">
    <div
      class="points"
      :class="{
        'points-lemon': pointsEarned === 6,
        'points-orange': pointsEarned > 0 && pointsEarned < 6,
      }"
    >
      <p>
        {{ pointsEarned === 1 ? "1pt" : pointsEarned === null ? 0 + "pts" : pointsEarned + "pts" }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IHeroProps {
  pointsEarned: number;
}

defineProps<IHeroProps>();
</script>
<style lang="scss" scoped src="./PointsComponent.scss"></style>

