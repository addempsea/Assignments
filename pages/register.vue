<template>
  <div class="page-container">
    <SignUpNav pageTitle="register" />
    <SignUpForm />
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  background-color: #000;
}
</style>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: 'Register',
});
</script>
