<template>
  <p>{{ title }}</p>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped src="./PageTitle.scss"></style>
