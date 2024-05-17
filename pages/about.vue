<template>
  <AboutHeader />
  <AboutContent />
  <Footer />
</template>

<script lang="ts">
definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: 'About',
});
</script>
