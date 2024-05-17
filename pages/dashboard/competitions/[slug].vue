<template>
  <NuxtLayout name="dashboard-layout">
    <div>
      <PoolBanner />
      <SingleLeague />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
definePageMeta({
  middleware: ["dashboard-auth"],
});

useHead({
  title: route.params.slug as string,
});
</script>
