<template>
  <NuxtLayout name="dashboard-layout">
    <div>
      <PredictionBanner />
      <Leagues />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["dashboard-auth"],
});

useHead({
  title: "Competitions",
});
</script>
