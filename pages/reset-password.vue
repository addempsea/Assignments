<template>
  <div class="page-container">
    <SignUpNav pageTitle="reset-password" />
    <ResetPasswordForm />
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  background-color: #000;
}
</style>

<script setup lang="ts">
definePageMeta({
  middleware: ["trailing-slash","auth"],
});

useHead({
  title: 'Reset Password',
});
</script>
