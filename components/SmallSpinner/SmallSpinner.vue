<template>
  <div
    class="loadingspinner"
    :style="{
      margin: isCenter ? '50px auto' : 0,
    }"
  ></div>
</template>

<script>
export default {
  props: {
    isCenter: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped src="./SmallSpinner.scss"></style>
