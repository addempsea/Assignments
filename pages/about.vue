<template>
  <AboutHeaderVue />
  <AboutContentVue />
  <FooterVue />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: 'About',
});
</script>
