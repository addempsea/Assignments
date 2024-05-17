<template>
  <AboutHeader mainText="How To" spanText="Play"  />
  <HowToPlayContent />
  <Footer />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: 'How To Play',
});
</script>
