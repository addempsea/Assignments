<template>
  <div class="page-container">
    <SignUpNav pageTitle="login" />
    <LoginForm />
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
  title: 'Login',
});
</script>
